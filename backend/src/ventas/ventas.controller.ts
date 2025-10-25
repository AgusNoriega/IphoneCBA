import { Body, Controller, Post } from '@nestjs/common';
import { VentasService } from './ventas.service';

@Controller('ventas')
export class VentasController {
  constructor(private readonly service: VentasService) {}

  @Post()
  crear(@Body() body: any) {
    return this.service.crearVenta(body);
  }
}
