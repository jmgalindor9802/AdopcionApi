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
  async login(usuario: string, correo: string): Promise<any> {
    const estudiante = await this.estudianteRepository
      .createQueryBuilder('e')
      .leftJoinAndSelect('e.pais', 'p') 
      .select([
        'e.pk_estudiante as pk_estudiante',
        'e.doc_identidad as doc_identidad',
        'e.nombre as nombre',
        'e.apellido as apellido',
        'e.correo as correo',
        'e.usuario as usuario',
        'e.num_contacto as num_contacto',
        'e.tipo_doc as tipo_doc',
        'p.nombre as pais'
      ])
      .where('e.usuario = :usuario', { usuario })
      .orWhere('e.correo = :correo', { correo })
      .getRawOne();
  
    return estudiante || [];
  }
  
  
  //Obtener datos del estudiante por usuario
  async obtenerPorUsuario(usuario: string): Promise<any> {
    const estudiante = await this.estudianteRepository
      .createQueryBuilder('e')
      .leftJoin('e.pais', 'p')  
      .select([
        'e.pk_estudiante AS pk_estudiante',
        'e.doc_identidad AS doc_identidad',
        'e.nombre AS nombre',
        'e.apellido AS apellido',
        'e.correo AS correo',
        'e.usuario AS usuario',
        'e.num_contacto AS num_contacto',
        'e.tipo_doc AS tipo_doc',
        'p.nombre AS pais'  
      ])
      .where('e.usuario = :usuario', { usuario })
      .getRawOne();
  
    console.log('Estudiante encontrado:', estudiante);
    return estudiante;
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
