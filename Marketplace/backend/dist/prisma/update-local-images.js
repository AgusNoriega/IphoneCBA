"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
// Mapeo de nombres de equipos a rutas de imágenes locales
const imagenesLocales = {
    // iPhone 15 Series
    'iPhone 15 Pro Max': '/products/iphone-15-pro-max.png',
    'iPhone 15 Pro': '/products/iphone-15-pro.png',
    'iPhone 15 Plus': '/products/iphone-15-plus.png',
    'iPhone 15': '/products/iphone-15.png',
    // iPhone 14 Series
    'iPhone 14 Pro Max': '/products/iphone-14-pro-max.png',
    'iPhone 14 Pro': '/products/iphone-14-pro.png',
    'iPhone 14 Plus': '/products/iphone-14-plus.png',
    'iPhone 14': '/products/iphone-14.png',
    // iPhone 13 Series
    'iPhone 13 Pro Max': '/products/iphone-13-pro-max.png',
    'iPhone 13 Pro': '/products/iphone-13-pro.png',
    'iPhone 13 mini': '/products/iphone-13-mini.png',
    'iPhone 13': '/products/iphone-13.png',
    // iPhone 12 Series
    'iPhone 12 Pro Max': '/products/iphone-12-pro-max.png',
    'iPhone 12 Pro': '/products/iphone-12-pro.png',
    'iPhone 12 mini': '/products/iphone-12-mini.png',
    'iPhone 12': '/products/iphone-12.png',
    // iPhone 11 Series
    'iPhone 11 Pro Max': '/products/iphone-11-pro-max.png',
    'iPhone 11 Pro': '/products/iphone-11-pro.png',
    'iPhone 11': '/products/iphone-11.png',
    // iPhone SE
    'iPhone SE (2ª Gen)': '/products/iphone-se-2.png',
    'iPhone SE (3ª Gen)': '/products/iphone-se-3.png',
    // iPhone 16 Series (futuros)
    'iPhone 16 Pro Max': '/products/iphone-16-pro-max.png',
    'iPhone 16 Pro': '/products/iphone-16-pro.png',
    'iPhone 16 Plus': '/products/iphone-16-plus.png',
    'iPhone 16': '/products/iphone-16.png',
    'iPhone 16e': '/products/iphone-16e.png',
    'iPhone 17': '/products/iphone-17.png',
    'iPhone Air': '/products/iphone-air.png',
};
async function main() {
    console.log('\n🖼️  CONFIGURANDO IMÁGENES LOCALES...\n');
    console.log('═══════════════════════════════════════════════════════════\n');
    let actualizados = 0;
    let noEncontrados = 0;
    const equipos = await prisma.equipos.findMany({
        select: {
            IdEquipo: true,
            Nombre: true,
        },
    });
    for (const equipo of equipos) {
        const imagenLocal = imagenesLocales[equipo.Nombre];
        if (imagenLocal) {
            await prisma.equipos.update({
                where: { IdEquipo: equipo.IdEquipo },
                data: { ImagenesURL: imagenLocal },
            });
            console.log(`✅ ${equipo.Nombre} -> ${imagenLocal}`);
            actualizados++;
        }
        else {
            // Usar placeholder si no tiene imagen definida
            await prisma.equipos.update({
                where: { IdEquipo: equipo.IdEquipo },
                data: { ImagenesURL: '/iphone-placeholder.svg' },
            });
            console.log(`⚠️  ${equipo.Nombre} -> usando placeholder`);
            noEncontrados++;
        }
    }
    console.log('\n═══════════════════════════════════════════════════════════');
    console.log(`\n✅ Configurados con imágenes locales: ${actualizados}`);
    console.log(`⚠️  Usando placeholder: ${noEncontrados}`);
    console.log(`📊 Total: ${equipos.length}\n`);
    console.log('💡 Recuerda descargar las imágenes y guardarlas en:');
    console.log('   Marketplace/frontend/public/products/\n');
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=update-local-images.js.map