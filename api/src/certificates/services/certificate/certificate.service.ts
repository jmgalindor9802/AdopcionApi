import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Certificado } from '../../entities/certificado.entity';

@Injectable()
export class CertificadoService {
  constructor(
    @InjectRepository(Certificado)
    private readonly certificadoRepository: Repository<Certificado>,
  ) {}

  async verificarCertificado(id: string, pk_grupo: number): Promise<any> {
    const certificado = await this.certificadoRepository
      .createQueryBuilder('c')
      .innerJoin('c.estudiante', 'e') 
      .innerJoin('c.grupo', 'g')  //  Certificado → Grupo
      .innerJoin('Clase', 'cl', 'cl.PFK_GRUPO = g.PK_GRUPO') //  Clase → Grupo
      .innerJoin('cl.pais_orden_venta', 'p') //  Clase → Pais_orden_venta
      .innerJoin('g.salon', 's') //  Grupo → Salon
      .innerJoin('s.ubicacion', 'u') //  Salon → Ubicacion
      .innerJoin('g.instructor', 'i') 
      .innerJoin('g.curso', 'cur')  
      .innerJoin('g.tipo_grupo', 'tg') //  Grupo → TipoGrupo
      .select([
        'e.tipo_doc AS estudiante_tipo_doc',
        'e.doc_identidad AS estudiante_doc_identidad',
        'e.nombre AS estudiante_nombre',
        'e.apellido AS estudiante_apellido',
        'cl.estado_certificado AS clase_estado_certificado', 
        'p.nombre AS clase_pais_orden_venta', 
        'cur.intensidad AS curso_intensidad',
        'cur.nombre AS curso_nombre',
        'u.nombre AS ubicacion_nombre', 
        'g.pk_grupo AS grupo_id',
        'tg.nombre AS grupo_tipo',
        'g.fecha_inicio AS grupo_fecha_inicio',
        'g.fecha_fin AS grupo_fecha_fin',
        'i.nombre AS instructor_nombre',
        'i.doc_identidad AS instructor_doc_identidad',
        'i.apellido AS instructor_apellido',
        'i.titulo AS instructor_titulo',
        'p.nombre AS ubicacion_pais', 
      ])
      .where('e.doc_identidad = :id', { id })
      .andWhere('g.pk_grupo = :pk_grupo', { pk_grupo })
      .getRawOne();
  
    if (!certificado) {
      return { mensaje: 'Certificado no encontrado' };
    }
  
    return certificado;
  }
    
    async verificarIdCertificado(id: string, pk_grupo: number): Promise<any> {
        const certificado = await this.certificadoRepository
          .createQueryBuilder('c')
          .select(['c.pk_certificado AS PK_CERTIFICADO', 'c.fecha AS FECHA'])
          .innerJoin('c.grupo', 'g')
          .innerJoin('c.estudiante', 'e')
          .where('e.doc_identidad = :id', { id })
          .andWhere('g.pk_grupo = :pk_grupo', { pk_grupo })
          .getRawOne();
    
        return certificado ? [certificado] : [];
    }


}

