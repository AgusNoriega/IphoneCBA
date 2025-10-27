import { ProductsService } from './products.service';
import { GetProductsDto } from './dto/get-products.dto';
export declare class ProductsController {
    private svc;
    constructor(svc: ProductsService);
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
}
//# sourceMappingURL=products.controller.d.ts.map