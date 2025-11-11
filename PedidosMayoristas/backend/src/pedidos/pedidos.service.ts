import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { GetPedidosDto } from './get-pedidos.dto';

@Injectable()
export class PedidosService {
  constructor(private prisma: PrismaService) {}

  // 🔹 Listado de pedidos (el que ya usás)
  // src/pedidos/pedidos.service.ts
  async list(dto: GetPedidosDto) {
    try {
      const { q, fecha } = dto;
      const estado = (dto.estado ?? 'pendiente').toLowerCase(); // 'pendiente' por defecto
      const page = Number(dto.page ?? 1);
      const pageSize = Number(dto.pageSize ?? 20);

      const AND: any[] = [];

      // --- Fecha (UTC) ---
      if (fecha && fecha.trim()) {
        const m = fecha.match(/^(\d{4})-(\d{2})-(\d{2})$/);
        if (!m)
          throw new BadRequestException(
            'Formato de fecha inválido (use YYYY-MM-DD)',
          );
        const [_, y, mo, d] = m;
        const inicio = new Date(Date.UTC(+y, +mo - 1, +d, 0, 0, 0));
        const fin = new Date(Date.UTC(+y, +mo - 1, +d + 1, 0, 0, 0));
        AND.push({ Fecha: { gte: inicio, lt: fin } });
      }

      // --- Estado (pendiente/completado/todos) ---
      // Completado ≈ estados "Completado" o "Entregado" (ajustá si usás otros nombres)
      const esCompletado = {
        OR: [
          {
            Estados_Pedidos_Mayoristas: {
              is: { Nombre: { equals: 'Completado', mode: 'insensitive' } },
            },
          },
          {
            Estados_Pedidos_Mayoristas: {
              is: { Nombre: { equals: 'Entregado', mode: 'insensitive' } },
            },
          },
        ],
      };

      if (estado !== 'todos') {
        if (estado === 'completado') {
          AND.push(esCompletado);
        } else {
          AND.push({ NOT: esCompletado });
        }
      }

      // --- Buscador (N° pedido / cliente / IMEI) ---
      if (q && q.trim()) {
        const qTrim = q.trim();
        const maybeNum = Number(qTrim);
        const isSafePedidoId =
          Number.isInteger(maybeNum) && maybeNum >= 0 && maybeNum <= 999999; // id "corto"

        const OR: any[] = [];
        if (isSafePedidoId) OR.push({ NdPedido: maybeNum }); // solo si parece id de pedido
        OR.push({
          Clientes: {
            is: { Nombre: { contains: qTrim, mode: 'insensitive' } },
          },
        });
        OR.push({
          Pedidos_Mayoristas_Detalle: { some: { IMEI: { contains: qTrim } } },
        });

        AND.push({ OR });
      }

      const where = AND.length ? { AND } : undefined;

      const [total, rows] = await this.prisma.$transaction([
        this.prisma.pedidos_Mayoristas.count({ where }),
        this.prisma.pedidos_Mayoristas.findMany({
          where,
          orderBy: { Fecha: 'desc' },
          skip: (page - 1) * pageSize,
          take: pageSize,
          include: {
            Clientes: true,
            Formas_de_Pago: true,
            Estados_Pedidos_Mayoristas: true,
            Pedidos_Mayoristas_Detalle: {
              include: { Producto: { include: { Equipos: true } } },
            },
          },
        }),
      ]);

      const data = rows.map((p: any) => ({
        NdPedido: p.NdPedido,
        Fecha: p.Fecha,
        Clientes: { Nombre: p.Clientes?.Nombre ?? '' },
        Formas_de_Pago: p.Formas_de_Pago
          ? { Nombre: p.Formas_de_Pago.Nombre }
          : null,
        Estados_Pedidos_Mayoristas: p.Estados_Pedidos_Mayoristas
          ? { Nombre: p.Estados_Pedidos_Mayoristas.Nombre }
          : null,
        Pedidos_Mayoristas_Detalle: p.Pedidos_Mayoristas_Detalle.map(
          (d: any) => ({
            IMEI: d.IMEI,
            PrecioUnitario: Number(d.PrecioUnitario ?? 0),
            Producto: d.Producto
              ? {
                  Equipos: d.Producto.Equipos
                    ? { Nombre: d.Producto.Equipos.Nombre }
                    : null,
                }
              : null,
          }),
        ),
      }));

      return { page, pageSize, total, data };
    } catch (e: any) {
      console.error('🟥 PedidosService.list() error:', e?.message ?? e);
      throw e;
    }
  }
  // 🔹 Completar pedido (descontar stock y registrar venta)
  async completarPedido(NdPedido: number) {
    return this.prisma.$transaction(async (tx) => {
      const pedido = await tx.pedidos_Mayoristas.findUnique({
        where: { NdPedido },
        include: { Pedidos_Mayoristas_Detalle: true },
      });
      if (!pedido) throw new NotFoundException(`Pedido ${NdPedido} no existe`);

      if (!pedido.IdFormadepago) {
        throw new BadRequestException(
          'El pedido no tiene forma de pago asignada',
        );
      }

      // Verificamos si ya está completado
      const estadoActual = await tx.estados_Pedidos_Mayoristas.findUnique({
        where: { IdEstadoMayorista: pedido.IdEstadoMayorista },
      });

      const nombreEstado = estadoActual?.Nombre?.toLowerCase() ?? '';

      if (nombreEstado === 'completado' || nombreEstado === 'entregado') {
        throw new BadRequestException(
          `El pedido ${NdPedido} ya está ${estadoActual?.Nombre ?? 'completado'}`,
        );
      }

      // Buscar catálogos necesarios
      const estadoCompletado = await tx.estados_Pedidos_Mayoristas.findFirst({
        where: { Nombre: { equals: 'Completado', mode: 'insensitive' } },
      });
      if (!estadoCompletado)
        throw new BadRequestException(
          'No existe estado "Completado" en Estados_Pedidos_Mayoristas',
        );

      const dispoVendido = await tx.disponibilidades.findFirst({
        where: { Nombre: { equals: 'Vendido', mode: 'insensitive' } },
      });
      if (!dispoVendido)
        throw new BadRequestException(
          'No existe disponibilidad "Vendido" en Disponibilidades',
        );

      const tipoMayorista = await tx.tipo_de_Ventas.findFirst({
        where: { Nombre: { equals: 'Mayorista', mode: 'insensitive' } },
      });
      if (!tipoMayorista)
        throw new BadRequestException(
          'No existe tipo de venta "Mayorista" en Tipo_de_Ventas',
        );

      // Actualizamos estado del pedido
      await tx.pedidos_Mayoristas.update({
        where: { NdPedido },
        data: { IdEstadoMayorista: estadoCompletado.IdEstadoMayorista },
      });

      // Marcar productos como vendidos
      const imeis = pedido.Pedidos_Mayoristas_Detalle.map((d) => d.IMEI);
      if (imeis.length > 0) {
        await tx.producto.updateMany({
          where: { IMEI: { in: imeis } },
          data: { IdDisponibilidad: dispoVendido.IdDisponibilidad },
        });
      }

      // Crear venta
      const venta = await tx.ventas.create({
        data: {
          Fecha: new Date(),
          IdFormasdepago: pedido.IdFormadepago,
          IdTipodeventa: tipoMayorista.idIdTipodeventa,
          Notas: `Venta generada desde Pedido N° ${NdPedido}`,
        },
      });

      // Crear registros en Venta_Productos
      if (imeis.length > 0) {
        const detalles = pedido.Pedidos_Mayoristas_Detalle.map((d) => ({
          IMEI: d.IMEI,
          Fecha: new Date(),
          Precioventa: d.PrecioUnitario,
          IdVentas: venta.IdVentas,
        }));
        await tx.venta_Productos.createMany({ data: detalles });
      }

      return { ok: true, NdPedido, ventaId: venta.IdVentas, imeis };
    });
  }

  // 🔹 Eliminar pedido
  async eliminarPedido(NdPedido: number) {
    return this.prisma.$transaction(async (tx) => {
      await tx.pedidos_Mayoristas_Detalle.deleteMany({
        where: { NdePedido: NdPedido },
      });
      await tx.pedidos_Mayoristas.delete({ where: { NdPedido } });
      return { ok: true, NdPedido };
    });
  }
}
