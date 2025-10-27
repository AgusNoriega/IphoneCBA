"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    console.log('🧹 Eliminando solo los productos de prueba que agregué...\n');
    // IMEIs que YO agregué con el script anterior (no son tuyos)
    const myTestIMEIs = [
        '352094111234567',
        '352094111234568',
        '352094111234569',
        '352094111234570',
        '352094111234571',
        '352094111234572',
        '352094111234573',
        '352094111234574',
        '352094111234575',
        '352094111234576',
    ];
    const deleted = await prisma.producto.deleteMany({
        where: {
            IMEI: {
                in: myTestIMEIs
            }
        }
    });
    console.log(`✓ Eliminados ${deleted.count} productos de prueba\n`);
    // Mostrar TODOS los productos que quedaron (tus productos reales)
    const realProducts = await prisma.producto.findMany({
        include: {
            equipo: true,
            color: true,
            estado: true,
            grado: true,
            disponibilidad: true
        },
        orderBy: {
            Fecha: 'desc'
        }
    });
    console.log('📱 TUS PRODUCTOS REALES en la base de datos:\n');
    console.log(`Total: ${realProducts.length}\n`);
    if (realProducts.length > 0) {
        realProducts.forEach((p, i) => {
            console.log(`${i + 1}. ${p.equipo.Nombre} ${p.Capacidad}GB ${p.color.Nombre} - ${p.estado.Nombre}`);
            console.log(`   IMEI: ${p.IMEI}`);
            console.log(`   Grado: ${p.grado.Nombre} | Batería: ${p.Bateria}%`);
            console.log(`   Disponibilidad: ${p.disponibilidad.Nombre} | Coste: $${p.Coste}`);
            console.log(`   Detalle: ${p.Detalle || '(sin detalle)'}`);
            console.log('---');
        });
    }
    else {
        console.log('⚠️  No hay productos en la base de datos');
        console.log('💡 Por favor, inserta tus productos reales en la tabla Producto');
    }
    console.log('\n✅ Ahora la aplicación usará SOLO tus productos reales\n');
}
main()
    .catch(e => console.error('❌ Error:', e))
    .finally(() => prisma.$disconnect());
//# sourceMappingURL=remove-test-products.js.map