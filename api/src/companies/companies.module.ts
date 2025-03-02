import { Module } from '@nestjs/common';
import { CompanyController } from './controllers/company/company.controller';
import { SectorController } from './controllers/sector/sector.controller';
import { CompanyService } from './services/company/company.service';
import { SectorService } from './services/sector/sector.service';
import { Empresa } from './entities/empresa.entity';
import { PlacesModule } from './../places/places.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sector } from './entities/sector.entity';
import { ClassesModule } from './../classes/classes.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Empresa, Sector]), 
    PlacesModule, 
    ClassesModule
  ],
  controllers: [CompanyController, SectorController],
  providers: [CompanyService, SectorService]
})
export class CompaniesModule {}
