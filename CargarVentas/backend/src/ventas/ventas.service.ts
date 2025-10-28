import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class VentasService {
  constructor(private prisma: PrismaService) {}

  async crearVenta(dto: {
    imeis: string[];
    idFormaPago: number;
    idTipoVenta: number;
    precio: number;
    notas?: string;
  }) {
    const ID_DISPONIBILIDAD_VENDIDO = 5; 

    return this.prisma.$transaction(async (tx) => {
    
      const duplicados: string[] = [];

      for (const imei of dto.imeis) {
     
        const producto = await tx.producto.findUnique({ where: { IMEI: imei } });
        if (!producto) {
          throw new BadRequestException(`El producto con IMEI ${imei} no existe`);
        }

  
        if (producto.IdDisponibilidad === ID_DISPONIBILIDAD_VENDIDO) {
          duplicados.push(imei);
          continue;
        }

     
        const ventaExistente = await tx.venta_Productos.findFirst({ where: { IMEI: imei } });
        if (ventaExistente) {
          duplicados.push(imei);
        }
      }

      if (duplicados.length > 0) {
        throw new BadRequestException(
          `Los siguientes IMEIs ya tienen una venta registrada: ${duplicados.join(', ')}`
        );
      }

      
      const venta = await tx.ventas.create({
        data: {
          Fecha: new Date(),
          IdFormasdepago: dto.idFormaPago,
          IdTipodeventa: dto.idTipoVenta,
          Notas: dto.notas || null,
        },
      });

      // 🔹 3) Insertar los productos y marcar como vendidos
      for (const imei of dto.imeis) {
        await tx.venta_Productos.create({
          data: {
            IMEI: imei,
            Fecha: new Date(),
            Precioventa: dto.precio,
            IdVentas: venta.IdVentas,
          },
        });

        await tx.producto.update({
          where: { IMEI: imei },
          data: { IdDisponibilidad: ID_DISPONIBILIDAD_VENDIDO },
        });
      }

      return venta;
    });
  }
}
