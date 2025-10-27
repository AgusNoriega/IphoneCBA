# iPhoneCBA - Marketplace de iPhone

Proyecto completo de marketplace para iPhone con backend NestJS + Prisma y frontend React.

## Estructura del Proyecto

```
iphonecba/
├── backend/          # NestJS + Prisma + PostgreSQL
├── frontend/         # React + Vite (JavaScript)
└── package.json      # Scripts del monorepo
```

## Instalación y Configuración

### 1. Preparar Base de Datos

Crear una base de datos PostgreSQL llamada `iphonecba`:

```sql
CREATE DATABASE iphonecba;
```

### 2. Configurar Variables de Entorno

**Backend:**
```bash
cd backend
cp .env.example .env
```

**Frontend:**
```bash
cd frontend
cp .env.example .env
```

### 3. Instalar Dependencias

**Opción A - Instalación completa desde raíz:**
```bash
npm install
npm run dev
```

**Opción B - Instalación manual:**
```bash
# Backend
cd backend
npm install
npm run prisma:generate
npm run prisma:migrate
npm run db:seed
npm run start:dev

# Frontend (en otra terminal)
cd frontend
npm install
npm run dev
```

## Funcionalidades

### Backend (Puerto 3000)
- **GET /products** - Lista productos con filtros (brand, condition, color, q)
- **POST /orders/current/items** - Agregar producto al pedido actual
- **GET /orders/current/summary** - Resumen del pedido actual

### Frontend (Puerto 5173)
- Filtros por marca (Apple/Samsung), condición (NUEVO/USADO), color
- Búsqueda por texto
- Grid de productos con información detallada
- Agregar productos al pedido con confirmación para productos USADOS
- Contador de items en el pedido
- Botón "Limpiar filtros"

## Tecnologías

- **Backend:** NestJS, Prisma, PostgreSQL
- **Frontend:** React, Vite, Zustand, React Hot Toast
- **UI:** CSS Variables con paleta personalizada

## Datos de Prueba

El seed incluye productos de iPhone con diferentes condiciones, colores y precios para testing.
