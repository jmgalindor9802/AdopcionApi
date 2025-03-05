import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Pais } from './../../entities/pais.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CountryService {
  constructor(
    @InjectRepository(Pais)
    private readonly paisRepository: Repository<Pais>,
  ) {}

  /**
   * Obtiene todos los países registrados en la base de datos.
   * @returns Lista de países con `PK_PAIS` y `NOMBRE`.
   */
  async obtenerPaises(): Promise<{ pk_pais: number; nombre: string }[]> {
    return await this.paisRepository
      .createQueryBuilder('pais')
      .select(['pais.pk_pais AS pk_pais', 'pais.nombre AS nombre'])
      .orderBy('pais.nombre', 'ASC')
      .getRawMany();
  }
}
