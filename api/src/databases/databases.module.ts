import { Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Certificado } from './../certificates/entities/certificado.entity';
import { Clase } from './../classes/entities/clase.entity';
import { Curso } from './../classes/entities/curso.entity';
import { Grupo } from './../classes/entities/grupo.entity';
import { Horario } from './../classes/entities/horario.entity';
import { TipoGrupo } from './../classes/entities/tipoGrupo.entity';
import { Empresa } from './../companies/entities/empresa.entity';
import { Sector } from './../companies/entities/sector.entity';
import config from './../config';
import { Pais } from './../places/entities/pais.entity';
import { Salon } from './../places/entities/salon.entity';
import { Ubicacion } from './../places/entities/ubicacion.entity';
import { Encuesta } from './../surveys/entities/encuesta.entity';
import { Administrador } from './../users/entities/administrador.entity';
import { EsriAcademy } from './../users/entities/esri.entity';
import { Estudiante } from './../users/entities/estudiante.entity';
import { Instructor } from './../users/entities/instructor.entity';
import { Pregunta } from './../surveys/entities/pregunta.entity'; 
//import { View_Clases_Estudiantes } from 'src/users/views/clases_estudiantes.view';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
          inject: [config.KEY],
          useFactory: (configService: ConfigType<typeof config>) => {
            const { server, database, user, password, encrypt, port } =
              configService.sqlserver;
    
            return {
              type: 'mssql',
              host: server,
              database,
              username: user,
              password,
              port,
              dropSchema: false,
              synchronize: true,
              autoLoadEntities: true,
              entities: [
                Pais, Ubicacion, Sector,
                Empresa, Salon,
                Grupo, TipoGrupo, Curso, Instructor, Administrador, EsriAcademy,
                Estudiante, 
                Clase, Horario,
                Certificado, Encuesta,Pregunta
              ],      
              extra: {
                trustServerCertificate: true,
              },
            };
          },
        }),
      ],
      providers: [],
      exports: [TypeOrmModule],
})
export class DatabasesModule {}
