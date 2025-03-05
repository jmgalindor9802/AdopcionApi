import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Clase } from 'classes/entities/clase.entity';
import { Encuesta } from 'surveys/entities/encuesta.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SurveyService {
  constructor(
    @InjectRepository(Clase)  // 🔥 Cambia Encuesta por Clase
    private readonly claseRepository: Repository<Clase>,
  ) {}

  async verificarEstadoEncuesta(id: string, pk_grupo: number): Promise<boolean> {
    const resultado = await this.claseRepository
      .createQueryBuilder('cl')
      .select(['cl.FECHA AS FECHA', 'cl.ESTADO_ENCUESTA AS ESTADO_ENCUESTA'])
      .where('cl.PFK_ESTUDIANTE IN (SELECT PK_ESTUDIANTE FROM ESTUDIANTE WHERE DOC_IDENTIDAD = :id)', { id })
      .andWhere('cl.PFK_GRUPO = :pk_grupo', { pk_grupo })
      .getRawOne();

    console.log('Resultado SQL:', resultado); // 🔥 Agrega este log para depuración

    if (!resultado) {
      return false; // Si no hay datos, la encuesta no está disponible
    }

    if (resultado.ESTADO_ENCUESTA === 'Deshabilitado' || resultado.FECHA !== null) {
      return false;
    }

    return true;
  }
}
