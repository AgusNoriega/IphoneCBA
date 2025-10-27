"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    // Contar todos los productos sin filtros
    const totalCount = await prisma.producto.count();
    console.log(`\n📊 Total de productos en la tabla Producto: ${totalCount}\n`);
    if (totalCount > 0) {
        // Obtener todos los productos
        const allProducts = await prisma.producto.findMany({
            include: {
                equipo: true,
                color: true,
                estado: true,
                disponibilidad: true,
                grado: true
            },
            orderBy: {
                Fecha: 'desc'
            }
        });
        console.log('📱 Listado completo de productos:\n');
        allProducts.forEach((p, i) => {
            console.log(`${i + 1}. ${p.Detalle || p.equipo.Nombre}`);
            console.log(`   Equipo: ${p.equipo.Nombre} | Color: ${p.color.Nombre} | Capacidad: ${p.Capacidad}GB`);
            console.log(`   Estado: ${p.estado.Nombre} | Disponibilidad: ${p.disponibilidad.Nombre}`);
            console.log(`   Grado: ${p.grado.Nombre} | Batería: ${p.Bateria}% | Coste: $${p.Coste}`);
            console.log(`   IMEI: ${p.IMEI} | Fecha: ${p.Fecha.toISOString().split('T')[0]}`);
            console.log('---');
        });
    }
    else {
        console.log('⚠️  No hay productos en la base de datos');
        console.log('\n💡 Los productos que ves en tu herramienta de DB pueden estar:');
        console.log('   - En una transacción no confirmada');
        console.log('   - En otra base de datos');
        console.log('   - Pendientes de guardar');
    }
}
main()
    .catch(e => console.error('❌ Error:', e))
    .finally(() => prisma.$disconnect());
//# sourceMappingURL=check-all-products.js.map