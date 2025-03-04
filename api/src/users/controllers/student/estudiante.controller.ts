import { Controller, Get, Post, Put, Param, Body, NotFoundException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiNotFoundResponse, ApiParam, ApiOkResponse } from '@nestjs/swagger';
import { EstudianteService } from '../../services/estudiante/estudiante.service';
import { CreateEstudianteDto, UpdateEstudianteDto } from '../../dtos/estudiante.dto';

@ApiTags('Estudiantes') 
@Controller('estudiante')
export class EstudianteController {
  constructor(private readonly estudianteService: EstudianteService) {}

  //LOGIN
  @Post('login')
@ApiOperation({ summary: 'Iniciar sesión con usuario o correo' })
@ApiBody({
  schema: {
    type: 'object',
    properties: {
      usuario: { type: 'string', example: 'juanperez' },
      correo: { type: 'string', example: 'juan@example.com' }
    },
    required: ['usuario', 'correo']
  }
})
@ApiResponse({
  status: 200,
  description: 'Inicio de sesión exitoso',
  schema: {
    type: 'object',
    properties: {
      pk_estudiante: { type: 'number', example: 1 },
      doc_identidad: { type: 'string', example: '123456789' },
      nombre: { type: 'string', example: 'Juan' },
      apellido: { type: 'string', example: 'Pérez' },
      correo: { type: 'string', example: 'juanperez@example.com' },
      usuario: { type: 'string', example: 'juanperez' },
      num_contacto: { type: 'string', example: '1234567890' },
      tipo_doc: { type: 'string', example: 'CC' },
      pais: { type: 'string', example: 'Colombia' }
    }
  }
})
@ApiResponse({
  status: 404,
  description: 'Usuario no encontrado',
  schema: {
    type: 'object',
    properties: {
      mensaje: { type: 'string', example: 'Usuario no encontrado' }
    }
  }
})
async login(@Body() payload: { usuario: string; correo: string }) {
  const estudiante = await this.estudianteService.login(payload.usuario, payload.correo);

  if (!estudiante) {
    return { mensaje: 'Usuario no encontrado' };
  }

  return estudiante;
}


//OBTENER DATOS POR USUARIO
@Get(':usuario')
@ApiOperation({ summary: 'Obtener información de un estudiante por usuario' })
@ApiParam({
  name: 'usuario',
  type: 'string',
  description: 'Nombre de usuario del estudiante',
  example: 'juanperez'
})
@ApiResponse({
  status: 200,
  description: 'Información del estudiante encontrada',
  schema: {
    type: 'object',
    properties: {
      pk_estudiante: { type: 'number', example: 1 },
      doc_identidad: { type: 'string', example: '123456789' },
      nombre: { type: 'string', example: 'Juan' },
      apellido: { type: 'string', example: 'Pérez' },
      correo: { type: 'string', example: 'juanperez@example.com' },
      usuario: { type: 'string', example: 'juanperez' },
      num_contacto: { type: 'string', example: '1234567890' },
      tipo_doc: { type: 'string', example: 'CC' },
      pais: { type: 'string', example: 'Colombia' }
    }
  }
})
@ApiResponse({
  status: 404,
  description: 'Estudiante no encontrado',
  schema: {
    example: { mensaje: 'Estudiante no encontrado' }
  }
})
async obtenerPorUsuario(@Param('usuario') usuario: string) {
  const estudiante = await this.estudianteService.obtenerPorUsuario(usuario);
  
  if (!estudiante) {
    return { mensaje: 'Estudiante no encontrado' };
  }

  return estudiante;
}

  //OBTENER CLASES POR USUARIO
  @Get('clases/:docIdentidad')
  @ApiOperation({ summary: 'Obtener clases de un estudiante por documento de identidad' })
  @ApiParam({
    name: 'docIdentidad',
    type: 'string',
    description: 'Documento de identidad del estudiante',
    example: '126784449',
  })
  @ApiOkResponse({
    description: 'Lista de clases obtenida exitosamente',
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          grupo_id: { type: 'number', example: 101 },
          grupo_fecha_inicio: { type: 'string', format: 'date-time', example: '2025-03-01T05:00:00.000Z' },
          grupo_fecha_fin: { type: 'string', format: 'date-time', example: '2025-06-01T05:00:00.000Z' },
          clase_estado_encuesta: { type: 'boolean', example: true },
          clase_estado_material: { type: 'boolean', example: false },
          clase_estado_certificado: { type: 'boolean', example: true },
          clase_fecha: { type: 'string', format: 'date-time', example: '2025-03-03T05:00:00.000Z' },
          curso_nombre: { type: 'string', example: 'Introducción a la Programación' },
          curso_intensidad: { type: 'number', example: 40 },
          curso_sigla: { type: 'string', example: 'CS101' },
          curso_categoria: { type: 'string', example: 'Informática' },
          empresa_nombre: { type: 'string', example: 'Empresa A' },
          salon_nombre: { type: 'string', example: 'Aula Magna' },
          ubicacion_nombre: { type: 'string', example: 'Bogotá' },
          salon_direccion: { type: 'string', example: 'Cl. 90 # 13-40' },
          grupo_tipo: { type: 'string', example: 'Presencial' },
          instructor_nombre: { type: 'string', example: 'Juan Manuel' },
          instructor_apellido: { type: 'string', example: 'Angel Cuartas' },
        },
      },
    },
  })
  @ApiNotFoundResponse({
    description: 'Estudiante sin clases registradas',
    schema: {
      example: { mensaje: 'No hay clases registradas para este estudiante' },
    },
  })
  async obtenerClases(@Param('docIdentidad') docIdentidad: string) {
    const clases = await this.estudianteService.obtenerClases(docIdentidad);
  
    if (!Array.isArray(clases) || clases.length === 0) {
      throw new NotFoundException('No hay clases registradas para este estudiante');
    }
  
    return clases;
  }
  
  

  @Post('nuevo')
  @ApiOperation({ summary: 'Registrar un nuevo estudiante' })
  @ApiResponse({ status: 201, description: 'Estudiante registrado exitosamente' })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  async registrarEstudiante(@Body() datos: CreateEstudianteDto) {
    return this.estudianteService.registrarEstudiante(datos);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar información de un estudiante' })
  @ApiResponse({ status: 200, description: 'Estudiante actualizado exitosamente' })
  @ApiResponse({ status: 404, description: 'Estudiante no encontrado' })
  async actualizarEstudiante(@Param('id') id: number, @Body() datos: UpdateEstudianteDto) {
    return this.estudianteService.actualizarEstudiante(id, datos);
  }
}
