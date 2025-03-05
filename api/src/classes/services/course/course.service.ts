import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Curso } from 'classes/entities/curso.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(Curso)
    private readonly cursoRepository: Repository<Curso>,
  ) {}

  async obtenerCursosEsriAcademy(id: string): Promise<any[]> {
    const cursos = await this.cursoRepository.query(`
      SELECT 
        User_Full_Name,
        User_Primary_Email_Address,
        Country_Name,
        Learning_Object_Type,
        Start_Date,
        Completion_Date,
        Learning_Object_Title
      FROM VIEW_CURSOS_VIRTUALES
      WHERE estudiante_doc_identidad = @0
    `, [id]);

    return cursos.length > 0 ? cursos : [];
  }
}