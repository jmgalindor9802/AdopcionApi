import { BadRequestException, Body, Controller, Get, NotFoundException, Param, Post } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiResponse, ApiBody } from '@nestjs/swagger';
import { CrearEncuestaDto } from 'surveys/dtos/encuesta.dto';
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
    description: 'La encuesta está habilitada y aún no ha sido respondida (devuelve `true`).\n'
      + 'Si la encuesta ya fue respondida o está deshabilitada, devuelve `false`.',
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

/**
   * Recibe las respuestas de la encuesta y actualiza la fecha en CLASE.
   */
@Post()
@ApiOperation({ 
  summary: 'Guardar respuestas de la encuesta',
  description: 'Recibe un arreglo de respuestas de encuesta y las almacena en la base de datos. \
  Se validan las relaciones con preguntas, estudiantes y grupos antes de guardar. \
  Si alguna validación falla, no se guardará ninguna respuesta.',
})
@ApiBody({
    type: [CrearEncuestaDto], // 🔹 Definir que se espera un array de objetos con esta estructura
    description: 'Array de respuestas de encuesta. Todas deben ser válidas o la operación fallará.',
    examples: {
      ejemplo1: {
        summary: 'Ejemplo de encuesta válida',
        value: [
          {
            respuesta: 'Muy bueno',
            fecha: '2025-03-06',
            fk_pregunta: 3,
            fk_grupo: 6,
            fk_estudiante: 3
          },
          {
            respuesta: 'Regular',
            fecha: '2025-03-06',
            fk_pregunta: 4,
            fk_grupo: 6,
            fk_estudiante: 3
          }
        ],
      },
    },
  })
@ApiResponse({ 
    status: 201, 
    description: 'Todas las respuestas se han guardado correctamente. La API devolverá `true` en caso de éxito.',
    schema: { example: true },
  })
@ApiResponse({
  status: 400,
  description: 'Error en los datos enviados. La solicitud fallará si:\n'
    + '- Alguna pregunta no existe en la base de datos.\n'
    + '- Algún estudiante no pertenece al grupo especificado.\n'
    + '- No se envió información válida.\n'
    + '\n❗ **Nota:** Ninguna respuesta se guardará si al menos una es inválida.',
  schema: {
    example: { message: 'La pregunta con ID 3 no existe' },
  },
})
@ApiResponse({
  status: 404,
  description: 'Grupo no encontrado en la base de datos.',
  schema: {
    example: { message: 'El grupo con ID 37 no existe' },
  },
})
@ApiResponse({
  status: 500,
  description: 'Error interno al procesar la encuesta. Puede ser un problema con la base de datos o con los datos enviados.',
  schema: {
    example: { message: 'Error al guardar la encuesta' },
  },
})
async guardarRespuestas(@Body() data: CrearEncuestaDto[]) {
  try {
    if (!data || data.length === 0) {
      throw new BadRequestException('No llegaron datos en la solicitud');
    }

    return await this.surveyService.guardarRespuestasEncuesta(data);
  } catch (error) {
    if (error instanceof NotFoundException || error instanceof BadRequestException) {
      throw error;
    }

    console.error('Error en guardarRespuestas:', error.message || error);
    throw new BadRequestException('Error al guardar la encuesta');
  }
}


}