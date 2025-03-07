import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Curso } from 'classes/entities/curso.entity';
import { Repository } from 'typeorm';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class CourseService {
  private readonly basePath: string; 
  private readonly materialHost: string; 
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

     /**
   * 📁 Obtiene los archivos disponibles para un curso basado en su sigla.
   * @param sigla - Código del curso
   * @returns Lista de nombres y URLs de descarga de los archivos
   */
  async obtenerMaterialCurso(sigla: string): Promise<any> {
    const cursoPath = path.join(this.basePath, sigla); 

    // Verificar si la carpeta existe
    if (!fs.existsSync(cursoPath)) {
      throw new NotFoundException(`No se encontraron materiales para el curso con sigla "${sigla}"`);
    }

    // Obtener los archivos dentro del directorio
    const archivos = fs.readdirSync(cursoPath);
    if (archivos.length === 0) {
      throw new NotFoundException(`El curso "${sigla}" no tiene archivos de material disponibles.`);
    }

    // Construir URLs de descarga
    const archivosConUrls = archivos.map((archivo) => ({
      nombre: archivo,
      url: `${this.materialHost}/${sigla}/${archivo}`, 
    }));

    return {
      curso: sigla,
      archivos: archivosConUrls,
    };
  }
}