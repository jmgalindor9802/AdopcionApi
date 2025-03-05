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


  @Get()
  @ApiOperation({ summary: 'Obtener todas las preguntas habilitadas' })
  @ApiResponse({
    status: 200,
    description: 'Preguntas encontradas',
    schema: {
      type: 'array',
      example: [
        { "PK_PREGUNTA": 1, "TIPO": "Selección Múltiple", "PREGUNTA": "¿Usa equipo de protección personal?", "CATEGORIA": "Seguridad" },
        { "PK_PREGUNTA": 2, "TIPO": "Sí/No", "PREGUNTA": "¿Ha recibido capacitación en primeros auxilios?", "CATEGORIA": "Seguridad" },
        { "PK_PREGUNTA": 3, "TIPO": "Texto", "PREGUNTA": "¿Cómo describiría las condiciones de su lugar de trabajo?", "CATEGORIA": "Seguridad" }
      ],
    }
  })
  @ApiResponse({
    status: 404,
    description: 'No se encontraron preguntas habilitadas',
    schema: {
      example: { mensaje: 'No hay preguntas habilitadas en la base de datos' },
    },
  })
  async obtenerTodasLasPreguntas() {
    const preguntas = await this.questionService.obtenerTodasLasPreguntas();

    if (!preguntas || preguntas.length === 0) {
      throw new NotFoundException('No hay preguntas habilitadas en la base de datos');
    }

    return preguntas;
  }
}