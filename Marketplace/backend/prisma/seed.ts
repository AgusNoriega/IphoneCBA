import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // NO CREAR DATOS FICTICIOS - Solo trabajar con datos reales de la base de datos
  console.log('ℹ️  Seed deshabilitado - La aplicación usa solo datos reales de la base de datos IphoneCBA');
  
  // Verificar datos existentes
  const [equipos, colores, productos, estados] = await Promise.all([
    prisma.equipos.findMany(),
    prisma.colores.findMany(),
    prisma.producto.findMany(),
    prisma.estados.findMany(),
  ]);
  
  console.log('\n📊 Resumen de datos en la base de datos:');
  console.log(`  📱 Equipos: ${equipos.length}`);
  equipos.forEach(e => console.log(`     - ${e.Nombre} (ID: ${e.IdEquipo})`));
  
  console.log(`\n  🎨 Colores: ${colores.length}`);
  colores.slice(0, 10).forEach(c => console.log(`     - ${c.Nombre} (ID: ${c.IdColor})`));
  if (colores.length > 10) console.log(`     ... y ${colores.length - 10} más`);
  
  console.log(`\n  📦 Productos: ${productos.length}`);
  console.log(`  📋 Estados: ${estados.length}`);
  estados.forEach(e => console.log(`     - ${e.Nombre} (ID: ${e.IdEstado})`));
  
  console.log('\n✅ Los datos reales están listos para usar\n');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
