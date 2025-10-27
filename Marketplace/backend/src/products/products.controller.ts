import { Controller, Get, Query } from '@nestjs/common';
import { ProductsService } from './products.service';
import { GetProductsDto } from './dto/get-products.dto';

@Controller('products')
export class ProductsController {
  constructor(private svc: ProductsService) {}

  @Get()
  list(@Query() q: GetProductsDto) {
    return this.svc.list(q);
  }

  @Get('grouped')
  listGrouped(@Query() q: GetProductsDto) {
    return this.svc.listGrouped(q);
  }
}
