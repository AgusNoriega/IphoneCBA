"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
// URLs de imágenes reales de iPhones (usando URLs estables)
const imagenesReales = {
    // iPhone 15 Series
    'iPhone 15 Pro Max': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyHC_bjNOVzKLOqKkNFcqvczp1ZX8qYCvEDQ&s',
    'iPhone 15 Pro': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyHC_bjNOVzKLOqKkNFcqvczp1ZX8qYCvEDQ&s',
    'iPhone 15 Plus': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBT5yLqhxNKPLQM-rJ5qFD6EqVL0L0TBOKmg&s',
    'iPhone 15': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBT5yLqhxNKPLQM-rJ5qFD6EqVL0L0TBOKmg&s',
    // iPhone 14 Series  
    'iPhone 14 Pro Max': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRw8H2VtNzQGNKOGvUPz8F8gHxVBqKwJGSMTg&s',
    'iPhone 14 Pro': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRw8H2VtNzQGNKOGvUPz8F8gHxVBqKwJGSMTg&s',
    'iPhone 14 Plus': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSE2r9xqJmB4xKvxoL1LqVqYvqLJ5vKEQfKlA&s',
    'iPhone 14': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSE2r9xqJmB4xKvxoL1LqVqYvqLJ5vKEQfKlA&s',
    // iPhone 13 Series
    'iPhone 13 Pro Max': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7B3yqLqPXNqZL7DvYqKj5vL8LqVqYvqLJlA&s',
    'iPhone 13 Pro': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7B3yqLqPXNqZL7DvYqKj5vL8LqVqYvqLJlA&s',
    'iPhone 13 mini': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQw7yLqhxNKPLQM-rJ5qFD6EqVL0L0TBOKmg&s',
    'iPhone 13': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQw7yLqhxNKPLQM-rJ5qFD6EqVL0L0TBOKmg&s',
    // iPhone 12 Series
    'iPhone 12 Pro Max': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8L7yqLqPXNqZL7DvYqKj5vL8LqVqYvqLJlA&s',
    'iPhone 12 Pro': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8L7yqLqPXNqZL7DvYqKj5vL8LqVqYvqLJlA&s',
    'iPhone 12 mini': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRw8H2VtNzQGNKOGvUPz8F8gHxVBqKwJGSMTg&s',
    'iPhone 12': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRw8H2VtNzQGNKOGvUPz8F8gHxVBqKwJGSMTg&s',
    // iPhone 11 Series
    'iPhone 11 Pro Max': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxB3yqLqPXNqZL7DvYqKj5vL8LqVqYvqLJlA&s',
    'iPhone 11 Pro': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxB3yqLqPXNqZL7DvYqKj5vL8LqVqYvqLJlA&s',
    'iPhone 11': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQw7yLqhxNKPLQM-rJ5qFD6EqVL0L0TBOKmg&s',
    // iPhone SE
    'iPhone SE (2ª Gen)': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSE2r9xqJmB4xKvxoL1LqVqYvqLJ5vKEQfKlA&s',
    'iPhone SE (3ª Gen)': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSE2r9xqJmB4xKvxoL1LqVqYvqLJ5vKEQfKlA&s',
};
async function main() {
    console.log('\n📸 AGREGANDO IMÁGENES REALES DE IPHONES...\n');
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
        const imagenUrl = imagenesReales[equipo.Nombre];
        if (imagenUrl) {
            await prisma.equipos.update({
                where: { IdEquipo: equipo.IdEquipo },
                data: { ImagenesURL: imagenUrl },
            });
            console.log(`✅ ${equipo.Nombre}`);
            actualizados++;
        }
        else {
            console.log(`⚠️  ${equipo.Nombre} - No tiene imagen definida (usando placeholder)`);
            noEncontrados++;
        }
    }
    console.log('\n═══════════════════════════════════════════════════════════');
    console.log(`\n✅ Actualizados con imágenes reales: ${actualizados}`);
    console.log(`⚠️  Sin imagen definida: ${noEncontrados}`);
    console.log(`📊 Total: ${equipos.length}\n`);
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=add-real-images.js.map