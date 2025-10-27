import { PrismaService } from '../prisma/prisma.service';
import { GetProductsDto } from './dto/get-products.dto';
export declare class ProductsService {
    private prisma;
    constructor(prisma: PrismaService);
    private getImageUrls;
    list(q: GetProductsDto): Promise<{
        items: {
            id: string;
            name: string;
            images: string[];
            brand: string;
            condition: string;
            color: string;
            storageGb: number | null;
            battery: import("@prisma/client/runtime/library").Decimal;
            grade: string;
            priceUsd: number;
            cost: number;
            detail: string | null;
            availability: string;
            date: Date;
            stock: number;
            isNew: boolean;
        }[];
        total: number;
    }>;
    listGrouped(q: GetProductsDto): Promise<{
        items: {
            baseModel: any;
            images: any;
            variants: unknown[];
            capacities: number[];
            colors: unknown[];
            products: any;
            minPrice: number;
            totalStock: any;
        }[];
        total: number;
    }>;
    private extractBaseModel;
    private extractVariant;
    private getModelOrder;
}
//# sourceMappingURL=products.service.d.ts.map