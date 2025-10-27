"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    console.log('🧹 Eliminando productos de prueba (PROD001-PROD008)...\n');
    // Eliminar los productos que agregué con el script
    const result = await prisma.producto.deleteMany({
        where: {
            IMEI: {
                in: ['PROD001', 'PROD002', 'PROD003', 'PROD004', 'PROD005', 'PROD006', 'PROD007', 'PROD008']
            }
        }
    });
    console.log(`✓ Eliminados ${result.count} productos de prueba\n`);
    // Mostrar productos reales restantes
    const realProducts = await prisma.producto.findMany({
        include: {
            equipo: true,
            color: true,
            estado: true,
            disponibilidad: true
        },
        orderBy: {
            Fecha: 'desc'
        }
    });
    console.log('📱 Productos REALES en la base de datos:\n');
    console.log(`Total: ${realProducts.length}\n`);
    realProducts.forEach((p, i) => {
        console.log(`${i + 1}. ${p.equipo.Nombre} - ${p.color.Nombre} ${p.Capacidad}GB - ${p.estado.Nombre}`);
        console.log(`   IMEI: ${p.IMEI} | Disponibilidad: ${p.disponibilidad.Nombre} | Coste: $${p.Coste}`);
    });
    console.log('\n✅ Ahora solo quedan los productos reales de tu base de datos\n');
}
main()
    .catch(e => {
    console.error('❌ Error:', e);
    process.exit(1);
})
    .finally(() => prisma.$disconnect());
//# sourceMappingURL=delete-fake-products.js.map