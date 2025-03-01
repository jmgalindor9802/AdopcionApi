import { Module } from '@nestjs/common';
import { CountryController } from './controllers/country/country.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SalonController } from './controllers/salon/salon.controller';
import { LocationController } from './controllers/location/location.controller';
import { SalonService } from './services/salon/salon.service';
import { LocationService } from './services/location/location.service';
import { CountryService } from './services/country/country.service';
import { Pais } from './entities/pais.entity';
import { Ubicacion } from './entities/ubicacion.entity';
import { Salon } from './entities/salon.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Pais,Ubicacion, Salon]),],
  controllers: [CountryController, SalonController, LocationController],
  providers: [SalonService, LocationService, CountryService],
})
export class PlacesModule {}
