# Sistema de Imágenes Dinámicas

## 📖 Descripción

El sistema ahora carga las imágenes de productos directamente desde la base de datos, lo que permite agregar nuevos productos con sus imágenes sin necesidad de modificar el código.

## 🗄️ Estructura de Base de Datos

La tabla `Equipos` ahora incluye el campo `ImagenesURL` (tipo TEXT) que almacena un array JSON de URLs de imágenes.

```sql
ALTER TABLE "Equipos" 
ADD COLUMN "ImagenesURL" TEXT;
```

## 📸 Formato de Imágenes

Las URLs se almacenan como un array JSON:

```json
["https://example.com/image1.jpg", "https://example.com/image2.jpg"]
```

## 🚀 Uso

### 1. Agregar imágenes a un equipo existente

Usa el script `update-equipment-images.ts`:

```bash
npx ts-node prisma/update-equipment-images.ts <idEquipo> <url1> [url2] [url3] ...
```

**Ejemplo:**
```bash
npx ts-node prisma/update-equipment-images.ts 11 "https://example.com/iphone13mini-1.jpg" "https://example.com/iphone13mini-2.jpg"
```

### 2. Agregar un nuevo equipo con imágenes

Cuando insertes un nuevo equipo en la base de datos, incluye las imágenes:

```sql
INSERT INTO "Equipos" ("Nombre", "ImagenesURL") 
VALUES (
  'iPhone 16 Ultra', 
  '["https://example.com/iphone16ultra-1.jpg", "https://example.com/iphone16ultra-2.jpg"]'
);
```

### 3. Actualizar imágenes manualmente en la DB

```sql
UPDATE "Equipos" 
SET "ImagenesURL" = '["https://example.com/new-image.jpg"]'
WHERE "IdEquipo" = 15;
```

## 🎯 Resultados

- **Productos con imágenes**: Se mostrarán con su carrusel de imágenes
- **Productos sin imágenes**: Se mostrará el placeholder por defecto (`/placeholder.png`)
- **Imágenes inválidas**: Se mostrará el placeholder automáticamente

## 📋 Scripts Disponibles

### `populate-images.ts`
Pobla las imágenes iniciales para los equipos existentes.

```bash
npx ts-node prisma/populate-images.ts
```

### `update-equipment-images.ts`
Actualiza las imágenes de un equipo específico.

```bash
npx ts-node prisma/update-equipment-images.ts <idEquipo> <urls...>
```

## 🔍 Ver equipos sin imágenes

```sql
SELECT "IdEquipo", "Nombre", "ImagenesURL"
FROM "Equipos"
WHERE "ImagenesURL" IS NULL OR "ImagenesURL" = '[]';
```

## 💡 Consejos

1. **Usa URLs de CDN confiables** (como Apple CDN, Cloudinary, etc.)
2. **Mantén las imágenes en formato compatible** (JPG, PNG, WebP)
3. **Optimiza el tamaño** de las imágenes para carga rápida
4. **Usa múltiples ángulos** para mejor experiencia de usuario (2-4 imágenes por producto)

## 🛠️ Troubleshooting

**Problema**: Las imágenes no se muestran
- Verifica que el campo `ImagenesURL` tenga JSON válido
- Verifica que las URLs sean accesibles
- Revisa la consola del navegador para errores de CORS

**Problema**: Aparece placeholder en lugar de imagen
- Verifica que el array JSON no esté vacío: `'[]'`
- Verifica que las URLs sean strings válidas
- Asegúrate de que el servicio esté reconstruido después de cambios

## 🔄 Workflow Completo

1. Agregar nuevo equipo a la base de datos
2. Agregar sus imágenes usando el script o SQL directo
3. Los productos con ese equipo aparecerán automáticamente con sus imágenes
4. No se requiere reiniciar el servidor (las imágenes se leen en cada request)


