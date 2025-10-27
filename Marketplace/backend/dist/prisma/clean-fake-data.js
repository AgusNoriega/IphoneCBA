"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    console.log('🧹 Limpiando datos ficticios del seed...\n');
    // IMEIs de los productos ficticios que creó el seed
    const fakeIMEIs = [
        '123456789012345',
        '123456789012346',
        '123456789012347',
        '123456789012348',
        '123456789012349',
        '123456789012350',
        '123456789012351',
    ];
    console.log('❌ Eliminando productos ficticios...');
    const deletedProducts = await prisma.producto.deleteMany({
        where: {
            IMEI: {
                in: fakeIMEIs
            }
        }
    });
    console.log(`   ✓ Eliminados ${deletedProducts.count} productos ficticios\n`);
    // Mostrar productos reales restantes
    const realProducts = await prisma.producto.findMany({
        include: {
            equipo: true,
            color: true,
            estado: true
        }
    });
    console.log('📱 Productos REALES en la base de datos:');
    console.log(`   Total: ${realProducts.length}\n`);
    if (realProducts.length > 0) {
        realProducts.forEach(p => {
            console.log(`   • ${p.equipo.Nombre} - ${p.color.Nombre} - ${p.Capacidad}GB - ${p.estado.Nombre} (IMEI: ${p.IMEI})`);
        });
    }
    else {
        console.log('   ⚠️  No hay productos reales en la base de datos');
        console.log('   💡 Los productos se mostrarán cuando agregues datos reales a tu base de datos IphoneCBA');
    }
    console.log('\n✅ Limpieza completada\n');
}
main()
    .catch(e => {
    console.error('❌ Error:', e);
    process.exit(1);
})
    .finally(() => prisma.$disconnect());
//# sourceMappingURL=clean-fake-data.js.map