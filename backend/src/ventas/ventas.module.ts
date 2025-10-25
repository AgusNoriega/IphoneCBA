import { Module } from '@nestjs/common';
import { VentasController } from './ventas.controller';
import { VentasService } from './ventas.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],         // <- aquí
  controllers: [VentasController],
  providers: [VentasService],
})
export class VentasModule {}
