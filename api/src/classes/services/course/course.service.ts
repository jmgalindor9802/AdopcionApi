import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Curso } from 'classes/entities/curso.entity';
import { Repository } from 'typeorm';
import * as fs from 'fs';
import * as path from 'path';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CourseService {
  private readonly basePath: string; 
  private readonly materialHost: string; 
  constructor(
    @InjectRepository(Curso)
    private readonly cursoRepository: Repository<Curso>,
    private readonly configService: ConfigService, 
  ) {
    this.basePath = this.configService.get<string>('RUTA_MATERIAL');
    this.materialHost = this.configService.get<string>('HOST_MATERIAL');

    if (!this.basePath || !this.materialHost) {
      throw new Error('RUTA_MATERIAL o HOST_MATERIAL no están definidos en las variables de entorno');
    }
  }

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

  async obtenerMaterialCurso(sigla: string): Promise<any> {
    const cursoPath = path.join(this.basePath, sigla);
  
    if (!fs.existsSync(cursoPath)) {
      throw new NotFoundException(`No se encontraron materiales para el curso con sigla "${sigla}"`);
    }
  
    const archivos = fs.readdirSync(cursoPath);
    if (archivos.length === 0) {
      throw new NotFoundException(`El curso "${sigla}" no tiene archivos disponibles.`);
    }
  
    // Construir URLs con auth embebida
    const user = this.configService.get('HOST_USER');
    const pass = encodeURIComponent(this.configService.get('HOST_PASS')); // codificar el *
    const host = this.configService.get('HOST_MATERIAL'); // sin https://
  
    const baseUrlConAuth = `https://${user}:${pass}@${host}`;
  
    const files_url = archivos.map(nombre => `${baseUrlConAuth}/${sigla}/${nombre}`);
    console.log({
      sigla,
      cursoPath,
      existeDirectorio: fs.existsSync(cursoPath),
      archivos,
      baseUrlConAuth,
      files_url,
    });
    
    return [
      {
        files_names: archivos,
        files_url,
      },
    ];
  }  
  
}