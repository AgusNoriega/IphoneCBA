"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
// Mapeo de imágenes por equipo (las que ya teníamos)
const imagenesEquipos = {
    1: [
        'https://www.apple.com/newsroom/images/product/iphone/standard/Apple_iphone-11-new-color-lineup_090919.jpg.landing-big_2x.jpg',
    ],
    2: [
        'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-11-pro-max-midnight-green-select-2019?wid=470&hei=556&fmt=png-alpha&.v=1566953859442',
        'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-11-pro-silver-select-2019?wid=470&hei=556&fmt=png-alpha&.v=1566953661194',
        'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-11-pro-gold-select-2019?wid=470&hei=556&fmt=png-alpha&.v=1566953661212',
    ],
    3: [
        'https://www.apple.com/newsroom/images/product/iphone/standard/Apple_announce-iphone12pro_10132020.jpg.landing-big_2x.jpg',
    ],
    4: [
        'https://www.apple.com/newsroom/images/product/iphone/standard/Apple_iphone-12-pro-blue_10132020.jpg.landing-big_2x.jpg',
    ],
    5: [
        'https://www.apple.com/newsroom/images/product/iphone/standard/Apple_iphone-13-pro-sierra-blue_09142021.jpg.landing-big_2x.jpg',
    ],
    6: [
        'https://www.apple.com/newsroom/images/product/iphone/standard/Apple_iphone-13-pro-max-sierra-blue_09142021.jpg.landing-big_2x.jpg',
    ],
    7: [
        'https://www.apple.com/newsroom/images/product/iphone/standard/Apple_iPhone-14-iPhone-14-Plus-2up_geo_230307.jpg.landing-big_2x.jpg',
    ],
    8: [
        'https://www.apple.com/newsroom/images/product/iphone/standard/Apple_iPhone-14-Pro-iPhone-14-Pro-Max-deep-purple-220907.jpg.landing-big_2x.jpg',
    ],
    9: [
        'https://www.apple.com/newsroom/images/2023/09/apple-debuts-iphone-15-and-iphone-15-plus/article/Apple-iPhone-15-lineup-color-lineup-geo-230912.jpg.landing-big_2x.jpg',
    ],
    10: [
        'https://www.apple.com/newsroom/images/2023/09/apple-unveils-iphone-15-pro-and-iphone-15-pro-max/article/Apple-iPhone-15-Pro-lineup-hero-geo-230912.jpg.landing-big_2x.jpg',
    ],
};
async function main() {
    console.log('🖼️  Poblando imágenes de equipos...\n');
    for (const [idEquipo, imagenes] of Object.entries(imagenesEquipos)) {
        const id = parseInt(idEquipo);
        const imagenesJSON = JSON.stringify(imagenes);
        try {
            const equipo = await prisma.equipos.update({
                where: { IdEquipo: id },
                data: { ImagenesURL: imagenesJSON },
            });
            console.log(`✅ Actualizado: ${equipo.Nombre} - ${imagenes.length} imagen(es)`);
        }
        catch (error) {
            console.log(`⚠️  No se encontró equipo con ID ${id}`);
        }
    }
    console.log('\n✨ Proceso completado!');
    // Mostrar equipos sin imágenes
    const sinImagenes = await prisma.equipos.findMany({
        where: { ImagenesURL: null },
        select: { IdEquipo: true, Nombre: true },
    });
    if (sinImagenes.length > 0) {
        console.log('\n⚠️  Equipos sin imágenes asignadas:');
        sinImagenes.forEach(e => {
            console.log(`   - ID ${e.IdEquipo}: ${e.Nombre}`);
        });
        console.log('\n💡 Puedes agregar imágenes manualmente actualizando el campo ImagenesURL con un JSON de URLs');
    }
}
main()
    .catch((e) => {
    console.error('❌ Error:', e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=populate-images.js.map