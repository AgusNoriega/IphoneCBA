"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let ProductsService = class ProductsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    getImageUrls(equipo) {
        const defaultPlaceholder = [
            '/iphone-placeholder.svg',
            '/iphone-placeholder.svg',
            '/iphone-placeholder.svg'
        ];
        if (equipo.ImagenesURL) {
            try {
                const urls = equipo.ImagenesURL
                    .split(',')
                    .map((url) => url.trim())
                    .filter((url) => url.length > 0);
                if (urls.length > 0) {
                    return urls;
                }
            }
            catch (error) {
                console.warn(`Error parsing ImagenesURL for equipo ${equipo.IdEquipo}:`, error);
            }
        }
        return defaultPlaceholder;
    }
    async list(q) {
        const where = {};
        if (q.brand) {
            if (q.brand.toLowerCase() === 'apple') {
                where.equipo = {
                    Nombre: {
                        contains: 'iPhone',
                        mode: 'insensitive'
                    }
                };
            }
            else if (q.brand.toLowerCase() === 'samsung') {
                where.equipo = {
                    Nombre: {
                        contains: 'Galaxy',
                        mode: 'insensitive'
                    }
                };
            }
        }
        if (q.color) {
            where.color = { Nombre: { contains: q.color, mode: 'insensitive' } };
        }
        if (q.condition) {
            const estadoId = q.condition === 'NUEVO' ? 1 : 2;
            where.IdEstado = estadoId;
        }
        if (q.q) {
            where.OR = [
                { equipo: { Nombre: { contains: q.q, mode: 'insensitive' } } },
                { Detalle: { contains: q.q, mode: 'insensitive' } },
                { color: { Nombre: { contains: q.q, mode: 'insensitive' } } }
            ];
        }
        where.disponibilidad = { Nombre: { in: ['Deposito', 'Local'] } };
        const page = q.page ?? 1;
        const size = q.size ?? 24;
        const skip = (page - 1) * size;
        const [items, total] = await Promise.all([
            this.prisma.producto.findMany({
                where,
                skip,
                take: size,
                orderBy: [{ equipo: { Nombre: 'asc' } }, { Capacidad: 'desc' }],
                include: {
                    equipo: true,
                    color: true,
                    grado: true,
                    estado: true,
                    disponibilidad: true,
                },
            }),
            this.prisma.producto.count({ where }),
        ]);
        const itemsWithPrice = await Promise.all(items.map(async (item) => {
            const rango = await this.prisma.rangos_de_Bateria.findFirst({
                where: {
                    minimoPorcentaje: { lte: item.Bateria },
                    MaximoPorcentaje: { gte: item.Bateria }
                }
            });
            let precioMayorista = item.Coste;
            if (rango) {
                const precio = await this.prisma.precios_Mayorista.findUnique({
                    where: {
                        IdEquipo_IdRango_IdGrado: {
                            IdEquipo: item.equipo.IdEquipo,
                            IdRango: rango.IdRango,
                            IdGrado: item.grado.IdGrado
                        }
                    }
                });
                if (precio) {
                    precioMayorista = Number(precio.Precio);
                }
            }
            const now = new Date();
            const productDate = new Date(item.Fecha);
            const hoursDiff = (now.getTime() - productDate.getTime()) / (1000 * 60 * 60);
            const isNew = hoursDiff <= 24 && item.estado.Nombre.toUpperCase() === 'NUEVO';
            return {
                id: item.IMEI,
                name: item.equipo.Nombre,
                images: this.getImageUrls(item.equipo),
                brand: 'Apple',
                condition: item.estado.Nombre.toUpperCase(),
                color: item.color.Nombre,
                storageGb: item.Capacidad,
                battery: item.Bateria,
                grade: item.grado.Nombre,
                priceUsd: precioMayorista,
                cost: item.Coste,
                detail: item.Detalle,
                availability: item.disponibilidad.Nombre,
                date: item.Fecha,
                stock: 1,
                isNew,
            };
        }));
        return {
            items: itemsWithPrice,
            total,
        };
    }
    async listGrouped(q) {
        const where = {};
        if (q.brand) {
            if (q.brand.toLowerCase() === 'apple') {
                where.equipo = {
                    Nombre: {
                        contains: 'iPhone',
                        mode: 'insensitive'
                    }
                };
            }
            else if (q.brand.toLowerCase() === 'samsung') {
                where.equipo = {
                    Nombre: {
                        contains: 'Galaxy',
                        mode: 'insensitive'
                    }
                };
            }
        }
        if (q.q) {
            where.OR = [
                { equipo: { Nombre: { contains: q.q, mode: 'insensitive' } } },
                { Detalle: { contains: q.q, mode: 'insensitive' } },
                { color: { Nombre: { contains: q.q, mode: 'insensitive' } } }
            ];
        }
        where.disponibilidad = { Nombre: { in: ['Deposito', 'Local'] } };
        const productos = await this.prisma.producto.findMany({
            where,
            include: {
                equipo: true,
                color: true,
                grado: true,
                estado: true,
                disponibilidad: true,
            },
        });
        const grouped = new Map();
        for (const item of productos) {
            const modeloBase = this.extractBaseModel(item.equipo.Nombre);
            if (!grouped.has(modeloBase)) {
                grouped.set(modeloBase, {
                    baseModel: modeloBase,
                    images: this.getImageUrls(item.equipo),
                    variants: new Set(),
                    capacities: new Set(),
                    colors: new Set(),
                    products: []
                });
            }
            const group = grouped.get(modeloBase);
            const variant = this.extractVariant(item.equipo.Nombre);
            group.variants.add(variant);
            group.capacities.add(item.Capacidad);
            group.colors.add(item.color.Nombre);
            const rango = await this.prisma.rangos_de_Bateria.findFirst({
                where: {
                    minimoPorcentaje: { lte: item.Bateria },
                    MaximoPorcentaje: { gte: item.Bateria }
                }
            });
            let precioMayorista = item.Coste;
            if (rango) {
                const precio = await this.prisma.precios_Mayorista.findUnique({
                    where: {
                        IdEquipo_IdRango_IdGrado: {
                            IdEquipo: item.equipo.IdEquipo,
                            IdRango: rango.IdRango,
                            IdGrado: item.grado.IdGrado
                        }
                    }
                });
                if (precio) {
                    precioMayorista = Number(precio.Precio);
                }
            }
            group.products.push({
                imei: item.IMEI,
                fullName: item.equipo.Nombre,
                variant: variant,
                capacity: item.Capacidad,
                color: item.color.Nombre,
                price: precioMayorista,
                battery: item.Bateria,
                grade: item.grado.Nombre,
                condition: item.estado.Nombre.toUpperCase(),
                availability: item.disponibilidad.Nombre,
                date: item.Fecha
            });
        }
        const items = Array.from(grouped.values()).map((group) => {
            const capacitiesArray = Array.from(group.capacities);
            return {
                baseModel: group.baseModel,
                images: group.images,
                variants: Array.from(group.variants).sort(),
                capacities: capacitiesArray.sort((a, b) => a - b),
                colors: Array.from(group.colors).sort(),
                products: group.products,
                minPrice: Math.min(...group.products.map((p) => p.price)),
                totalStock: group.products.length
            };
        }).sort((a, b) => this.getModelOrder(b.baseModel) - this.getModelOrder(a.baseModel));
        return {
            items,
            total: items.length
        };
    }
    extractBaseModel(fullName) {
        const match = fullName.match(/(iPhone \d+(?:\s+SE)?)/i);
        if (match) {
            return match[1];
        }
        return fullName;
    }
    extractVariant(fullName) {
        const base = this.extractBaseModel(fullName);
        const variant = fullName.replace(base, '').trim();
        return variant || 'Standard';
    }
    getModelOrder(baseModel) {
        const orderMap = {
            'iPhone 16': 16,
            'iPhone 15': 15,
            'iPhone 14': 14,
            'iPhone 13': 13,
            'iPhone 12': 12,
            'iPhone 11': 11,
            'iPhone SE': 10,
        };
        return orderMap[baseModel] || 0;
    }
};
exports.ProductsService = ProductsService;
exports.ProductsService = ProductsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProductsService);
//# sourceMappingURL=products.service.js.map