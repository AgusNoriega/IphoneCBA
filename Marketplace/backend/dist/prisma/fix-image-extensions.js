"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    console.log('🔄 Actualizando extensiones de imágenes de .png a .svg...\n');
    // Obtener todos los equipos que tengan ImagenesURL
    const equipos = await prisma.equipos.findMany({
        where: {
            ImagenesURL: {
                not: null
            }
        }
    });
    console.log(`📦 Encontrados ${equipos.length} equipos con imágenes\n`);
    for (const equipo of equipos) {
        if (equipo.ImagenesURL) {
            // Reemplazar .png por .svg
            const updatedUrl = equipo.ImagenesURL.replace(/\.png/g, '.svg');
            await prisma.equipos.update({
                where: { IdEquipo: equipo.IdEquipo },
                data: { ImagenesURL: updatedUrl }
            });
            console.log(`✅ ${equipo.Nombre}:`);
            console.log(`   Antes: ${equipo.ImagenesURL}`);
            console.log(`   Después: ${updatedUrl}\n`);
        }
    }
    console.log('✨ ¡Actualización completada!');
}
main()
    .catch((e) => {
    console.error('❌ Error:', e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=fix-image-extensions.js.map