"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    console.log('📱 Agregando productos a la base de datos...\n');
    // Obtener IDs necesarios
    const equipos = await prisma.equipos.findMany();
    const colores = await prisma.colores.findMany();
    const grados = await prisma.grados.findMany();
    const disponibilidades = await prisma.disponibilidades.findMany();
    const estados = await prisma.estados.findMany();
    console.log(`✓ Equipos disponibles: ${equipos.length}`);
    console.log(`✓ Colores disponibles: ${colores.length}`);
    console.log(`✓ Grados disponibles: ${grados.length}\n`);
    // Función para generar IMEI aleatorio
    const generateIMEI = () => {
        return `${Math.floor(Math.random() * 900000000000000) + 100000000000000}`;
    };
    // Productos a crear
    const productos = [
        // iPhone 15 Pro - Varios colores y capacidades
        { equipoNombre: 'iPhone 15 Pro', capacidad: 256, colorNombre: 'Titanio Negro', bateria: 100, grado: 'A', coste: 1100, diasAtras: 0 },
        { equipoNombre: 'iPhone 15 Pro', capacidad: 512, colorNombre: 'Titanio Natural', bateria: 100, grado: 'A', coste: 1200, diasAtras: 0 },
        { equipoNombre: 'iPhone 15 Pro', capacidad: 128, colorNombre: 'Titanio Blanco', bateria: 100, grado: 'A', coste: 1000, diasAtras: 1 },
        { equipoNombre: 'iPhone 15 Pro', capacidad: 256, colorNombre: 'Titanio Desierto', bateria: 100, grado: 'S', coste: 1150, diasAtras: 0 },
        // iPhone 15
        { equipoNombre: 'iPhone 15', capacidad: 256, colorNombre: 'Negro', bateria: 100, grado: 'A', coste: 900, diasAtras: 0 },
        { equipoNombre: 'iPhone 15', capacidad: 128, colorNombre: 'Azul', bateria: 100, grado: 'A', coste: 850, diasAtras: 1 },
        { equipoNombre: 'iPhone 15', capacidad: 512, colorNombre: 'Rosa', bateria: 100, grado: 'A', coste: 950, diasAtras: 3 },
        { equipoNombre: 'iPhone 15', capacidad: 256, colorNombre: 'Amarillo', bateria: 100, grado: 'S', coste: 920, diasAtras: 0 },
        // iPhone 14 Pro
        { equipoNombre: 'iPhone 14 Pro', capacidad: 256, colorNombre: 'Morado', bateria: 95, grado: 'A', coste: 850, diasAtras: 5 },
        { equipoNombre: 'iPhone 14 Pro', capacidad: 128, colorNombre: 'Gris Espacial', bateria: 98, grado: 'A', coste: 800, diasAtras: 4 },
        { equipoNombre: 'iPhone 14 Pro', capacidad: 512, colorNombre: 'Blanco', bateria: 100, grado: 'A', coste: 900, diasAtras: 2 },
        { equipoNombre: 'iPhone 14 Pro', capacidad: 256, colorNombre: 'Plata', bateria: 97, grado: 'S', coste: 880, diasAtras: 1 },
        // iPhone 14
        { equipoNombre: 'iPhone 14', capacidad: 256, colorNombre: 'Azul', bateria: 92, grado: 'B', coste: 650, diasAtras: 10 },
        { equipoNombre: 'iPhone 14', capacidad: 128, colorNombre: 'Morado', bateria: 95, grado: 'A', coste: 700, diasAtras: 7 },
        { equipoNombre: 'iPhone 14', capacidad: 256, colorNombre: 'Blanco', bateria: 88, grado: 'B', coste: 620, diasAtras: 12 },
        { equipoNombre: 'iPhone 14', capacidad: 128, colorNombre: 'Medianoche', bateria: 90, grado: 'A', coste: 680, diasAtras: 8 },
        // iPhone 13 Pro
        { equipoNombre: 'iPhone 13 Pro', capacidad: 256, colorNombre: 'Gris Espacial', bateria: 90, grado: 'A', coste: 750, diasAtras: 8 },
        { equipoNombre: 'iPhone 13 Pro', capacidad: 128, colorNombre: 'Azul', bateria: 85, grado: 'B', coste: 650, diasAtras: 15 },
        { equipoNombre: 'iPhone 13 Pro', capacidad: 512, colorNombre: 'Plata', bateria: 92, grado: 'A', coste: 800, diasAtras: 6 },
        { equipoNombre: 'iPhone 13 Pro', capacidad: 256, colorNombre: 'Verde', bateria: 88, grado: 'B', coste: 720, diasAtras: 10 },
        // iPhone 13
        { equipoNombre: 'iPhone 13', capacidad: 128, colorNombre: 'Medianoche', bateria: 88, grado: 'B', coste: 550, diasAtras: 20 },
        { equipoNombre: 'iPhone 13', capacidad: 256, colorNombre: 'Azul', bateria: 90, grado: 'A', coste: 600, diasAtras: 18 },
        { equipoNombre: 'iPhone 13', capacidad: 128, colorNombre: 'Rosa', bateria: 85, grado: 'B', coste: 520, diasAtras: 25 },
        { equipoNombre: 'iPhone 13', capacidad: 256, colorNombre: 'Blanco Estelar', bateria: 92, grado: 'A', coste: 620, diasAtras: 15 },
        // iPhone 12 Pro
        { equipoNombre: 'iPhone 12 Pro', capacidad: 256, colorNombre: 'Gris Espacial', bateria: 85, grado: 'B', coste: 600, diasAtras: 30 },
        { equipoNombre: 'iPhone 12 Pro', capacidad: 128, colorNombre: 'Azul', bateria: 80, grado: 'C', coste: 500, diasAtras: 40 },
        { equipoNombre: 'iPhone 12 Pro', capacidad: 256, colorNombre: 'Plata', bateria: 83, grado: 'B', coste: 580, diasAtras: 35 },
        // iPhone 12
        { equipoNombre: 'iPhone 12', capacidad: 128, colorNombre: 'Blanco', bateria: 82, grado: 'B', coste: 450, diasAtras: 35 },
        { equipoNombre: 'iPhone 12', capacidad: 256, colorNombre: 'Negro', bateria: 78, grado: 'C', coste: 420, diasAtras: 45 },
        { equipoNombre: 'iPhone 12', capacidad: 128, colorNombre: 'Azul', bateria: 80, grado: 'B', coste: 460, diasAtras: 38 },
        { equipoNombre: 'iPhone 12', capacidad: 256, colorNombre: 'Verde', bateria: 85, grado: 'A', coste: 500, diasAtras: 30 },
        // iPhone 11 Pro
        { equipoNombre: 'iPhone 11 Pro', capacidad: 256, colorNombre: 'Gris Espacial', bateria: 75, grado: 'C', coste: 400, diasAtras: 50 },
        { equipoNombre: 'iPhone 11 Pro', capacidad: 128, colorNombre: 'Plata', bateria: 80, grado: 'B', coste: 420, diasAtras: 48 },
        { equipoNombre: 'iPhone 11 Pro', capacidad: 256, colorNombre: 'Verde', bateria: 78, grado: 'C', coste: 410, diasAtras: 52 },
        // iPhone 11
        { equipoNombre: 'iPhone 11', capacidad: 128, colorNombre: 'Negro', bateria: 78, grado: 'C', coste: 350, diasAtras: 60 },
        { equipoNombre: 'iPhone 11', capacidad: 256, colorNombre: 'Morado', bateria: 82, grado: 'B', coste: 380, diasAtras: 55 },
        { equipoNombre: 'iPhone 11', capacidad: 128, colorNombre: 'Blanco', bateria: 80, grado: 'B', coste: 360, diasAtras: 58 },
        { equipoNombre: 'iPhone 11', capacidad: 256, colorNombre: 'Amarillo', bateria: 85, grado: 'A', coste: 400, diasAtras: 50 },
    ];
    let creados = 0;
    let errores = 0;
    for (const prod of productos) {
        try {
            // Buscar equipo
            const equipo = equipos.find(e => e.Nombre.toLowerCase().includes(prod.equipoNombre.toLowerCase()));
            if (!equipo) {
                console.log(`⚠️  Equipo no encontrado: ${prod.equipoNombre}`);
                errores++;
                continue;
            }
            // Buscar color
            const color = colores.find(c => c.Nombre.toLowerCase() === prod.colorNombre.toLowerCase());
            if (!color) {
                console.log(`⚠️  Color no encontrado: ${prod.colorNombre}`);
                errores++;
                continue;
            }
            // Buscar grado
            const grado = grados.find(g => g.Nombre === prod.grado);
            if (!grado) {
                console.log(`⚠️  Grado no encontrado: ${prod.grado}`);
                errores++;
                continue;
            }
            // Obtener disponibilidad (Deposito)
            const disponibilidad = disponibilidades.find(d => d.Nombre === 'Deposito');
            if (!disponibilidad) {
                console.log(`⚠️  Disponibilidad "Deposito" no encontrada`);
                errores++;
                continue;
            }
            // Estado (siempre Nuevo)
            const estado = estados.find(e => e.Nombre === 'Nuevo');
            if (!estado) {
                console.log(`⚠️  Estado "Nuevo" no encontrado`);
                errores++;
                continue;
            }
            // Calcular fecha (restar días)
            const fecha = new Date();
            fecha.setDate(fecha.getDate() - prod.diasAtras);
            // Crear producto
            const producto = await prisma.producto.create({
                data: {
                    IMEI: generateIMEI(),
                    IdEquipo: equipo.IdEquipo,
                    Capacidad: prod.capacidad,
                    IdColor: color.IdColor,
                    Bateria: prod.bateria,
                    IdGrado: grado.IdGrado,
                    IdEstado: estado.IdEstado,
                    IdDisponibilidad: disponibilidad.IdDisponibilidad,
                    Coste: prod.coste,
                    Fecha: fecha,
                    Detalle: null
                }
            });
            const isNew = prod.diasAtras === 0 ? ' 🆕' : '';
            console.log(`✅ ${equipo.Nombre} ${prod.capacidad}GB ${color.Nombre} - Batería: ${prod.bateria}%${isNew}`);
            creados++;
        }
        catch (error) {
            console.error(`❌ Error creando producto:`, error);
            errores++;
        }
    }
    console.log(`\n✨ Proceso completado!`);
    console.log(`   ✅ Productos creados: ${creados}`);
    if (errores > 0) {
        console.log(`   ⚠️  Errores: ${errores}`);
    }
    // Mostrar total de productos
    const total = await prisma.producto.count({
        where: {
            disponibilidad: {
                Nombre: {
                    in: ['Deposito', 'Local']
                }
            }
        }
    });
    console.log(`\n📊 Total de productos disponibles: ${total}`);
}
main()
    .catch((e) => {
    console.error('❌ Error:', e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=add-products.js.map