import 'reflect-metadata';
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { join } from 'path';
import { environments } from './environments';

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
  database: process.env.SQL_DATABASE || 'Entrenamiento_Nest',
  username: process.env.SQL_USER || 'sa',
  password: process.env.SQL_PASSWORD || 'password',
  port: parseInt(process.env.SQL_PORT, 10) || 1433,
  extra: {
    trustServerCertificate: true,
    encrypt: process.env.SQL_ENCRYPT === 'true', 
  },
  dropSchema: false,
  synchronize: true,
  entities: [join(__dirname, '**', '**', '*.entity.{ts,js}')],
  migrations: [join(__dirname, 'database', 'migrations', '*.ts')]
});

export default source;
