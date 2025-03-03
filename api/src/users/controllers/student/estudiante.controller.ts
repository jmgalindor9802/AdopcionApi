import { Controller, Get, Post, Put, Param, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { EstudianteService } from '../../services/estudiante/estudiante.service';
import { CreateEstudianteDto, UpdateEstudianteDto } from '../../dtos/estudiante.dto';

@ApiTags('Estudiantes') 
@Controller('estudiante')
export class EstudianteController {
  constructor(private readonly estudianteService: EstudianteService) {}

  @Post('login')
@ApiOperation({ summary: 'Iniciar sesión con usuario o correo' })
@ApiBody({
  schema: {
    type: 'object',
    properties: {
      usuario: { type: 'string', example: 'juanperez' },
      correo: { type: 'string', example: 'juan@example.com' }
    }
  }
})
@ApiResponse({ status: 200, description: 'Inicio de sesión exitoso' })
@ApiResponse({ status: 404, description: 'Usuario no encontrado' })
async login(@Body() payload: { usuario: string; correo: string }) {
  const estudiante = await this.estudianteService.login(payload.usuario, payload.correo);

  if (estudiante.length === 0) {
    return { mensaje: 'Usuario no encontrado' }; 
  }

  return estudiante;
}


  @Get(':usuario')
  @ApiOperation({ summary: 'Obtener información de un estudiante por usuario' })
  @ApiResponse({ status: 200, description: 'Información del estudiante encontrada' })
  @ApiResponse({ status: 404, description: 'Estudiante no encontrado' })
  async obtenerPorUsuario(@Param('usuario') usuario: string) {
    const estudiante = await this.estudianteService.obtenerPorUsuario(usuario);
    
    if (!estudiante) {
      return { mensaje: 'Estudiante no encontrado' };  
    }
  
    return estudiante;
  }
  
  
  @Get('clases/:id')
  @ApiOperation({ summary: 'Obtener clases de un estudiante' })
  @ApiResponse({ status: 200, description: 'Lista de clases obtenida exitosamente' })
  @ApiResponse({ status: 404, description: 'Estudiante sin clases registradas' })
  async obtenerClases(@Param('id') id: number) {
    return this.estudianteService.obtenerClases(id);
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
