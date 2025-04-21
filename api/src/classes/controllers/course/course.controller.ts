import { BadRequestException, Controller, Get, NotFoundException, Param, Res } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CourseService } from 'classes/services/course/course.service';
import { Response } from 'express';

@ApiTags('Cursos')
@Controller('estudiante')
export class CourseController {
  constructor(
    private readonly courseService: CourseService,
    private readonly configService: ConfigService ) {}

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

  @Get('material/:sigla')
  @ApiOperation({ summary: 'Obtener URLs de descarga del material de un curso por sigla' })
  @ApiParam({ name: 'sigla', type: 'string', example: 'ARC1', description: 'Código del curso' })
  @ApiResponse({
    status: 200,
    description: 'Lista de archivos disponibles para el curso',
    schema: {
      example: [
        {
          files_names: ["guia1.pdf", "guia2.pdf"],
          files_url: [
            "https://entrenamiento:Esrico123%2A@entrenamiento.esri.co/MaterialEntrenamiento/ARC1/guia1.pdf",
            "https://entrenamiento:Esrico123%2A@entrenamiento.esri.co/MaterialEntrenamiento/ARC1/guia2.pdf"
          ]
        }
      ]
    }
  })
  @ApiResponse({
    status: 404,
    description: 'No se encontraron archivos de material para la sigla',
    schema: {
      example: {
        message: 'No se encontraron materiales para el curso con sigla "ARC1"'
      }
    }
  })
  async obtenerMaterialCurso(@Param('sigla') sigla: string) {
    if (!sigla || sigla.trim().length === 0) {
      throw new BadRequestException('La sigla del curso no puede estar vacía.');
    }

    return await this.courseService.obtenerMaterialCurso(sigla.trim());
  }


   
}