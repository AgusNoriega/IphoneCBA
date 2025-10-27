import { PrismaService } from '../prisma/prisma.service';
export declare class OrdersService {
    private prisma;
    constructor(prisma: PrismaService);
    private currentOrder;
    summary(): Promise<{
        totalItems: number;
    }>;
    addItem(productId: string, qty?: number): Promise<{
        ok: boolean;
        remainingStock: number;
        message: string;
        precioUnitario: number;
    }>;
}
//# sourceMappingURL=orders.service.d.ts.map