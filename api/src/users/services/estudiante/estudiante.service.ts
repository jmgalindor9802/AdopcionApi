import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Estudiante } from '../../entities/estudiante.entity';

@Injectable()
export class EstudianteService {
  constructor(
    @InjectRepository(Estudiante)
    private readonly estudianteRepository: Repository<Estudiante>,
  ) {}

  //Iniciar sesión por usuario o correo
  async login(usuario: string, correo: string): Promise<Estudiante | null> {
    let estudiante = await this.estudianteRepository.findOne({ where: { usuario } });

    if (!estudiante) {
      estudiante = await this.estudianteRepository.findOne({ where: { correo } });
    }

    return estudiante || null;
  }

  //Obtener datos del estudiante por usuario
  async obtenerPorUsuario(usuario: string): Promise<Estudiante | null> {
    return this.estudianteRepository.findOne({ where: { usuario } });
  }

  //Obtener clases de un estudiante
  async obtenerClases(id: number) {
    return this.estudianteRepository
      .createQueryBuilder('estudiante')
      .leftJoinAndSelect('estudiante.clases', 'clase')
      .where('estudiante.id = :id', { id })
      .getOne();
  }

  //Registrar nuevo estudiante
  async registrarEstudiante(datos: Partial<Estudiante>): Promise<Estudiante> {
    const nuevoEstudiante = this.estudianteRepository.create(datos);
    return this.estudianteRepository.save(nuevoEstudiante);
  }

  //Actualizar datos de un estudiante
  async actualizarEstudiante(pk_estudiante: number, datos: Partial<Estudiante>): Promise<Estudiante | null> {
    await this.estudianteRepository.update({ pk_estudiante }, datos); 
    return this.estudianteRepository.findOne({ where: { pk_estudiante } }); 
  }  
}
