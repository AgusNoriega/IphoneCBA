"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
// URLs de imágenes que funcionan - usando URLs directas de Apple
const imagenesEquipos = {
    // iPhone 15 Series
    'iPhone 15 Pro Max': [
        'https://www.apple.com/newsroom/images/2023/09/apple-unveils-iphone-15-pro-and-iphone-15-pro-max/article/Apple-iPhone-15-Pro-lineup-hero-230912_Full-Bleed-Image.jpg.large.jpg',
        'https://www.apple.com/v/iphone-15-pro/c/images/overview/closer-look/close_up_1__buwagff0h6cm_large.jpg',
        'https://www.apple.com/v/iphone-15-pro/c/images/overview/closer-look/close_up_2__c6zhl1kzquaq_large.jpg',
    ],
    'iPhone 15 Pro': [
        'https://www.apple.com/newsroom/images/2023/09/apple-unveils-iphone-15-pro-and-iphone-15-pro-max/article/Apple-iPhone-15-Pro-lineup-hero-230912_Full-Bleed-Image.jpg.large.jpg',
        'https://www.apple.com/v/iphone-15-pro/c/images/overview/closer-look/close_up_1__buwagff0h6cm_large.jpg',
        'https://www.apple.com/v/iphone-15-pro/c/images/overview/closer-look/close_up_2__c6zhl1kzquaq_large.jpg',
    ],
    'iPhone 15 Plus': [
        'https://www.apple.com/newsroom/images/2023/09/apple-debuts-iphone-15-and-iphone-15-plus/article/Apple-iPhone-15-lineup-hero-230912_Full-Bleed-Image.jpg.large.jpg',
        'https://www.apple.com/v/iphone-15/c/images/overview/closer-look/close_up_1__ek6i2fhj8r6y_large.jpg',
        'https://www.apple.com/v/iphone-15/c/images/overview/closer-look/close_up_2__fj9z5x5j7wqy_large.jpg',
    ],
    'iPhone 15': [
        'https://www.apple.com/newsroom/images/2023/09/apple-debuts-iphone-15-and-iphone-15-plus/article/Apple-iPhone-15-lineup-hero-230912_Full-Bleed-Image.jpg.large.jpg',
        'https://www.apple.com/v/iphone-15/c/images/overview/closer-look/close_up_1__ek6i2fhj8r6y_large.jpg',
        'https://www.apple.com/v/iphone-15/c/images/overview/closer-look/close_up_2__fj9z5x5j7wqy_large.jpg',
    ],
    // iPhone 14 Series
    'iPhone 14 Pro Max': [
        'https://www.apple.com/newsroom/images/product/iphone/standard/Apple-iPhone-14-Pro-iPhone-14-Pro-Max-deep-purple-220907_Full-Bleed-Image.jpg.large.jpg',
        'https://www.apple.com/newsroom/images/product/iphone/standard/Apple-iPhone-14-Pro-iPhone-14-Pro-Max-hero-220907_Full-Bleed-Image.jpg.large.jpg',
        'https://www.apple.com/v/iphone-14-pro/a/images/overview/hero/hero_endframe__ecxizbwmlgyq_large.jpg',
    ],
    'iPhone 14 Pro': [
        'https://www.apple.com/newsroom/images/product/iphone/standard/Apple-iPhone-14-Pro-iPhone-14-Pro-Max-deep-purple-220907_Full-Bleed-Image.jpg.large.jpg',
        'https://www.apple.com/newsroom/images/product/iphone/standard/Apple-iPhone-14-Pro-iPhone-14-Pro-Max-hero-220907_Full-Bleed-Image.jpg.large.jpg',
        'https://www.apple.com/v/iphone-14-pro/a/images/overview/hero/hero_endframe__ecxizbwmlgyq_large.jpg',
    ],
    'iPhone 14 Plus': [
        'https://www.apple.com/newsroom/images/product/iphone/standard/Apple-iPhone-14-iPhone-14-Plus-hero-220907_Full-Bleed-Image.jpg.large.jpg',
        'https://www.apple.com/v/iphone-14/d/images/overview/hero/hero_endframe__ck5pib05jl2q_large.jpg',
        'https://www.apple.com/v/iphone-14/d/images/key-features/emergency-sos/emergency_sos_endframe__ezznb9yewj0y_large.jpg',
    ],
    'iPhone 14': [
        'https://www.apple.com/newsroom/images/product/iphone/standard/Apple-iPhone-14-iPhone-14-Plus-hero-220907_Full-Bleed-Image.jpg.large.jpg',
        'https://www.apple.com/v/iphone-14/d/images/overview/hero/hero_endframe__ck5pib05jl2q_large.jpg',
        'https://www.apple.com/v/iphone-14/d/images/key-features/emergency-sos/emergency_sos_endframe__ezznb9yewj0y_large.jpg',
    ],
    // iPhone 13 Series
    'iPhone 13 Pro Max': [
        'https://www.apple.com/newsroom/images/product/iphone/standard/Apple_iphone-13-pro_hero_09142021_Full-Bleed-Image.jpg.large.jpg',
        'https://www.apple.com/v/iphone-13-pro/c/images/overview/camera/gallery_1_screen__etvzx15flk2a_large.jpg',
        'https://www.apple.com/v/iphone-13-pro/c/images/overview/display__b5hd0kp3gzau_large.jpg',
    ],
    'iPhone 13 Pro': [
        'https://www.apple.com/newsroom/images/product/iphone/standard/Apple_iphone-13-pro_hero_09142021_Full-Bleed-Image.jpg.large.jpg',
        'https://www.apple.com/v/iphone-13-pro/c/images/overview/camera/gallery_1_screen__etvzx15flk2a_large.jpg',
        'https://www.apple.com/v/iphone-13-pro/c/images/overview/display__b5hd0kp3gzau_large.jpg',
    ],
    'iPhone 13 mini': [
        'https://www.apple.com/newsroom/images/product/iphone/standard/apple_iphone-13-pink_09142021_Full-Bleed-Image.jpg.large.jpg',
        'https://www.apple.com/v/iphone-13/k/images/overview/design/design_phone__bv8zx05wfhae_large.jpg',
        'https://www.apple.com/v/iphone-13/k/images/overview/display__g02py2wevqoe_large.jpg',
    ],
    'iPhone 13': [
        'https://www.apple.com/newsroom/images/product/iphone/standard/apple_iphone-13-pink_09142021_Full-Bleed-Image.jpg.large.jpg',
        'https://www.apple.com/v/iphone-13/k/images/overview/design/design_phone__bv8zx05wfhae_large.jpg',
        'https://www.apple.com/v/iphone-13/k/images/overview/display__g02py2wevqoe_large.jpg',
    ],
    // iPhone 12 Series
    'iPhone 12 Pro Max': [
        'https://www.apple.com/newsroom/images/product/iphone/standard/Apple_announce-iphone12pro_10132020_big.jpg.large.jpg',
        'https://www.apple.com/v/iphone-12-pro/d/images/overview/camera/camera_endframe__fa0qjmdpd2c2_large.jpg',
        'https://www.apple.com/v/iphone-12-pro/d/images/overview/design/design_endframe__ec7a3u2xmw8m_large.jpg',
    ],
    'iPhone 12 Pro': [
        'https://www.apple.com/newsroom/images/product/iphone/standard/Apple_announce-iphone12pro_10132020_big.jpg.large.jpg',
        'https://www.apple.com/v/iphone-12-pro/d/images/overview/camera/camera_endframe__fa0qjmdpd2c2_large.jpg',
        'https://www.apple.com/v/iphone-12-pro/d/images/overview/design/design_endframe__ec7a3u2xmw8m_large.jpg',
    ],
    'iPhone 12 mini': [
        'https://www.apple.com/newsroom/images/product/iphone/standard/Apple_announce-iphone12_10132020_big.jpg.large.jpg',
        'https://www.apple.com/v/iphone-12/j/images/overview/a14/a14_endframe__fzlr5kwxv2ie_large.jpg',
        'https://www.apple.com/v/iphone-12/j/images/overview/camera/camera_endframe__ck4t8vrn3eky_large.jpg',
    ],
    'iPhone 12': [
        'https://www.apple.com/newsroom/images/product/iphone/standard/Apple_announce-iphone12_10132020_big.jpg.large.jpg',
        'https://www.apple.com/v/iphone-12/j/images/overview/a14/a14_endframe__fzlr5kwxv2ie_large.jpg',
        'https://www.apple.com/v/iphone-12/j/images/overview/camera/camera_endframe__ck4t8vrn3eky_large.jpg',
    ],
    // iPhone 11 Series
    'iPhone 11 Pro Max': [
        'https://www.apple.com/newsroom/images/product/iphone/standard/Apple-iPhone-11-Pro-triple-camera-design-091019_big.jpg.large.jpg',
        'https://www.apple.com/v/iphone-11-pro/f/images/overview/camera_system__eyxgj0xvq2qa_large.jpg',
        'https://www.apple.com/v/iphone-11-pro/f/images/overview/display__bzb4g1qd65om_large.jpg',
    ],
    'iPhone 11 Pro': [
        'https://www.apple.com/newsroom/images/product/iphone/standard/Apple-iPhone-11-Pro-triple-camera-design-091019_big.jpg.large.jpg',
        'https://www.apple.com/v/iphone-11-pro/f/images/overview/camera_system__eyxgj0xvq2qa_large.jpg',
        'https://www.apple.com/v/iphone-11-pro/f/images/overview/display__bzb4g1qd65om_large.jpg',
    ],
    'iPhone 11': [
        'https://www.apple.com/newsroom/images/product/iphone/standard/Apple_iPhone_11-rosette-family-lineup-091019_big.jpg.large.jpg',
        'https://www.apple.com/v/iphone-11/j/images/overview/camera__bpzy1yyv5y2a_large.jpg',
        'https://www.apple.com/v/iphone-11/j/images/overview/battery__elfe1yfyzku6_large.jpg',
    ],
    // iPhone SE
    'iPhone SE (2ª Gen)': [
        'https://www.apple.com/newsroom/images/product/iphone/standard/Apple_new-iphone-se-white_042020_big.jpg.large.jpg',
        'https://www.apple.com/v/iphone-se/o/images/overview/camera__d0d8jb5njneq_large.jpg',
        'https://www.apple.com/v/iphone-se/o/images/overview/bionic__cjnzz36vjzyu_large.jpg',
    ],
    'iPhone SE (3ª Gen)': [
        'https://www.apple.com/newsroom/images/product/iphone/standard/apple_iphone-se_hero_03082022_big.jpg.large.jpg',
        'https://www.apple.com/v/iphone-se/q/images/overview/camera__cl1wz0fctdim_large.jpg',
        'https://www.apple.com/v/iphone-se/q/images/overview/chip__ec1k6h3wdrmm_large.jpg',
    ],
    // Modelos futuros (usar imágenes de iPhone 15 como placeholder)
    'iPhone 16 Pro Max': [
        'https://www.apple.com/newsroom/images/2023/09/apple-unveils-iphone-15-pro-and-iphone-15-pro-max/article/Apple-iPhone-15-Pro-lineup-hero-230912_Full-Bleed-Image.jpg.large.jpg',
        'https://www.apple.com/v/iphone-15-pro/c/images/overview/closer-look/close_up_1__buwagff0h6cm_large.jpg',
        'https://www.apple.com/v/iphone-15-pro/c/images/overview/closer-look/close_up_2__c6zhl1kzquaq_large.jpg',
    ],
    'iPhone 16 Pro': [
        'https://www.apple.com/newsroom/images/2023/09/apple-unveils-iphone-15-pro-and-iphone-15-pro-max/article/Apple-iPhone-15-Pro-lineup-hero-230912_Full-Bleed-Image.jpg.large.jpg',
        'https://www.apple.com/v/iphone-15-pro/c/images/overview/closer-look/close_up_1__buwagff0h6cm_large.jpg',
        'https://www.apple.com/v/iphone-15-pro/c/images/overview/closer-look/close_up_2__c6zhl1kzquaq_large.jpg',
    ],
    'iPhone 16 Plus': [
        'https://www.apple.com/newsroom/images/2023/09/apple-debuts-iphone-15-and-iphone-15-plus/article/Apple-iPhone-15-lineup-hero-230912_Full-Bleed-Image.jpg.large.jpg',
        'https://www.apple.com/v/iphone-15/c/images/overview/closer-look/close_up_1__ek6i2fhj8r6y_large.jpg',
        'https://www.apple.com/v/iphone-15/c/images/overview/closer-look/close_up_2__fj9z5x5j7wqy_large.jpg',
    ],
    'iPhone 16': [
        'https://www.apple.com/newsroom/images/2023/09/apple-debuts-iphone-15-and-iphone-15-plus/article/Apple-iPhone-15-lineup-hero-230912_Full-Bleed-Image.jpg.large.jpg',
        'https://www.apple.com/v/iphone-15/c/images/overview/closer-look/close_up_1__ek6i2fhj8r6y_large.jpg',
        'https://www.apple.com/v/iphone-15/c/images/overview/closer-look/close_up_2__fj9z5x5j7wqy_large.jpg',
    ],
    'iPhone 16e': [
        'https://www.apple.com/newsroom/images/2023/09/apple-debuts-iphone-15-and-iphone-15-plus/article/Apple-iPhone-15-lineup-hero-230912_Full-Bleed-Image.jpg.large.jpg',
        'https://www.apple.com/v/iphone-15/c/images/overview/closer-look/close_up_1__ek6i2fhj8r6y_large.jpg',
        'https://www.apple.com/v/iphone-15/c/images/overview/closer-look/close_up_2__fj9z5x5j7wqy_large.jpg',
    ],
    'iPhone 17': [
        'https://www.apple.com/newsroom/images/2023/09/apple-debuts-iphone-15-and-iphone-15-plus/article/Apple-iPhone-15-lineup-hero-230912_Full-Bleed-Image.jpg.large.jpg',
        'https://www.apple.com/v/iphone-15/c/images/overview/closer-look/close_up_1__ek6i2fhj8r6y_large.jpg',
        'https://www.apple.com/v/iphone-15/c/images/overview/closer-look/close_up_2__fj9z5x5j7wqy_large.jpg',
    ],
    'iPhone Air': [
        'https://www.apple.com/newsroom/images/2023/09/apple-debuts-iphone-15-and-iphone-15-plus/article/Apple-iPhone-15-lineup-hero-230912_Full-Bleed-Image.jpg.large.jpg',
        'https://www.apple.com/v/iphone-15/c/images/overview/closer-look/close_up_1__ek6i2fhj8r6y_large.jpg',
        'https://www.apple.com/v/iphone-15/c/images/overview/closer-look/close_up_2__fj9z5x5j7wqy_large.jpg',
    ],
};
async function main() {
    console.log('\n🔄 ACTUALIZANDO IMÁGENES CON URLs QUE FUNCIONAN...\n');
    console.log('═══════════════════════════════════════════════════════════\n');
    let actualizados = 0;
    let sinImagenes = 0;
    const equipos = await prisma.equipos.findMany({
        select: {
            IdEquipo: true,
            Nombre: true,
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
//# sourceMappingURL=update-working-images.js.map