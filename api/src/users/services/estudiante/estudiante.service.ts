import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { Estudiante } from '../../entities/estudiante.entity';
import { Clase } from 'classes/entities/clase.entity';

@Injectable()
export class EstudianteService {
  constructor(
    @InjectRepository(Estudiante)
    private readonly estudianteRepository: Repository<Estudiante>,

    @InjectRepository(Clase)
    private readonly claseRepository: Repository<Clase>,
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
  

  async obtenerClases(docIdentidad: string) {
    const clases = await this.claseRepository
      .createQueryBuilder('c')
      .from('VIEW_CLASES_ESTUDIANTES', 'v')
      .where('v.ESTUDIANTE_DOC_IDENTIDAD = :docIdentidad', { docIdentidad })
      .select([
        'v.GRUPO_ID as grupo_id',
        'v.GRUPO_FECHA_INICIO as grupo_fecha_inicio',
        'v.GRUPO_FECHA_FIN as grupo_fecha_fin',
        'v.CLASE_ESTADO_ENCUESTA as clase_estado_encuesta',
        'v.CLASE_ESTADO_CERTIFICADO as clase_estado_certificado',
        'v.CLASE_ESTADO_MATERIAL as clase_estado_material',
        'v.CLASE_FECHA as clase_fecha',
        'v.CURSO_NOMBRE as curso_nombre',
        'v.CURSO_ESTADO_MATERIAL as curso_estado_material',
        'v.CURSO_INTENSIDAD as curso_intensidad',
        'v.CURSO_ID as curso_id',
        'v.CURSO_SIGLA as curso_sigla',
        'v.CURSO_CATEGORIA as curso_categoria',
        'v.EMPRESA_NOMBRE as empresa_nombre',
        'v.SALON_NOMBRE as salon_nombre',
        'v.UBICACION_NOMBRE as ubicacion_nombre',
        'v.SALON_DIRECCION as salon_direccion',
        'v.GRUPO_TIPO as grupo_tipo',
        'v.INSTRUCTOR_NOMBRE as instructor_nombre',
        'v.INSTRUCTOR_APELLIDO as instructor_apellido',
      ])
      .getRawMany();
  
    if (!clases.length) {
      return { mensaje: 'No hay clases registradas para este estudiante' };
    }
  
    return clases.map((clase) => ({
      grupo_id: clase.grupo_id,
      grupo_fecha_inicio: clase.grupo_fecha_inicio,
      grupo_fecha_fin: clase.grupo_fecha_fin,
      clase_estado_encuesta: clase.clase_estado_encuesta === 'Habilitado',
      clase_estado_certificado: clase.clase_estado_certificado === 'Habilitado',
      clase_estado_material: clase.clase_estado_material === 'Habilitado',
      clase_fecha: clase.clase_fecha,
      curso_nombre: clase.curso_nombre,
      curso_estado_material: clase.curso_estado_material,
      curso_intensidad: clase.curso_intensidad,
      curso_id: clase.curso_id,
      curso_sigla: clase.curso_sigla,
      curso_categoria: clase.curso_categoria,
      empresa_nombre: clase.empresa_nombre,
      salon_nombre: clase.salon_nombre,
      ubicacion_nombre: clase.ubicacion_nombre,
      salon_direccion: clase.salon_direccion,
      grupo_tipo: clase.grupo_tipo === 1 ? 'Presencial' : 'Virtual',
      instructor_nombre: clase.instructor_nombre,
      instructor_apellido: clase.instructor_apellido,
    }));
  }
  

  //Registrar nuevo estudiante
  async registrarEstudiante(datos: Partial<Estudiante>): Promise<any> {
    return await this.estudianteRepository.manager.transaction(async (entityManager: EntityManager) => {
      // 🔍 Verificar si el estudiante ya existe por documento de identidad
      const estudianteExistente = await entityManager.findOne(Estudiante, {
        where: { doc_identidad: datos.doc_identidad },
      });

      if (estudianteExistente) {
        return {
          message: `Documento ya se encuentra registrado`,
          data: {
            PK_ESTUDIANTE: estudianteExistente.pk_estudiante,
            CORREO: estudianteExistente.correo,
            USUARIO: estudianteExistente.usuario,
          },
        };
      }

      //Crear y guardar nuevo estudiante
      const nuevoEstudiante = entityManager.create(Estudiante, datos);
      await entityManager.save(nuevoEstudiante);

      return nuevoEstudiante;
    });
  }
  

  //Actualizar datos de un estudiante
  async actualizarEstudiante(doc_identidad: string, datos: Partial<Estudiante>): Promise<any> {
    // 🔍 Buscar estudiante por doc_identidad en lugar de pk_estudiante
    const estudianteExistente = await this.estudianteRepository.findOne({ where: { doc_identidad } });
  
    if (!estudianteExistente) {
      return { message: `El estudiante con documento ${doc_identidad} no existe.` };
    }
  
    // 📝 Actualizar los datos del estudiante
    await this.estudianteRepository.update({ doc_identidad }, datos);
  
    return {
      message: 'Estudiante actualizado correctamente',
      data: await this.estudianteRepository.findOne({ where: { doc_identidad } })
    };
  }
  
}
