import { Controller, Get, Post, Put, Param, Body } from '@nestjs/common';
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
  @Get('clases/:id')
  @ApiOperation({ summary: 'Obtener clases de un estudiante' })
  @ApiParam({ name: 'id', type: 'number', description: 'ID del estudiante' })
  @ApiOkResponse({
    description: 'Lista de clases obtenida exitosamente',
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          pfk_grupo: { type: 'number', example: 101 },
          estado_encuesta: { type: 'boolean', example: true },
          estado_material: { type: 'boolean', example: false },
          estado_certificado: { type: 'boolean', example: true },
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
  async obtenerClases(@Param('id') id: number) {
    const clases = await this.estudianteService.obtenerClases(id);
  
    if (!clases.length) {
      return { mensaje: 'No hay clases registradas para este estudiante' };
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
