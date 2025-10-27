"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
// URLs de imágenes reales de alta calidad de cada modelo de iPhone
const imageUrls = {
    'iPhone 16': [
        'https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/iphone-16-finish-select-202409-6-1inch-ultramarine?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=dEtGb3lXU0lUaVVqdWVZbjZYSmN5V1g5aFoyRTV5OFNJd0xYNUlIWjdGdlVLRDZCWTdGRGVlSUMyU3RLYjY4a3lLa01peEJheWJ3MGc0N1dLNUR0bkE9PQ',
        'https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/iphone-16-finish-select-202409-6-1inch-teal?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=dEtGb3lXU0lUaVVqdWVZbjZYSmN5V1g5aFoyRTV5OFNJd0xYNUlIWjdGdlVLRDZCWTdGRGVlSUMyU3RLYjY4a3lLa01peEJheWJ3MGc0N1dLNUR0bnZBS3Bla2pFZkt0YjZIWFFYeDlCb3c9',
        'https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/iphone-16-finish-select-202409-6-1inch-black?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=dEtGb3lXU0lUaVVqdWVZbjZYSmN5V1g5aFoyRTV5OFNJd0xYNUlIWjdGdlVLRDZCWTdGRGVlSUMyU3RLYjY4a3lLa01peEJheWJ3MGc0N1dLNUR0bmlRZ1NoeW1HSHZ0NmJJaDZwTHdOaXc9'
    ],
    'iPhone 16 Plus': [
        'https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/iphone-16-finish-select-202409-6-7inch-ultramarine?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=dEtGb3lXU0lUaVVqdWVZbjZYSmN5V1g5aFoyRTV5OFNJd0xYNUlIWjdGdWoxNGlweGxHVGJCczY0bURJN0RqbU5VanBHN09vL3E2QkZWc1Y2R2lvNEE9PQ',
        'https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/iphone-16-finish-select-202409-6-7inch-teal?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=dEtGb3lXU0lUaVVqdWVZbjZYSmN5V1g5aFoyRTV5OFNJd0xYNUlIWjdGdWoxNGlweGxHVGJCczY0bURJN0RqbU5VanBHN09vL3E2QkZWc1Y2R2lvNGlRZ1NoeW1HSHZ0NmJJaDZwTHdOaXc9',
        'https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/iphone-16-finish-select-202409-6-7inch-black?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=dEtGb3lXU0lUaVVqdWVZbjZYSmN5V1g5aFoyRTV5OFNJd0xYNUlIWjdGdWoxNGlweGxHVGJCczY0bURJN0RqbU5VanBHN09vL3E2QkZWc1Y2R2lvNHZBS3Bla2pFZkt0YjZIWFFYeDlCb3c9'
    ],
    'iPhone 16 Pro': [
        'https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/iphone-16-pro-finish-select-202409-6-3inch-naturaltitanium?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=WFE5aWFMRG1BZzB2bEhKVG5vY09ER2VpSGxMdHR5M0RSejFVbkIyT0xLYXNXa2hQWEZ4aEJ3M0o4RkRteWdTeHJoQy9lVXRTdUoreFZELzhzbEJiK0E9PQ',
        'https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/iphone-16-pro-finish-select-202409-6-3inch-deserttitanium?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=WFE5aWFMRG1BZzB2bEhKVG5vY09ER2VpSGxMdHR5M0RSejFVbkIyT0xLYXNXa2hQWEZ4aEJ3M0o4RkRteWdTeHJoQy9lVXRTdUoreFZELzhzbEJiK0VETmN5dmxpckdmb216WHZwMkFJWW89',
        'https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/iphone-16-pro-finish-select-202409-6-3inch-blacktitanium?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=WFE5aWFMRG1BZzB2bEhKVG5vY09ER2VpSGxMdHR5M0RSejFVbkIyT0xLYXNXa2hQWEZ4aEJ3M0o4RkRteWdTeHJoQy9lVXRTdUoreFZELzhzbEJiK0pWb1YvNXFQdklDZk5rSXRITG1hcFE9'
    ],
    'iPhone 16 Pro Max': [
        'https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/iphone-16-pro-finish-select-202409-6-9inch-naturaltitanium?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=WFE5aWFMRG1BZzB2bEhKVG5vY09ER2VpSGxMdHR5M0RSejFVbkIyT0xLYU9hZE5wRlJ2c21CUUxYeDlqVUNTWDJEUWlxZW9VV1pwdWlscTl4NDl4VGc9PQ',
        'https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/iphone-16-pro-finish-select-202409-6-9inch-deserttitanium?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=WFE5aWFMRG1BZzB2bEhKVG5vY09ER2VpSGxMdHR5M0RSejFVbkIyT0xLYU9hZE5wRlJ2c21CUUxYeDlqVUNTWDJEUWlxZW9VV1pwdWlscTl4NDl4VGhBelhtcDVZcXhuNkpzMTc2ZGdDR009',
        'https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/iphone-16-pro-finish-select-202409-6-9inch-blacktitanium?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=WFE5aWFMRG1BZzB2bEhKVG5vY09ER2VpSGxMdHR5M0RSejFVbkIyT0xLYU9hZE5wRlJ2c21CUUxYeDlqVUNTWDJEUWlxZW9VV1pwdWlscTl4NDl4VGlWYUZmK2FqN3lBbnpaQ0xSeTVtcVU9'
    ],
    'iPhone 15': [
        'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-finish-select-202309-6-1inch-pink?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1692923777972',
        'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-finish-select-202309-6-1inch-blue?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1692923777896',
        'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-finish-select-202309-6-1inch-black?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1692923777818'
    ],
    'iPhone 15 Pro': [
        'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-finish-select-202309-6-1inch-naturaltitanium?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1692895702781',
        'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-finish-select-202309-6-1inch-bluetitanium?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1692895702714',
        'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-finish-select-202309-6-1inch-blacktitanium?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1692895702570'
    ],
    'iPhone 15 Pro Max': [
        'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-finish-select-202309-6-7inch-naturaltitanium?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1692895703724',
        'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-finish-select-202309-6-7inch-bluetitanium?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1692895703665',
        'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-finish-select-202309-6-7inch-blacktitanium?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1692895703516'
    ],
    'iPhone 15 Plus': [
        'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-plus-finish-select-202309-6-7inch-pink?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1692923779954',
        'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-plus-finish-select-202309-6-7inch-blue?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1692923779877',
        'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-plus-finish-select-202309-6-7inch-black?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1692923779800'
    ],
    'iPhone 14': [
        'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-14-finish-select-202209-6-1inch-blue?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1661027785946',
        'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-14-finish-select-202209-6-1inch-midnight?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1661027788296',
        'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-14-finish-select-202209-6-1inch-purple?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1661027788659'
    ],
    'iPhone 14 Pro': [
        'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-14-pro-finish-select-202209-6-1inch-deeppurple?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1663703841896',
        'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-14-pro-finish-select-202209-6-1inch-gold?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1663703842045',
        'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-14-pro-finish-select-202209-6-1inch-spaceblack?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1663703841370'
    ],
    'iPhone 14 Pro Max': [
        'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-14-pro-finish-select-202209-6-7inch-deeppurple?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1663703843272',
        'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-14-pro-finish-select-202209-6-7inch-gold?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1663703843490',
        'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-14-pro-finish-select-202209-6-7inch-spaceblack?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1663703842709'
    ],
    'iPhone 14 Plus': [
        'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-14-plus-finish-select-202209-6-7inch-blue?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1661027861077',
        'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-14-plus-finish-select-202209-6-7inch-midnight?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1661027863015',
        'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-14-plus-finish-select-202209-6-7inch-purple?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1661027863482'
    ],
    'iPhone 13': [
        'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-13-blue-select-2021?wid=940&hei=1112&fmt=png-alpha&.v=1645572315986',
        'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-13-pink-select-2021?wid=940&hei=1112&fmt=png-alpha&.v=1645572315759',
        'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-13-midnight-select-2021?wid=940&hei=1112&fmt=png-alpha&.v=1645572315833'
    ],
    'iPhone 13 Pro': [
        'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-13-pro-blue-select?wid=940&hei=1112&fmt=png-alpha&.v=1645552346295',
        'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-13-pro-gold-select?wid=940&hei=1112&fmt=png-alpha&.v=1645552346637',
        'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-13-pro-graphite-select?wid=940&hei=1112&fmt=png-alpha&.v=1645552346458'
    ],
    'iPhone 13 Pro Max': [
        'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-13-pro-max-blue-select?wid=940&hei=1112&fmt=png-alpha&.v=1645552346511',
        'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-13-pro-max-gold-select?wid=940&hei=1112&fmt=png-alpha&.v=1645552346800',
        'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-13-pro-max-graphite-select?wid=940&hei=1112&fmt=png-alpha&.v=1645552346577'
    ],
    'iPhone 13 mini': [
        'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-13-mini-blue-select-2021?wid=940&hei=1112&fmt=png-alpha&.v=1645572386128',
        'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-13-mini-pink-select-2021?wid=940&hei=1112&fmt=png-alpha&.v=1645572386301',
        'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-13-mini-midnight-select-2021?wid=940&hei=1112&fmt=png-alpha&.v=1645572386657'
    ],
    'iPhone 12': [
        'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-12-blue-select-2020?wid=940&hei=1112&fmt=png-alpha&.v=1604343704000',
        'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-12-white-select-2020?wid=940&hei=1112&fmt=png-alpha&.v=1604343704000',
        'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-12-black-select-2020?wid=940&hei=1112&fmt=png-alpha&.v=1604343704000'
    ],
    'iPhone 12 Pro': [
        'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-12-pro-blue-hero?wid=940&hei=1112&fmt=png-alpha&.v=1604021661000',
        'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-12-pro-gold-hero?wid=940&hei=1112&fmt=png-alpha&.v=1604021661000',
        'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-12-pro-graphite-hero?wid=940&hei=1112&fmt=png-alpha&.v=1604021661000'
    ],
    'iPhone 12 Pro Max': [
        'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-12-pro-max-blue-hero?wid=940&hei=1112&fmt=png-alpha&.v=1604021663000',
        'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-12-pro-max-gold-hero?wid=940&hei=1112&fmt=png-alpha&.v=1604021663000',
        'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-12-pro-max-graphite-hero?wid=940&hei=1112&fmt=png-alpha&.v=1604021663000'
    ],
    'iPhone 12 mini': [
        'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-12-mini-blue-select-2020?wid=940&hei=1112&fmt=png-alpha&.v=1604343704000',
        'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-12-mini-white-select-2020?wid=940&hei=1112&fmt=png-alpha&.v=1604343704000',
        'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-12-mini-black-select-2020?wid=940&hei=1112&fmt=png-alpha&.v=1604343704000'
    ],
    'iPhone 11': [
        'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-11-purple-select-2019?wid=940&hei=1112&fmt=png-alpha&.v=1566956144765',
        'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-11-green-select-2019?wid=940&hei=1112&fmt=png-alpha&.v=1566956148682',
        'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-11-white-select-2019?wid=940&hei=1112&fmt=png-alpha&.v=1566956145099'
    ],
    'iPhone 11 Pro': [
        'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-11-pro-midnight-green-select-2019?wid=940&hei=1112&fmt=png-alpha&.v=1566953859445',
        'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-11-pro-gold-select-2019?wid=940&hei=1112&fmt=png-alpha&.v=1566953661752',
        'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-11-pro-space-select-2019?wid=940&hei=1112&fmt=png-alpha&.v=1566953665286'
    ],
    'iPhone 11 Pro Max': [
        'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-11-pro-max-midnight-green-select-2019?wid=940&hei=1112&fmt=png-alpha&.v=1566953857408',
        'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-11-pro-max-gold-select-2019?wid=940&hei=1112&fmt=png-alpha&.v=1566954267090',
        'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-11-pro-max-space-select-2019?wid=940&hei=1112&fmt=png-alpha&.v=1566954267513'
    ],
    'iPhone SE (2ª Gen)': [
        'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-se-white-select-2020?wid=940&hei=1112&fmt=png-alpha&.v=1586574260658',
        'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-se-black-select-2020?wid=940&hei=1112&fmt=png-alpha&.v=1586574259850',
        'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-se-red-select-2020?wid=940&hei=1112&fmt=png-alpha&.v=1586574260650'
    ],
    'iPhone SE (3ª Gen)': [
        'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-se-midnight-select?wid=940&hei=1112&fmt=png-alpha&.v=1646415838921',
        'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-se-starlight-select?wid=940&hei=1112&fmt=png-alpha&.v=1646415839108',
        'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-se-red-select?wid=940&hei=1112&fmt=png-alpha&.v=1646415838924'
    ]
};
async function main() {
    console.log('🖼️  Actualizando imágenes de productos desde URLs reales...\n');
    const equipos = await prisma.equipos.findMany();
    for (const equipo of equipos) {
        const urls = imageUrls[equipo.Nombre];
        if (urls && urls.length >= 3) {
            const imageUrlString = urls.join(',');
            await prisma.equipos.update({
                where: { IdEquipo: equipo.IdEquipo },
                data: { ImagenesURL: imageUrlString }
            });
            console.log(`✅ ${equipo.Nombre}: ${urls.length} imágenes actualizadas`);
        }
        else {
            console.log(`⚠️  ${equipo.Nombre}: No se encontraron imágenes (usando placeholder)`);
        }
    }
    console.log('\n✨ ¡Actualización completada!');
}
main()
    .catch((e) => {
    console.error('❌ Error:', e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=update-real-images.js.map