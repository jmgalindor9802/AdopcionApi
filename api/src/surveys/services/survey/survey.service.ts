import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Clase } from 'classes/entities/clase.entity';
import { Grupo } from 'classes/entities/grupo.entity';
import { Encuesta } from 'surveys/entities/encuesta.entity';
import { Pregunta } from 'surveys/entities/pregunta.entity';
import { DataSource, EntityManager, Repository } from 'typeorm';
import { Estudiante } from 'users/entities/estudiante.entity';

@Injectable()
export class SurveyService {
  constructor(
    @InjectRepository(Encuesta)
    private readonly encuestaRepository: Repository<Encuesta>,
    @InjectRepository(Clase)  
    private readonly claseRepository: Repository<Clase>,
    @InjectRepository(Grupo)  
    private readonly grupoRepository: Repository<Grupo>,
    @InjectRepository(Pregunta)  
    private readonly preguntaRepository: Repository<Pregunta>,
    private readonly dataSource: DataSource
  ) {}

  async verificarEstadoEncuesta(id: string, pk_grupo: number): Promise<boolean> {
    const resultado = await this.claseRepository
      .createQueryBuilder('cl')
      .select(['cl.FECHA AS FECHA', 'cl.ESTADO_ENCUESTA AS ESTADO_ENCUESTA'])
      .where('cl.PFK_ESTUDIANTE IN (SELECT PK_ESTUDIANTE FROM ESTUDIANTE WHERE DOC_IDENTIDAD = :id)', { id })
      .andWhere('cl.PFK_GRUPO = :pk_grupo', { pk_grupo })
      .getRawOne();

    console.log('Resultado SQL:', resultado); 

    if (!resultado) {
      return false; 
    }

    if (resultado.ESTADO_ENCUESTA === 'Deshabilitado' || resultado.FECHA !== null) {
      return false;
    }

    return true;
  }

 /**
   * Guarda las respuestas de la encuesta y actualiza la fecha en CLASE.
   * @param data Arreglo con las respuestas de la encuesta.
   * @returns `true` si la encuesta se guardó correctamente.
   */
 async guardarRespuestasEncuesta(data: any[]): Promise<boolean> {
    if (!data || data.length === 0) {
      throw new BadRequestException('No llegaron datos en la solicitud');
    }

    // Iniciar una transacción
    return await this.encuestaRepository.manager.transaction(async (entityManager: EntityManager) => {
      for (const respuesta of data) {
        const { fecha, fk_pregunta, fk_grupo, fk_estudiante } = respuesta;

        //Verificar si la pregunta existe
        const preguntaExiste = await entityManager.findOne(Pregunta, {
          where: { pk_pregunta: fk_pregunta },
        });
        if (!preguntaExiste) {
          throw new BadRequestException(`La pregunta con ID ${fk_pregunta} no existe`);
        }

        //Verificar si el grupo existe
        const grupoExiste = await entityManager.findOne(Grupo, {
          where: { pk_grupo: fk_grupo },
        });
        if (!grupoExiste) {
          throw new NotFoundException(`El grupo con ID ${fk_grupo} no existe`);
        }

        //Verificar si el estudiante existe
        const estudianteExiste = await entityManager.findOne(Estudiante, {
          where: { pk_estudiante: fk_estudiante },
        });
        if (!estudianteExiste) {
          throw new BadRequestException(`El estudiante con ID ${fk_estudiante} no existe`);
        }

        //Verificar si el estudiante pertenece al grupo
        const estudianteEnGrupo = await entityManager.findOne(Clase, {
          where: { pfk_grupo: fk_grupo, pfk_estudiante: fk_estudiante },
        });
        if (!estudianteEnGrupo) {
          throw new BadRequestException(
            `El estudiante con ID ${fk_estudiante} no está registrado en el grupo ${fk_grupo}`
          );
        }

        //Crear un nuevo objeto Encuesta y asignar los valores correctos
        const nuevaEncuesta = this.encuestaRepository.create({
          respuesta: respuesta.respuesta,
          fecha: new Date(fecha),
          pregunta: preguntaExiste,
          grupo: grupoExiste,
          estudiante: estudianteExiste, //  se asegura que es un objeto válido
        });

        // Guardar usando save() que maneja relaciones correctamente
        await entityManager.save(nuevaEncuesta);
      }

      return true; 
    });
  }


}
