"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
/**
 * Script para actualizar las imágenes de un equipo específico
 *
 * Uso:
 * npx ts-node prisma/update-equipment-images.ts <idEquipo> <url1> [url2] [url3] ...
 *
 * Ejemplo:
 * npx ts-node prisma/update-equipment-images.ts 11 "https://ejemplo.com/img1.jpg" "https://ejemplo.com/img2.jpg"
 */
async function main() {
    const args = process.argv.slice(2);
    if (args.length < 2) {
        console.error('❌ Error: Debes proporcionar al menos el ID del equipo y una URL de imagen');
        console.log('\n📖 Uso:');
        console.log('   npx ts-node prisma/update-equipment-images.ts <idEquipo> <url1> [url2] [url3] ...\n');
        console.log('📝 Ejemplo:');
        console.log('   npx ts-node prisma/update-equipment-images.ts 11 "https://example.com/iphone.jpg"\n');
        process.exit(1);
    }
    const idEquipo = parseInt(args[0]);
    const imageUrls = args.slice(1);
    if (isNaN(idEquipo)) {
        console.error('❌ Error: El ID del equipo debe ser un número');
        process.exit(1);
    }
    try {
        // Verificar que el equipo existe
        const equipo = await prisma.equipos.findUnique({
            where: { IdEquipo: idEquipo },
        });
        if (!equipo) {
            console.error(`❌ Error: No se encontró un equipo con ID ${idEquipo}`);
            process.exit(1);
        }
        // Actualizar las imágenes
        const imagenesJSON = JSON.stringify(imageUrls);
        const updated = await prisma.equipos.update({
            where: { IdEquipo: idEquipo },
            data: { ImagenesURL: imagenesJSON },
        });
        console.log(`\n✅ Imágenes actualizadas exitosamente!`);
        console.log(`   Equipo: ${updated.Nombre} (ID: ${updated.IdEquipo})`);
        console.log(`   Imágenes agregadas: ${imageUrls.length}`);
        console.log(`\n📸 URLs:`);
        imageUrls.forEach((url, idx) => {
            console.log(`   ${idx + 1}. ${url}`);
        });
        console.log();
    }
    catch (error) {
        console.error('❌ Error al actualizar:', error);
        process.exit(1);
    }
}
main()
    .catch((e) => {
    console.error('❌ Error fatal:', e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=update-equipment-images.js.map