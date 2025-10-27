import { Body, Controller, Get, Post } from '@nestjs/common';
import { OrdersService } from './orders.service';

@Controller('orders/current')
export class OrdersController {
  constructor(private svc: OrdersService) {}

  @Get('summary')
  summary() {
    return this.svc.summary();
  }

  @Post('items')
  add(@Body() body: { productId: string; qty?: number }) {
    return this.svc.addItem(body.productId, body.qty ?? 1);
  }
}
