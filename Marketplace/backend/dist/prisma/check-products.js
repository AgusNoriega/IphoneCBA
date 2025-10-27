"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    const products = await prisma.producto.findMany({
        include: {
            equipo: true,
            color: true,
            estado: true,
            disponibilidad: true
        }
    });
    console.log('\n📦 Todos los productos en la base de datos:\n');
    products.forEach(p => {
        console.log(`IMEI: ${p.IMEI}`);
        console.log(`  Equipo: ${p.equipo.Nombre}`);
        console.log(`  Color: ${p.color.Nombre}`);
        console.log(`  Capacidad: ${p.Capacidad}GB`);
        console.log(`  Estado: ${p.estado.Nombre}`);
        console.log(`  Disponibilidad: ${p.disponibilidad.Nombre} (ID: ${p.IdDisponibilidad})`);
        console.log(`  Batería: ${p.Bateria}%`);
        console.log('---');
    });
}
main()
    .catch(e => console.error(e))
    .finally(() => prisma.$disconnect());
//# sourceMappingURL=check-products.js.map