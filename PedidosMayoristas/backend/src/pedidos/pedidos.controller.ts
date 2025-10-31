import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { PedidosService } from './pedidos.service';
import { GetPedidosDto } from './get-pedidos.dto';

@Controller('pedidos-mayoristas')
export class PedidosController {
  constructor(private readonly service: PedidosService) {}

  @Get()
  list(@Query() dto: GetPedidosDto) {
    return this.service.list(dto);
  }

  @Post(':id/completar')
  completar(@Param('id', ParseIntPipe) id: number) {
    return this.service.completarPedido(id);
  }

  @Delete(':id')
  eliminar(@Param('id', ParseIntPipe) id: number) {
    return this.service.eliminarPedido(id);
  }
}
