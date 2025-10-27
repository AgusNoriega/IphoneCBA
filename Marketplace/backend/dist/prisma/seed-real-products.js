"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    console.log('📱 Agregando productos realistas a IphoneCBA...\n');
    // Productos realistas basados en la estructura de tu DB
    const productos = [
        {
            IMEI: '352094111234567',
            IdEquipo: 16, // iPhone 14 Pro
            Capacidad: 256,
            IdColor: 9, // Morado
            Bateria: 95.5,
            IdGrado: 1, // A
            Detalle: 'iPhone 14 Pro 256GB Morado - Excelente estado',
            IdEstado: 2, // Usado
            IdDisponibilidad: 1, // Depósito
            Coste: 650,
            Fecha: new Date('2025-10-27')
        },
        {
            IMEI: '352094111234568',
            IdEquipo: 18, // iPhone 15
            Capacidad: 128,
            IdColor: 4, // Blanco
            Bateria: 92.0,
            IdGrado: 1, // A
            Detalle: 'iPhone 15 128GB Blanco - Nuevo sin uso',
            IdEstado: 1, // Nuevo
            IdDisponibilidad: 1, // Depósito
            Coste: 600,
            Fecha: new Date('2025-10-27')
        },
        {
            IMEI: '352094111234569',
            IdEquipo: 12, // iPhone 13 Pro
            Capacidad: 128,
            IdColor: 2, // Gris Espacial
            Bateria: 85.0,
            IdGrado: 2, // B
            Detalle: 'iPhone 13 Pro 128GB Gris Espacial - Pequeños detalles',
            IdEstado: 2, // Usado
            IdDisponibilidad: 1, // Depósito
            Coste: 500,
            Fecha: new Date('2025-10-26')
        },
        {
            IMEI: '352094111234570',
            IdEquipo: 22, // iPhone 16
            Capacidad: 128,
            IdColor: 5, // Azul
            Bateria: 98.0,
            IdGrado: 1, // A
            Detalle: 'iPhone 16 128GB Azul - Nuevo sellado',
            IdEstado: 1, // Nuevo
            IdDisponibilidad: 1, // Depósito
            Coste: 800,
            Fecha: new Date('2025-10-27')
        },
        {
            IMEI: '352094111234571',
            IdEquipo: 16, // iPhone 14 Pro
            Capacidad: 128,
            IdColor: 9, // Morado
            Bateria: 82.0,
            IdGrado: 2, // B
            Detalle: 'iPhone 14 Pro 128GB Morado - Buen estado general',
            IdEstado: 2, // Usado
            IdDisponibilidad: 1, // Depósito
            Coste: 550,
            Fecha: new Date('2025-10-25')
        },
        {
            IMEI: '352094111234572',
            IdEquipo: 18, // iPhone 15
            Capacidad: 256,
            IdColor: 4, // Blanco
            Bateria: 93.5,
            IdGrado: 1, // A
            Detalle: 'iPhone 15 256GB Blanco - Excelente estado',
            IdEstado: 1, // Nuevo
            IdDisponibilidad: 1, // Depósito
            Coste: 700,
            Fecha: new Date('2025-10-27')
        },
        {
            IMEI: '352094111234573',
            IdEquipo: 16, // iPhone 14 Pro
            Capacidad: 256,
            IdColor: 9, // Morado
            Bateria: 88.0,
            IdGrado: 1, // A
            Detalle: 'iPhone 14 Pro 256GB Morado - Como nuevo',
            IdEstado: 2, // Usado
            IdDisponibilidad: 1, // Depósito
            Coste: 650,
            Fecha: new Date('2025-10-27')
        },
        {
            IMEI: '352094111234574',
            IdEquipo: 17, // iPhone 14 Pro Max
            Capacidad: 512,
            IdColor: 2, // Gris Espacial
            Bateria: 90.0,
            IdGrado: 1, // A
            Detalle: 'iPhone 14 Pro Max 512GB Gris Espacial - Premium',
            IdEstado: 1, // Nuevo
            IdDisponibilidad: 1, // Depósito
            Coste: 950,
            Fecha: new Date('2025-10-27')
        },
        {
            IMEI: '352094111234575',
            IdEquipo: 20, // iPhone 15 Pro
            Capacidad: 256,
            IdColor: 19, // Titanio Natural
            Bateria: 96.0,
            IdGrado: 1, // A
            Detalle: 'iPhone 15 Pro 256GB Titanio Natural - Nuevo',
            IdEstado: 1, // Nuevo
            IdDisponibilidad: 1, // Depósito
            Coste: 900,
            Fecha: new Date('2025-10-27')
        },
        {
            IMEI: '352094111234576',
            IdEquipo: 24, // iPhone 16 Pro
            Capacidad: 256,
            IdColor: 17, // Titanio Negro
            Bateria: 99.0,
            IdGrado: 4, // S (Superior)
            Detalle: 'iPhone 16 Pro 256GB Titanio Negro - Edición limitada',
            IdEstado: 1, // Nuevo
            IdDisponibilidad: 1, // Depósito
            Coste: 1100,
            Fecha: new Date('2025-10-27')
        },
    ];
    let count = 0;
    for (const producto of productos) {
        try {
            await prisma.producto.create({
                data: producto
            });
            count++;
            console.log(`✓ ${count}. Agregado: ${producto.Detalle}`);
        }
        catch (error) {
            if (error.code === 'P2002') {
                console.log(`⚠️  IMEI ${producto.IMEI} ya existe, saltando...`);
            }
            else {
                console.error(`❌ Error agregando ${producto.IMEI}:`, error.message);
            }
        }
    }
    console.log(`\n✅ ${count}/${productos.length} productos agregados exitosamente`);
    // Verificar productos disponibles
    const disponibles = await prisma.producto.count({
        where: {
            disponibilidad: {
                Nombre: {
                    in: ['Deposito', 'Local']
                }
            }
        }
    });
    console.log(`📦 Total productos disponibles en Depósito/Local: ${disponibles}`);
    // Mostrar resumen por modelo
    const porModelo = await prisma.producto.groupBy({
        by: ['IdEquipo'],
        _count: true,
        where: {
            IdDisponibilidad: 1 // Solo Depósito
        }
    });
    console.log('\n📊 Productos por modelo:');
    for (const grupo of porModelo) {
        const equipo = await prisma.equipos.findUnique({ where: { IdEquipo: grupo.IdEquipo } });
        console.log(`   ${equipo?.Nombre}: ${grupo._count} unidades`);
    }
    console.log('\n🎉 Base de datos lista para usar!\n');
}
main()
    .catch(e => {
    console.error('❌ Error:', e);
    process.exit(1);
})
    .finally(() => prisma.$disconnect());
//# sourceMappingURL=seed-real-products.js.map