"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    console.log('Agregando productos con stock múltiple...\n');
    const equipos = await prisma.equipos.findMany({
        where: {
            Nombre: {
                in: ['iPhone 15', 'iPhone 14', 'iPhone 13']
            }
        }
    });
    const colores = await prisma.colores.findMany({
        where: {
            Nombre: {
                in: ['Negro', 'Azul', 'Rosa']
            }
        }
    });
    const grados = await prisma.grados.findMany();
    const estados = await prisma.estados.findMany();
    const disponibilidades = await prisma.disponibilidades.findMany({
        where: {
            Nombre: {
                in: ['Deposito', 'Local']
            }
        }
    });
    if (!equipos.length || !colores.length || !grados.length || !estados.length || !disponibilidades.length) {
        console.log('Error: No se encontraron los datos necesarios');
        return;
    }
    const gradoA = grados.find(g => g.Nombre === 'A') || grados[0];
    const estadoNuevo = estados.find(e => e.Nombre === 'Nuevo') || estados[0];
    const disponibilidad = disponibilidades[0];
    const productosAgregar = [
        { equipo: equipos[0], color: colores[0], capacidad: 128, cantidad: 5 },
        { equipo: equipos[0], color: colores[1], capacidad: 256, cantidad: 3 },
        { equipo: equipos[1], color: colores[0], capacidad: 128, cantidad: 4 },
        { equipo: equipos[1], color: colores[2], capacidad: 256, cantidad: 3 },
        { equipo: equipos[2], color: colores[1], capacidad: 128, cantidad: 6 },
    ];
    let totalAgregados = 0;
    for (const prod of productosAgregar) {
        console.log(`Agregando ${prod.cantidad}x ${prod.equipo.Nombre} ${prod.capacidad}GB ${prod.color.Nombre}...`);
        for (let i = 0; i < prod.cantidad; i++) {
            const imei = `${Date.now()}${Math.random().toString(36).substring(2, 9)}`.substring(0, 15);
            await prisma.producto.create({
                data: {
                    IMEI: imei,
                    IdEquipo: prod.equipo.IdEquipo,
                    Capacidad: prod.capacidad,
                    IdColor: prod.color.IdColor,
                    Bateria: 95 + Math.floor(Math.random() * 5),
                    IdGrado: gradoA.IdGrado,
                    IdEstado: estadoNuevo.IdEstado,
                    Coste: 500 + Math.floor(Math.random() * 200),
                    Detalle: `Stock múltiple - Unidad ${i + 1}`,
                    IdDisponibilidad: disponibilidad.IdDisponibilidad,
                    Fecha: new Date(),
                },
            });
            totalAgregados++;
        }
    }
    console.log(`\nTotal de productos agregados: ${totalAgregados}`);
    console.log('Ahora puedes probar la funcionalidad de cantidad múltiple!');
}
main()
    .catch((e) => {
    console.error('Error:', e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=add-test-stock.js.map