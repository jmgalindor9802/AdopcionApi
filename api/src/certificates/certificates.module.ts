import { Module } from '@nestjs/common';
import { CertificadoController } from './controllers/certificate/certificate.controller';
import { CertificadoService } from './services/certificate/certificate.service';
import { ClassesModule } from './../classes/classes.module';
import { Certificado } from './entities/certificado.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Grupo } from './../classes/entities/grupo.entity';
import { Pais } from './../places/entities/pais.entity';
import { Clase } from './../classes/entities/clase.entity';
import { Estudiante } from 'users/entities/estudiante.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Certificado,Grupo,Pais, Clase, Estudiante]), 
    ClassesModule, 
  ],
  controllers: [CertificadoController],
  providers: [CertificadoService],
})
export class CertificatesModule {}
