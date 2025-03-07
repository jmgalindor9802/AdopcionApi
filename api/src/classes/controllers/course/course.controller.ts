import { BadRequestException, Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CourseService } from 'classes/services/course/course.service';

@ApiTags('Cursos')
@Controller('estudiante')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  /**
   *  Obtener los cursos de Esri Academy de un estudiante
   */
  @Get('esri_academy/:id')
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

  /**
   **Obtiene los archivos de material disponibles para un curso basado en su sigla.
   * @param sigla - Código del curso
   * @returns Lista de nombres y URLs de descarga de los archivos
   */
  @Get('material/:sigla')
  @ApiOperation({ summary: 'Obtener material del curso por sigla' })
  @ApiParam({ name: 'sigla', type: 'string', example: 'GIS101', description: 'Código del curso' })
  @ApiResponse({
    status: 200,
    description: 'Lista de archivos de material obtenidos exitosamente',
    schema: {
      type: 'object',
      properties: {
        curso: { type: 'string', example: 'GIS101' },
        archivos: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              nombre: { type: 'string', example: 'Introduccion_GIS.pdf' },
              url: { type: 'string', example: 'http://localhost:3000/material/GIS101/Introduccion_GIS.pdf' }
            }
          }
        }
      }
    }
  })
  @ApiResponse({
    status: 404,
    description: 'No se encontraron materiales para el curso',
    schema: {
      example: { message: 'No se encontraron materiales para el curso con sigla "GIS101"' }
    }
  })
  async obtenerMaterialCurso(@Param('sigla') sigla: string) {
    if (!sigla || sigla.trim().length === 0) {
      throw new BadRequestException('La sigla del curso no puede estar vacía.');
    }

    return await this.courseService.obtenerMaterialCurso(sigla.trim());
  }


}