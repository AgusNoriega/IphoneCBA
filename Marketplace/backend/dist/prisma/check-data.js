"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    console.log('🔍 Verificando datos en la base de datos...\n');
    // Ver estados
    const estados = await prisma.estados.findMany();
    console.log('📋 Estados disponibles:');
    estados.forEach(e => console.log(`   - ID ${e.IdEstado}: ${e.Nombre}`));
    // Ver colores
    const colores = await prisma.colores.findMany();
    console.log('\n🎨 Colores disponibles:');
    colores.forEach(c => console.log(`   - ID ${c.IdColor}: ${c.Nombre}`));
    // Ver grados
    const grados = await prisma.grados.findMany();
    console.log('\n⭐ Grados disponibles:');
    grados.forEach(g => console.log(`   - ID ${g.IdGrado}: ${g.Nombre}`));
    // Ver disponibilidades
    const disponibilidades = await prisma.disponibilidades.findMany();
    console.log('\n📦 Disponibilidades:');
    disponibilidades.forEach(d => console.log(`   - ID ${d.IdDisponibilidad}: ${d.Nombre}`));
}
main()
    .catch((e) => {
    console.error('❌ Error:', e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=check-data.js.map