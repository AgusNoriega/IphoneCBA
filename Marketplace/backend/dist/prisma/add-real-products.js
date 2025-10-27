"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    console.log('📱 Agregando productos desde tu screenshot...\n');
    // Primero eliminar los productos de prueba anteriores
    await prisma.producto.deleteMany({
        where: {
            IMEI: {
                in: ['111111111111111', '222222222222222']
            }
        }
    });
    // Productos basados en tu screenshot (fila 1-9)
    const productos = [
        {
            IMEI: 'PROD001',
            IdEquipo: 16, // iPhone 14 Pro
            Capacidad: 256,
            IdColor: 9, // Morado
            Bateria: 90,
            IdGrado: 1,
            Detalle: 'Equipo nuevo, sin detalles visibles',
            IdEstado: 1, // Nuevo
            IdDisponibilidad: 5, // (del screenshot)
            Coste: 850,
            Fecha: new Date('2025-10-27')
        },
        {
            IMEI: 'PROD002',
            IdEquipo: 16, // iPhone 14 Pro
            Capacidad: 256,
            IdColor: 9, // Morado
            Bateria: 88,
            IdGrado: 1,
            Detalle: 'iPhone 14 Pro Morado 256GB',
            IdEstado: 2, // Usado
            IdDisponibilidad: 1, // Deposito
            Coste: 650,
            Fecha: new Date('2025-10-27')
        },
        {
            IMEI: 'PROD003',
            IdEquipo: 18, // iPhone 15
            Capacidad: 128,
            IdColor: 4, // Blanco
            Bateria: 92,
            IdGrado: 1,
            Detalle: 'iPhone 15 Blanco 128GB',
            IdEstado: 1, // Nuevo
            IdDisponibilidad: 1, // Deposito
            Coste: 600,
            Fecha: new Date('2025-10-27')
        },
        {
            IMEI: 'PROD004',
            IdEquipo: 12, // iPhone 13 Pro
            Capacidad: 128,
            IdColor: 3, // Negro/Grafito
            Bateria: 85,
            IdGrado: 2,
            Detalle: 'iPhone 13 Pro Grafito 128GB',
            IdEstado: 2, // Usado
            IdDisponibilidad: 1, // Deposito
            Coste: 500,
            Fecha: new Date('2025-10-27')
        },
        {
            IMEI: 'PROD005',
            IdEquipo: 22, // iPhone 16
            Capacidad: 128,
            IdColor: 5, // Azul
            Bateria: 95,
            IdGrado: 1,
            Detalle: 'iPhone 16 Azul 128GB',
            IdEstado: 1, // Nuevo
            IdDisponibilidad: 1, // Deposito
            Coste: 800,
            Fecha: new Date('2025-10-27')
        },
        {
            IMEI: 'PROD006',
            IdEquipo: 16, // iPhone 14 Pro
            Capacidad: 128,
            IdColor: 9, // Morado
            Bateria: 82,
            IdGrado: 2,
            Detalle: 'iPhone 14 Pro Morado 128GB',
            IdEstado: 2, // Usado
            IdDisponibilidad: 1, // Deposito
            Coste: 550,
            Fecha: new Date('2025-10-27')
        },
        {
            IMEI: 'PROD007',
            IdEquipo: 18, // iPhone 15
            Capacidad: 256,
            IdColor: 4, // Blanco
            Bateria: 93,
            IdGrado: 1,
            Detalle: 'iPhone 15 Blanco 256GB',
            IdEstado: 1, // Nuevo
            IdDisponibilidad: 1, // Deposito
            Coste: 700,
            Fecha: new Date('2025-10-27')
        },
        {
            IMEI: 'PROD008',
            IdEquipo: 16, // iPhone 14 Pro
            Capacidad: 256,
            IdColor: 9, // Morado
            Bateria: 87,
            IdGrado: 1,
            Detalle: 'iPhone 14 Pro Morado 256GB',
            IdEstado: 2, // Usado
            IdDisponibilidad: 1, // Deposito
            Coste: 650,
            Fecha: new Date('2025-10-27')
        },
    ];
    for (const producto of productos) {
        await prisma.producto.create({
            data: producto
        });
        console.log(`✓ Agregado: ${producto.Detalle}`);
    }
    console.log(`\n✅ ${productos.length} productos agregados exitosamente`);
    // Verificar
    const count = await prisma.producto.count({
        where: {
            disponibilidad: {
                Nombre: {
                    in: ['Deposito', 'Local']
                }
            }
        }
    });
    console.log(`📦 Total productos disponibles: ${count}\n`);
}
main()
    .catch(e => console.error('❌ Error:', e))
    .finally(() => prisma.$disconnect());
//# sourceMappingURL=add-real-products.js.map