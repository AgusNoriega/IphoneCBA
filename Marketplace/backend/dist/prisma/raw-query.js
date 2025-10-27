"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    // Consulta SQL directa
    const products = await prisma.$queryRaw `
    SELECT 
      p."IMEI",
      p."Detalle",
      p."Capacidad",
      p."IdEstado",
      p."IdDisponibilidad",
      p."Coste",
      p."Fecha",
      e."Nombre" as Equipo,
      c."Nombre" as Color,
      est."Nombre" as Estado,
      d."Nombre" as Disponibilidad
    FROM "Producto" p
    LEFT JOIN "Equipos" e ON p."IdEquipo" = e."IdEquipo"
    LEFT JOIN "Colores" c ON p."IdColor" = c."IdColor"
    LEFT JOIN "Estados" est ON p."IdEstado" = est."IdEstado"
    LEFT JOIN "Disponibilidades" d ON p."IdDisponibilidad" = d."IdDisponibilidad"
    ORDER BY p."Fecha" DESC
  `;
    console.log('\n📊 Productos encontrados con SQL directo:\n');
    console.log(`Total: ${products.length}\n`);
    products.forEach((p, i) => {
        console.log(`${i + 1}. ${p.equipo || '[Sin equipo]'} - ${p.color || '[Sin color]'} ${p.capacidad || 0}GB`);
        console.log(`   Detalle: ${p.detalle || '[null]'}`);
        console.log(`   Estado: ${p.estado || '[null]'} | Disponibilidad: ${p.disponibilidad || '[null]'}`);
        console.log(`   IMEI: ${p.imei}`);
        console.log(`   Coste: $${p.coste} | Fecha: ${p.fecha?.toISOString().split('T')[0]}`);
        console.log('---');
    });
}
main()
    .catch(e => console.error(e))
    .finally(() => prisma.$disconnect());
//# sourceMappingURL=raw-query.js.map