import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CourseService } from 'classes/services/course/course.service';

@ApiTags('Cursos')
@Controller('estudiante/esri_academy')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  /**
   *  Obtener los cursos de Esri Academy de un estudiante
   */
  @Get(':id')
  @ApiOperation({ summary: 'Obtener los cursos de Esri Academy de un estudiante' })
  @ApiParam({ name: 'id', type: 'string', example: '1020745698', description: 'Documento de identidad del estudiante' })
  @ApiResponse({
    status: 200,
    description: 'Cursos encontrados',
    schema: {
      type: 'array',
      example: [
        {
          "User_Full_Name": "Javier Andrés Nossa Calderón",
          "User_Primary_Email_Address": "andresnossac@gmail.com",
          "Country_Name": "Colombia",
          "Learning_Object_Type": "Web Course",
          "Start_Date": "2016-10-27T00:00:00.000Z",
          "Completion_Date": null,
          "Learning_Object_Title": "Esri Technical Certification: Sample Questions for ArcGIS Desktop Entry"
        }
      ],
    }
  })
  @ApiResponse({
    status: 404,
    description: 'No se encontraron cursos para este estudiante',
    schema: {
      example: { mensaje: 'No se encontraron cursos para el estudiante 1020745698' },
    },
  })
  async obtenerCursosEsriAcademy(@Param('id') id: string) {
    const cursos = await this.courseService.obtenerCursosEsriAcademy(id);

    if (!cursos || cursos.length === 0) {
      throw new NotFoundException(`No se encontraron cursos para el estudiante ${id}`);
    }

    return cursos;
  }
}