"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    const equipos = await prisma.equipos.findMany({
        select: {
            IdEquipo: true,
            Nombre: true,
            ImagenesURL: true,
        },
        orderBy: {
            Nombre: 'asc',
        },
    });
    console.log('\n📱 EQUIPOS EN LA BASE DE DATOS:\n');
    console.log('═══════════════════════════════════════════════════════════\n');
    equipos.forEach((equipo) => {
        const hasImages = equipo.ImagenesURL && equipo.ImagenesURL.trim() !== '';
        const status = hasImages ? '✅' : '❌';
        console.log(`${status} ID: ${equipo.IdEquipo} | ${equipo.Nombre}`);
        if (!hasImages) {
            console.log(`   ⚠️  Sin imágenes configuradas`);
        }
    });
    console.log('\n═══════════════════════════════════════════════════════════');
    console.log(`\nTotal: ${equipos.length} equipos`);
    console.log(`Con imágenes: ${equipos.filter(e => e.ImagenesURL && e.ImagenesURL.trim() !== '').length}`);
    console.log(`Sin imágenes: ${equipos.filter(e => !e.ImagenesURL || e.ImagenesURL.trim() === '').length}\n`);
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=check-equipos.js.map