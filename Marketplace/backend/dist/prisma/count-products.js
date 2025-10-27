"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    const total = await prisma.producto.count();
    const disponibles = await prisma.producto.count({
        where: {
            disponibilidad: {
                Nombre: {
                    in: ['Deposito', 'Local']
                }
            }
        }
    });
    console.log('\n📊 Productos en la base de datos:');
    console.log(`   Total: ${total} productos`);
    console.log(`   Disponibles (Deposito/Local): ${disponibles} productos`);
    console.log(`   Vendidos/Otros: ${total - disponibles} productos\n`);
    // Mostrar los primeros 10 productos disponibles
    const products = await prisma.producto.findMany({
        where: {
            disponibilidad: {
                Nombre: {
                    in: ['Deposito', 'Local']
                }
            }
        },
        include: {
            equipo: true,
            color: true,
            estado: true,
            disponibilidad: true
        },
        take: 10
    });
    console.log('📱 Primeros 10 productos disponibles:\n');
    products.forEach((p, i) => {
        console.log(`${i + 1}. ${p.equipo.Nombre} - ${p.color.Nombre} ${p.Capacidad}GB - ${p.estado.Nombre}`);
        console.log(`   IMEI: ${p.IMEI} | Disponibilidad: ${p.disponibilidad.Nombre}`);
    });
}
main()
    .catch(e => console.error(e))
    .finally(() => prisma.$disconnect());
//# sourceMappingURL=count-products.js.map