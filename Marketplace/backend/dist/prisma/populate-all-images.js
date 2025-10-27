"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
// URLs de imágenes de Apple Store CDN y sitio oficial
const imagenesEquipos = {
    // iPhone 15 Series
    'iPhone 15 Pro Max': [
        'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-max-blue-titanium-select.png',
        'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-max-natural-titanium-select.png',
        'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-max-white-titanium-select.png',
    ],
    'iPhone 15 Pro': [
        'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-blue-titanium-select.png',
        'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-natural-titanium-select.png',
        'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-black-titanium-select.png',
    ],
    'iPhone 15 Plus': [
        'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-plus-blue-select.png',
        'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-plus-pink-select.png',
        'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-plus-black-select.png',
    ],
    'iPhone 15': [
        'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-blue-select.png',
        'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pink-select.png',
        'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-black-select.png',
    ],
    // iPhone 14 Series
    'iPhone 14 Pro Max': [
        'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-14-pro-max-deep-purple-select.png',
        'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-14-pro-max-gold-select.png',
        'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-14-pro-max-spaceblack-select.png',
    ],
    'iPhone 14 Pro': [
        'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-14-pro-deep-purple-select.png',
        'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-14-pro-gold-select.png',
        'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-14-pro-spaceblack-select.png',
    ],
    'iPhone 14 Plus': [
        'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-14-plus-blue-select.png',
        'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-14-plus-purple-select.png',
        'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-14-plus-midnight-select.png',
    ],
    'iPhone 14': [
        'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-14-blue-select.png',
        'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-14-purple-select.png',
        'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-14-midnight-select.png',
    ],
    // iPhone 13 Series
    'iPhone 13 Pro Max': [
        'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-13-pro-max-sierra-blue-select.png',
        'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-13-pro-max-gold-select.png',
        'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-13-pro-max-graphite-select.png',
    ],
    'iPhone 13 Pro': [
        'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-13-pro-sierra-blue-select.png',
        'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-13-pro-gold-select.png',
        'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-13-pro-graphite-select.png',
    ],
    'iPhone 13 mini': [
        'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-13-mini-blue-select.png',
        'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-13-mini-pink-select.png',
        'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-13-mini-midnight-select.png',
    ],
    'iPhone 13': [
        'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-13-blue-select.png',
        'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-13-pink-select.png',
        'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-13-midnight-select.png',
    ],
    // iPhone 12 Series
    'iPhone 12 Pro Max': [
        'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-12-pro-max-blue-select.png',
        'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-12-pro-max-gold-select.png',
        'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-12-pro-max-graphite-select.png',
    ],
    'iPhone 12 Pro': [
        'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-12-pro-blue-select.png',
        'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-12-pro-gold-select.png',
        'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-12-pro-graphite-select.png',
    ],
    'iPhone 12 mini': [
        'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-12-mini-blue-select.png',
        'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-12-mini-purple-select.png',
        'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-12-mini-black-select.png',
    ],
    'iPhone 12': [
        'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-12-blue-select.png',
        'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-12-purple-select.png',
        'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-12-black-select.png',
    ],
    // iPhone 11 Series
    'iPhone 11 Pro Max': [
        'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-11-pro-max-midnight-green-select.png',
        'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-11-pro-max-gold-select.png',
        'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-11-pro-max-space-gray-select.png',
    ],
    'iPhone 11 Pro': [
        'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-11-pro-midnight-green-select.png',
        'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-11-pro-gold-select.png',
        'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-11-pro-space-gray-select.png',
    ],
    'iPhone 11': [
        'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-11-purple-select.png',
        'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-11-white-select.png',
        'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-11-black-select.png',
    ],
    // iPhone SE
    'iPhone SE (2ª Gen)': [
        'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-se-2020-white-select.png',
        'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-se-2020-black-select.png',
        'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-se-2020-red-select.png',
    ],
    'iPhone SE (3ª Gen)': [
        'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-se-white-select.png',
        'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-se-midnight-select.png',
        'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-se-red-select.png',
    ],
    // iPhone 16 Series (futuro - usando placeholders de iPhone 15 por ahora)
    'iPhone 16 Pro Max': [
        'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-max-blue-titanium-select.png',
        'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-max-natural-titanium-select.png',
        'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-max-black-titanium-select.png',
    ],
    'iPhone 16 Pro': [
        'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-blue-titanium-select.png',
        'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-natural-titanium-select.png',
        'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-black-titanium-select.png',
    ],
    'iPhone 16 Plus': [
        'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-plus-blue-select.png',
        'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-plus-pink-select.png',
        'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-plus-black-select.png',
    ],
    'iPhone 16': [
        'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-blue-select.png',
        'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pink-select.png',
        'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-black-select.png',
    ],
    'iPhone 16e': [
        'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-blue-select.png',
        'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pink-select.png',
        'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-black-select.png',
    ],
    'iPhone 17': [
        'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-blue-select.png',
        'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pink-select.png',
        'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-black-select.png',
    ],
    'iPhone Air': [
        'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-blue-select.png',
        'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pink-select.png',
        'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-black-select.png',
    ],
};
async function main() {
    console.log('\n🖼️  ACTUALIZANDO IMÁGENES DE TODOS LOS EQUIPOS...\n');
    console.log('═══════════════════════════════════════════════════════════\n');
    let actualizados = 0;
    let sinImagenes = 0;
    const equipos = await prisma.equipos.findMany({
        select: {
            IdEquipo: true,
            Nombre: true,
            ImagenesURL: true,
        },
    });
    for (const equipo of equipos) {
        const imagenes = imagenesEquipos[equipo.Nombre];
        if (imagenes) {
            const imagenesStr = imagenes.join(',');
            await prisma.equipos.update({
                where: { IdEquipo: equipo.IdEquipo },
                data: { ImagenesURL: imagenesStr },
            });
            console.log(`✅ ${equipo.Nombre} - ${imagenes.length} imágenes actualizadas`);
            actualizados++;
        }
        else {
            console.log(`⚠️  ${equipo.Nombre} - No hay imágenes definidas`);
            sinImagenes++;
        }
    }
    console.log('\n═══════════════════════════════════════════════════════════');
    console.log(`\n✅ Actualizados: ${actualizados}`);
    console.log(`⚠️  Sin imágenes: ${sinImagenes}`);
    console.log(`📊 Total procesados: ${equipos.length}\n`);
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=populate-all-images.js.map