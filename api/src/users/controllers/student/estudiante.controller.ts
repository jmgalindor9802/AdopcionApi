import { Controller, Get, Post, Put, Param, Body } from '@nestjs/common';
import { EstudianteService } from '../../services/estudiante/estudiante.service';
import { Estudiante } from '../../entities/estudiante.entity';

@Controller('estudiante')
export class EstudianteController {
  constructor(private readonly estudianteService: EstudianteService) {}

  //Iniciar sesión por usuario o correo
  @Post('login')
  async login(@Body() payload: { usuario: string; correo: string }) {
    return this.estudianteService.login(payload.usuario, payload.correo);
  }

  //Obtener información del estudiante por usuario
  @Get(':usuario')
  async obtenerPorUsuario(@Param('usuario') usuario: string) {
    return this.estudianteService.obtenerPorUsuario(usuario);
  }

  // Obtener clases de un estudiante
  @Get('clases/:id')
  async obtenerClases(@Param('id') id: number) {
    return this.estudianteService.obtenerClases(id);
  }

  //Registrar nuevo estudiante
  @Post('nuevo')
  async registrarEstudiante(@Body() datos: Partial<Estudiante>) {
    return this.estudianteService.registrarEstudiante(datos);
  }

  //Actualizar estudiante
  @Put(':id')
  async actualizarEstudiante(@Param('id') id: number, @Body() datos: Partial<Estudiante>) {
    return this.estudianteService.actualizarEstudiante(id, datos);
  }
}
