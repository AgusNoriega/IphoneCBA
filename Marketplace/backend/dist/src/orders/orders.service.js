"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const USERNAME = 'iphoneCordoba1'; // demo
let OrdersService = class OrdersService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async currentOrder(username) {
        // Buscar un pedido pendiente para el usuario
        let order = await this.prisma.pedidos_Mayoristas.findFirst({
            where: {
                cliente: {
                    Nombre: username
                },
                estado: {
                    Nombre: 'Pendiente' // Asumiendo que existe este estado
                }
            }
        });
        if (!order) {
            // Crear cliente si no existe
            const cliente = await this.prisma.clientes.upsert({
                where: { IdCliente: 1 }, // Usar un ID fijo para el demo
                update: {},
                create: {
                    IdCliente: 1,
                    Nombre: username,
                    Mail: 'demo@iphonecba.com',
                    NombredeFantasia: 'Demo Cliente'
                }
            });
            // Crear estado pendiente si no existe
            const estadoPendiente = await this.prisma.estados_Pedidos_Mayoristas.upsert({
                where: { IdEstadoMayorista: 1 },
                update: {},
                create: {
                    IdEstadoMayorista: 1,
                    Nombre: 'Pendiente'
                }
            });
            // Crear forma de pago por defecto si no existe
            const formaPago = await this.prisma.formas_de_Pago.upsert({
                where: { IdFormasdepago: 1 },
                update: {},
                create: {
                    IdFormasdepago: 1,
                    Nombre: 'Efectivo'
                }
            });
            order = await this.prisma.pedidos_Mayoristas.create({
                data: {
                    IdCliente: cliente.IdCliente,
                    IdFormadepago: formaPago.IdFormasdepago,
                    IdEstadoMayorista: estadoPendiente.IdEstadoMayorista,
                    Total: 0,
                    Fecha: new Date()
                }
            });
        }
        return order;
    }
    async summary() {
        const order = await this.currentOrder(USERNAME);
        const items = await this.prisma.pedidos_Mayoristas_Detalle.findMany({
            where: { NdePedido: order.NdPedido }
        });
        const totalItems = items.reduce((a, b) => a + 1, 0); // Cada IMEI es un item
        return { totalItems };
    }
    async addItem(productId, qty = 1) {
        return this.prisma.$transaction(async (tx) => {
            // Buscar el producto por IMEI
            const product = await tx.producto.findUnique({
                where: { IMEI: productId },
                include: {
                    equipo: true,
                    estado: true,
                    grado: true,
                    color: true,
                    disponibilidad: true
                }
            });
            if (!product) {
                throw new common_1.BadRequestException('Producto inexistente');
            }
            // Verificar disponibilidad
            if (product.disponibilidad.Nombre === 'Vendido') {
                throw new common_1.BadRequestException('Producto ya vendido');
            }
            // Calcular precio mayorista
            const rango = await tx.rangos_de_Bateria.findFirst({
                where: {
                    minimoPorcentaje: { lte: product.Bateria },
                    MaximoPorcentaje: { gte: product.Bateria }
                }
            });
            let precioUnitario = product.Coste;
            if (rango) {
                const precio = await tx.precios_Mayorista.findUnique({
                    where: {
                        IdEquipo_IdRango_IdGrado: {
                            IdEquipo: product.IdEquipo,
                            IdRango: rango.IdRango,
                            IdGrado: product.IdGrado
                        }
                    }
                });
                if (precio) {
                    precioUnitario = Number(precio.Precio);
                }
            }
            const order = await this.currentOrder(USERNAME);
            // Verificar si el producto ya está en el pedido
            const existingItem = await tx.pedidos_Mayoristas_Detalle.findUnique({
                where: {
                    NdePedido_IMEI: {
                        NdePedido: order.NdPedido,
                        IMEI: productId
                    }
                }
            });
            if (existingItem) {
                throw new common_1.BadRequestException('Producto ya agregado al pedido');
            }
            // Agregar producto al pedido
            await tx.pedidos_Mayoristas_Detalle.create({
                data: {
                    NdePedido: order.NdPedido,
                    IMEI: productId,
                    PrecioUnitario: precioUnitario
                }
            });
            // Actualizar total del pedido
            const totalItems = await tx.pedidos_Mayoristas_Detalle.count({
                where: { NdePedido: order.NdPedido }
            });
            await tx.pedidos_Mayoristas.update({
                where: { NdPedido: order.NdPedido },
                data: { Total: totalItems * precioUnitario }
            });
            // Cambiar disponibilidad del producto a "Reservado" o similar
            const disponibilidadReservado = await tx.disponibilidades.upsert({
                where: { IdDisponibilidad: 3 },
                update: {},
                create: {
                    IdDisponibilidad: 3,
                    Nombre: 'Reservado'
                }
            });
            await tx.producto.update({
                where: { IMEI: productId },
                data: { IdDisponibilidad: disponibilidadReservado.IdDisponibilidad }
            });
            return {
                ok: true,
                remainingStock: 0, // No aplica para productos únicos
                message: 'Producto añadido con éxito',
                precioUnitario
            };
        });
    }
};
exports.OrdersService = OrdersService;
exports.OrdersService = OrdersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], OrdersService);
//# sourceMappingURL=orders.service.js.map