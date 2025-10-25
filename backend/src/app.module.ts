import { Module } from '@nestjs/common';
import { VentasModule } from './ventas/ventas.module';
import { PrismaModule } from './prisma/prisma.module';
import { CatalogosModule } from './catalogo/catalogo.module';

@Module({
  imports: [PrismaModule, VentasModule, CatalogosModule],
})
export class AppModule {}
