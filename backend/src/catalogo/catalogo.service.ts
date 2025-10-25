import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CatalogosService {
  constructor(private prisma: PrismaService) {}

  formasPago() {
    return this.prisma.formas_de_Pago.findMany({
      select: { IdFormasdepago: true, Nombre: true },
      orderBy: { Nombre: 'asc' },
    });
  }

  tiposVenta() {
    return this.prisma.tipo_de_Ventas.findMany({
      select: { idIdTipodeventa: true, Nombre: true },
      orderBy: { Nombre: 'asc' },
    });
  }
}
