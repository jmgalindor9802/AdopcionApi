import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Pregunta } from './../../entities/pregunta.entity';
import { Repository } from 'typeorm';

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(Pregunta)
    private readonly preguntaRepository: Repository<Pregunta>,
  ) {}

  async obtenerPreguntasPorCategoria(categoria: string): Promise<any[]> {
    const preguntas = await this.preguntaRepository
      .createQueryBuilder('p')
      .select(['p.pk_pregunta AS PK_PREGUNTA', 'p.tipo AS TIPO', 'p.pregunta AS PREGUNTA'])
      .where('p.categoria = :categoria', { categoria })
      .andWhere("p.estado = 'Habilitado'")
      .orderBy('p.orden', 'ASC')
      .getRawMany();

    return preguntas.length > 0 ? preguntas : [];
  }

  async obtenerTodasLasPreguntas(): Promise<any[]> {
    const preguntas = await this.preguntaRepository
      .createQueryBuilder('p')
      .select([
        'p.pk_pregunta AS PK_PREGUNTA',
        'p.tipo AS TIPO',
        'p.pregunta AS PREGUNTA',
        'p.categoria AS CATEGORIA',
      ])
      .where("p.estado = 'Habilitado'")
      .orderBy('p.orden', 'ASC')
      .getRawMany();

    return preguntas.length > 0 ? preguntas : [];
  }
}