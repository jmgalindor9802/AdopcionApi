import { BadRequestException, Controller, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { SurveyService } from 'surveys/services/survey/survey.service';
@ApiTags('Encuestas')
@Controller('estudiante/encuesta')
export class SurveyController {
  constructor(private readonly surveyService: SurveyService) {}

/**
 * Verifica el estado de la encuesta de un estudiante en un grupo.
 * 
 *  **Casos en los que devuelve `true`**:
 * - La encuesta **está habilitada** y el estudiante aún **no la ha respondido**.
 * 
 *  **Casos en los que devuelve `false`**:
 * 1️ **Encuesta deshabilitada**: `ESTADO_ENCUESTA = "Deshabilitado"`.
 * 2️ **Encuesta ya respondida**: `FECHA` tiene un valor distinto de `null`.
 */
@Get('estado/:id/:pk_grupo')
@ApiOperation({ summary: 'Verificar el estado de la encuesta' })
@ApiParam({ name: 'id', type: 'string', example: '126784449', description: 'Documento de identidad del estudiante' })
@ApiParam({ name: 'pk_grupo', type: 'number', example: 1, description: 'Identificador del grupo' })
@ApiResponse({
  status: 200,
  description: 'La encuesta está habilitada y aún no ha sido respondida.',
  schema: {
    example: true,
  }
})
@ApiResponse({
  status: 200,
  description: 'La encuesta no está disponible para el estudiante. Razones posibles:\n'
    + '1️ **Encuesta deshabilitada:** `ESTADO_ENCUESTA = "Deshabilitado"`.\n'
    + '2️ **Encuesta ya respondida:** `FECHA` tiene un valor distinto de `null`.',
  schema: {
    example: false,
  }
})
@ApiResponse({
  status: 400,
  description: 'El parámetro pk_grupo no es un número válido.',
  schema: {
    example: { message: 'El parámetro pk_grupo (abc) no es un número válido.' }
  }
})
async verificarEstadoEncuesta(@Param('id') id: string, @Param('pk_grupo') pk_grupo: string) {
  const pkGrupoLimpio = parseInt(pk_grupo.trim(), 10);

  if (isNaN(pkGrupoLimpio)) {
    throw new BadRequestException(`El parámetro pk_grupo (${pk_grupo}) no es un número válido.`);
  }

  return await this.surveyService.verificarEstadoEncuesta(id, pkGrupoLimpio);
}


}