import { IsIn, IsInt, IsOptional, IsString, Min } from 'class-validator';

export class GetPedidosDto {
  @IsOptional()
  @IsString()
  q?: string;

  // Formato esperado: YYYY-MM-DD
  @IsOptional()
  @IsString()
  fecha?: string;

  // Filtro de estado
  @IsOptional()
  @IsString()
  @IsIn(['pendiente', 'completado', 'todos'])
  estado?: 'pendiente' | 'completado' | 'todos';

  @IsOptional()
  @IsInt()
  @Min(1)
  page?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  pageSize?: number;
}
