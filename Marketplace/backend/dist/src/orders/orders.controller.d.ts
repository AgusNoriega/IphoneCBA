import { OrdersService } from './orders.service';
export declare class OrdersController {
    private svc;
    constructor(svc: OrdersService);
    summary(): Promise<{
        totalItems: number;
    }>;
    add(body: {
        productId: string;
        qty?: number;
    }): Promise<{
        ok: boolean;
        remainingStock: number;
        message: string;
        precioUnitario: number;
    }>;
}
//# sourceMappingURL=orders.controller.d.ts.map