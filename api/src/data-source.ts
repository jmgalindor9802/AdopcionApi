import 'reflect-metadata';
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { join } from 'path';
import { environments } from './environments';
import { Certificado } from './certificates/entities/certificado.entity';
import { Pais } from './places/entities/pais.entity';
import { Clase } from './classes/entities/clase.entity';
import { Curso } from './classes/entities/curso.entity';
import { Grupo } from './classes/entities/grupo.entity';
import { Horario } from './classes/entities/horario.entity';
import { TipoGrupo } from './classes/entities/tipoGrupo.entity';
import { Empresa } from './companies/entities/empresa.entity';
import { Sector } from './companies/entities/sector.entity';
import { Salon } from './places/entities/salon.entity';
import { Ubicacion } from './places/entities/ubicacion.entity';
import { Administrador } from './users/entities/administrador.entity';
import { EsriAcademy } from './users/entities/esri.entity';
import { Estudiante } from './users/entities/estudiante.entity';
import { Instructor } from './users/entities/instructor.entity';
import { Encuesta } from './surveys/entities/encuesta.entity';
import { Pregunta } from './surveys/entities/pregunta.entity';

// Asegurar que NODE_ENV tenga un valor por defecto
const currentEnv = process.env.NODE_ENV || 'development';
const envFile = environments[currentEnv] || '.env.development';

// Cargar variables de entorno según NODE_ENV
dotenv.config({ path: envFile });

console.log(`Using environment: ${currentEnv} (${envFile})`);
console.log(process.env);

const source = new DataSource({
  type: 'mssql',
  host: process.env.SQL_SERVER || 'localhost',
  database: process.env.SQL_DATABASE || 'entrenamiento',
  username: process.env.SQL_USER || 'sa',
  password: process.env.SQL_PASSWORD || 'Mauro123',
  port: parseInt(process.env.SQL_PORT, 10) || 1433,
  extra: {
    trustServerCertificate: true,
    encrypt: process.env.SQL_ENCRYPT === 'true', 
  },
  dropSchema: false,
  synchronize: false,
  logging: true,
  entities: [
    Pais, Ubicacion, Sector,
    Empresa, Salon,
    Grupo, TipoGrupo, Curso, Instructor, Administrador, EsriAcademy,
    Estudiante, 
    Clase, Horario,
    Certificado, Encuesta,Pregunta
  ],
  migrations: ['./src/migrations/*.ts'],
});

export default source;
