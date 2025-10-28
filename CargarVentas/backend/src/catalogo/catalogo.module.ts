import { Module } from '@nestjs/common';
import { CatalogosController } from './catalogo.controller';
import { CatalogosService } from './catalogo.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [CatalogosController],
  providers: [CatalogosService, PrismaService],
})
export class CatalogosModule {}
