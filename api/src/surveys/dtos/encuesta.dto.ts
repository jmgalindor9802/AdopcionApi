import { ApiProperty } from '@nestjs/swagger';

export class CrearEncuestaDto {
  @ApiProperty({ example: 'Muy bueno', description: 'Respuesta del estudiante a la pregunta' })
  respuesta: string;

  @ApiProperty({ example: '2025-03-06', description: 'Fecha en la que se responde la encuesta', format: 'date' })
  fecha: string;

  @ApiProperty({ example: 1, description: 'ID de la pregunta asociada' })
  fk_pregunta: number;

  @ApiProperty({ example: 6, description: 'ID del grupo al que pertenece el estudiante' })
  fk_grupo: number;

  @ApiProperty({ example: 3, description: 'ID del estudiante que responde' })
  fk_estudiante: number;
}
