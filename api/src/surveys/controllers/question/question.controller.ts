import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { QuestionService } from 'surveys/services/question/question.service';

@ApiTags('Preguntas')
@Controller('estudiante/preguntas')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  /**
   * Obtener las preguntas de encuesta por categoría
   */
  @Get(':categoria')
  @ApiOperation({ summary: 'Obtener preguntas de encuesta por categoría' })
  @ApiParam({ name: 'categoria', type: 'string', example: 'Instructor', description: 'Categoría de la Pregunta' })
  @ApiResponse({
    status: 200,
    description: 'Preguntas encontradas',
    schema: {
      type: 'array',
      example: [
        { "PK_PREGUNTA": 1, "TIPO": "Selección Múltiple", "PREGUNTA": "¿El instructor usa equipo de protección personal?" },
        { "PK_PREGUNTA": 2, "TIPO": "Texto", "PREGUNTA": "Describa su experiencia de la clase con el instructor." }
      ],
    }
  })
  @ApiResponse({
    status: 404,
    description: 'No se encontraron preguntas para esta categoría',
    schema: {
      example: { mensaje: 'No se encontraron preguntas en la categoría Instructor' },
    },
  })
  async obtenerPreguntas(@Param('categoria') categoria: string) {
    const preguntas = await this.questionService.obtenerPreguntasPorCategoria(categoria);

    if (!preguntas || preguntas.length === 0) {
      throw new NotFoundException(`No se encontraron preguntas en la categoría ${categoria}`);
    }

    return preguntas;
  }
}