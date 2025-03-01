import { Module } from '@nestjs/common';
import { CertificateController } from './controllers/certificate/certificate.controller';
import { CertificateService } from './services/certificate/certificate.service';
import { ClassesModule } from 'src/classes/classes.module';
import { Certificado } from './entities/certificado.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([Certificado]), 
    ClassesModule, 
  ],
  controllers: [CertificateController],
  providers: [CertificateService],
})
export class CertificatesModule {}
