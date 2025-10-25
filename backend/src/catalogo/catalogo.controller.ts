import { Controller, Get } from '@nestjs/common';
import { CatalogosService } from './catalogo.service';

@Controller('catalogos')
export class CatalogosController {
  constructor(private readonly s: CatalogosService) {}

  @Get('formas-pago')
  formasPago() {
    return this.s.formasPago();
  }

  @Get('tipos-venta')
  tiposVenta() {
    return this.s.tiposVenta();
  }
}
