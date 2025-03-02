import { Module } from '@nestjs/common';
import { CertificateController } from './controllers/certificate/certificate.controller';
import { CertificateService } from './services/certificate/certificate.service';
import { ClassesModule } from './../classes/classes.module';
import { Certificado } from './entities/certificado.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Grupo } from './../classes/entities/grupo.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Certificado,Grupo]), 
    ClassesModule, 
  ],
  controllers: [CertificateController],
  providers: [CertificateService],
})
export class CertificatesModule {}
