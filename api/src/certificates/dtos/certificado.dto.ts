import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, IsDateString } from 'class-validator';

export class RegistrarCertificadoDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: '126784449', description: 'Documento de identidad del estudiante' })
  readonly doc_estudiante: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ example: 37, description: 'Identificador del grupo en la tabla Certificado' })
  readonly fk_grupo: number;

  @IsDateString()
  @IsNotEmpty()
  @ApiProperty({ example: '2025-03-06', description: 'Fecha de expedición del certificado en formato YYYY-MM-DD' })
  readonly fecha: string;
}
