"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    console.log('\n🧹 LIMPIANDO URLs DE IMÁGENES...\n');
    // Actualizar todos los equipos para usar el placeholder local
    const result = await prisma.equipos.updateMany({
        data: {
            ImagenesURL: '/iphone-placeholder.svg',
        },
    });
    console.log(`✅ ${result.count} equipos actualizados para usar placeholder local\n`);
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=clear-images.js.map