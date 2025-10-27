"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
// URLs usando SVG placeholders desde placeholder.com (siempre funcionan)
const imagenesCorregidas = {
    // iPhone 15 Series
    'iPhone 15 Pro Max': [
        'https://via.placeholder.com/400x600/1e3a8a/ffffff?text=iPhone+15+Pro+Max',
        'https://via.placeholder.com/400x600/3b82f6/ffffff?text=iPhone+15+Pro+Max',
        'https://via.placeholder.com/400x600/60a5fa/ffffff?text=iPhone+15+Pro+Max',
    ],
    'iPhone 15 Pro': [
        'https://via.placeholder.com/400x600/1e3a8a/ffffff?text=iPhone+15+Pro',
        'https://via.placeholder.com/400x600/3b82f6/ffffff?text=iPhone+15+Pro',
        'https://via.placeholder.com/400x600/60a5fa/ffffff?text=iPhone+15+Pro',
    ],
    'iPhone 15 Plus': [
        'https://via.placeholder.com/400x600/1e3a8a/ffffff?text=iPhone+15+Plus',
        'https://via.placeholder.com/400x600/3b82f6/ffffff?text=iPhone+15+Plus',
        'https://via.placeholder.com/400x600/60a5fa/ffffff?text=iPhone+15+Plus',
    ],
    'iPhone 15': [
        'https://via.placeholder.com/400x600/1e3a8a/ffffff?text=iPhone+15',
        'https://via.placeholder.com/400x600/3b82f6/ffffff?text=iPhone+15',
        'https://via.placeholder.com/400x600/60a5fa/ffffff?text=iPhone+15',
    ],
    // iPhone 14 Series
    'iPhone 14 Pro Max': [
        'https://via.placeholder.com/400x600/4c1d95/ffffff?text=iPhone+14+Pro+Max',
        'https://via.placeholder.com/400x600/7c3aed/ffffff?text=iPhone+14+Pro+Max',
        'https://via.placeholder.com/400x600/a78bfa/ffffff?text=iPhone+14+Pro+Max',
    ],
    'iPhone 14 Pro': [
        'https://via.placeholder.com/400x600/4c1d95/ffffff?text=iPhone+14+Pro',
        'https://via.placeholder.com/400x600/7c3aed/ffffff?text=iPhone+14+Pro',
        'https://via.placeholder.com/400x600/a78bfa/ffffff?text=iPhone+14+Pro',
    ],
    'iPhone 14 Plus': [
        'https://via.placeholder.com/400x600/4c1d95/ffffff?text=iPhone+14+Plus',
        'https://via.placeholder.com/400x600/7c3aed/ffffff?text=iPhone+14+Plus',
        'https://via.placeholder.com/400x600/a78bfa/ffffff?text=iPhone+14+Plus',
    ],
    'iPhone 14': [
        'https://via.placeholder.com/400x600/4c1d95/ffffff?text=iPhone+14',
        'https://via.placeholder.com/400x600/7c3aed/ffffff?text=iPhone+14',
        'https://via.placeholder.com/400x600/a78bfa/ffffff?text=iPhone+14',
    ],
    // iPhone 13 Series
    'iPhone 13 Pro Max': [
        'https://via.placeholder.com/400x600/065f46/ffffff?text=iPhone+13+Pro+Max',
        'https://via.placeholder.com/400x600/10b981/ffffff?text=iPhone+13+Pro+Max',
        'https://via.placeholder.com/400x600/6ee7b7/ffffff?text=iPhone+13+Pro+Max',
    ],
    'iPhone 13 Pro': [
        'https://via.placeholder.com/400x600/065f46/ffffff?text=iPhone+13+Pro',
        'https://via.placeholder.com/400x600/10b981/ffffff?text=iPhone+13+Pro',
        'https://via.placeholder.com/400x600/6ee7b7/ffffff?text=iPhone+13+Pro',
    ],
    'iPhone 13 mini': [
        'https://via.placeholder.com/400x600/065f46/ffffff?text=iPhone+13+mini',
        'https://via.placeholder.com/400x600/10b981/ffffff?text=iPhone+13+mini',
        'https://via.placeholder.com/400x600/6ee7b7/ffffff?text=iPhone+13+mini',
    ],
    'iPhone 13': [
        'https://via.placeholder.com/400x600/065f46/ffffff?text=iPhone+13',
        'https://via.placeholder.com/400x600/10b981/ffffff?text=iPhone+13',
        'https://via.placeholder.com/400x600/6ee7b7/ffffff?text=iPhone+13',
    ],
    // iPhone 12 Series
    'iPhone 12 Pro Max': [
        'https://via.placeholder.com/400x600/92400e/ffffff?text=iPhone+12+Pro+Max',
        'https://via.placeholder.com/400x600/f59e0b/ffffff?text=iPhone+12+Pro+Max',
        'https://via.placeholder.com/400x600/fbbf24/ffffff?text=iPhone+12+Pro+Max',
    ],
    'iPhone 12 Pro': [
        'https://via.placeholder.com/400x600/92400e/ffffff?text=iPhone+12+Pro',
        'https://via.placeholder.com/400x600/f59e0b/ffffff?text=iPhone+12+Pro',
        'https://via.placeholder.com/400x600/fbbf24/ffffff?text=iPhone+12+Pro',
    ],
    'iPhone 12 mini': [
        'https://via.placeholder.com/400x600/92400e/ffffff?text=iPhone+12+mini',
        'https://via.placeholder.com/400x600/f59e0b/ffffff?text=iPhone+12+mini',
        'https://via.placeholder.com/400x600/fbbf24/ffffff?text=iPhone+12+mini',
    ],
    'iPhone 12': [
        'https://via.placeholder.com/400x600/92400e/ffffff?text=iPhone+12',
        'https://via.placeholder.com/400x600/f59e0b/ffffff?text=iPhone+12',
        'https://via.placeholder.com/400x600/fbbf24/ffffff?text=iPhone+12',
    ],
    // iPhone 11 Series
    'iPhone 11 Pro Max': [
        'https://via.placeholder.com/400x600/be123c/ffffff?text=iPhone+11+Pro+Max',
        'https://via.placeholder.com/400x600/f43f5e/ffffff?text=iPhone+11+Pro+Max',
        'https://via.placeholder.com/400x600/fda4af/ffffff?text=iPhone+11+Pro+Max',
    ],
    'iPhone 11 Pro': [
        'https://via.placeholder.com/400x600/be123c/ffffff?text=iPhone+11+Pro',
        'https://via.placeholder.com/400x600/f43f5e/ffffff?text=iPhone+11+Pro',
        'https://via.placeholder.com/400x600/fda4af/ffffff?text=iPhone+11+Pro',
    ],
    'iPhone 11': [
        'https://via.placeholder.com/400x600/be123c/ffffff?text=iPhone+11',
        'https://via.placeholder.com/400x600/f43f5e/ffffff?text=iPhone+11',
        'https://via.placeholder.com/400x600/fda4af/ffffff?text=iPhone+11',
    ],
    // iPhone SE
    'iPhone SE (2ª Gen)': [
        'https://via.placeholder.com/400x600/374151/ffffff?text=iPhone+SE+2',
        'https://via.placeholder.com/400x600/6b7280/ffffff?text=iPhone+SE+2',
        'https://via.placeholder.com/400x600/9ca3af/ffffff?text=iPhone+SE+2',
    ],
    'iPhone SE (3ª Gen)': [
        'https://via.placeholder.com/400x600/374151/ffffff?text=iPhone+SE+3',
        'https://via.placeholder.com/400x600/6b7280/ffffff?text=iPhone+SE+3',
        'https://via.placeholder.com/400x600/9ca3af/ffffff?text=iPhone+SE+3',
    ],
    // Modelos futuros
    'iPhone 16 Pro Max': [
        'https://via.placeholder.com/400x600/1e3a8a/ffffff?text=iPhone+16+Pro+Max',
        'https://via.placeholder.com/400x600/3b82f6/ffffff?text=iPhone+16+Pro+Max',
        'https://via.placeholder.com/400x600/60a5fa/ffffff?text=iPhone+16+Pro+Max',
    ],
    'iPhone 16 Pro': [
        'https://via.placeholder.com/400x600/1e3a8a/ffffff?text=iPhone+16+Pro',
        'https://via.placeholder.com/400x600/3b82f6/ffffff?text=iPhone+16+Pro',
        'https://via.placeholder.com/400x600/60a5fa/ffffff?text=iPhone+16+Pro',
    ],
    'iPhone 16 Plus': [
        'https://via.placeholder.com/400x600/1e3a8a/ffffff?text=iPhone+16+Plus',
        'https://via.placeholder.com/400x600/3b82f6/ffffff?text=iPhone+16+Plus',
        'https://via.placeholder.com/400x600/60a5fa/ffffff?text=iPhone+16+Plus',
    ],
    'iPhone 16': [
        'https://via.placeholder.com/400x600/1e3a8a/ffffff?text=iPhone+16',
        'https://via.placeholder.com/400x600/3b82f6/ffffff?text=iPhone+16',
        'https://via.placeholder.com/400x600/60a5fa/ffffff?text=iPhone+16',
    ],
    'iPhone 16e': [
        'https://via.placeholder.com/400x600/1e3a8a/ffffff?text=iPhone+16e',
        'https://via.placeholder.com/400x600/3b82f6/ffffff?text=iPhone+16e',
        'https://via.placeholder.com/400x600/60a5fa/ffffff?text=iPhone+16e',
    ],
    'iPhone 17': [
        'https://via.placeholder.com/400x600/1e3a8a/ffffff?text=iPhone+17',
        'https://via.placeholder.com/400x600/3b82f6/ffffff?text=iPhone+17',
        'https://via.placeholder.com/400x600/60a5fa/ffffff?text=iPhone+17',
    ],
    'iPhone Air': [
        'https://via.placeholder.com/400x600/1e3a8a/ffffff?text=iPhone+Air',
        'https://via.placeholder.com/400x600/3b82f6/ffffff?text=iPhone+Air',
        'https://via.placeholder.com/400x600/60a5fa/ffffff?text=iPhone+Air',
    ],
};
async function main() {
    console.log('\n🔧 CORRIGIENDO IMÁGENES ROTAS...\n');
    console.log('═══════════════════════════════════════════════════════════\n');
    let actualizados = 0;
    const equipos = await prisma.equipos.findMany({
        select: {
            IdEquipo: true,
            Nombre: true,
        },
    });
    for (const equipo of equipos) {
        const imagenes = imagenesCorregidas[equipo.Nombre];
        if (imagenes) {
            const imagenesStr = imagenes.join(',');
            await prisma.equipos.update({
                where: { IdEquipo: equipo.IdEquipo },
                data: { ImagenesURL: imagenesStr },
            });
            console.log(`✅ ${equipo.Nombre} - URLs actualizadas`);
            actualizados++;
        }
    }
    console.log('\n═══════════════════════════════════════════════════════════');
    console.log(`\n✅ Total actualizados: ${actualizados}\n`);
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=fix-broken-images.js.map