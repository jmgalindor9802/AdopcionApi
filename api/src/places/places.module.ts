import { Module } from '@nestjs/common';
import { CountryController } from './controllers/country/country.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SalonController } from './controllers/salon/salon.controller';
import { LocationController } from './controllers/location/location.controller';
import { SalonService } from './services/salon/salon.service';
import { LocationService } from './services/location/location.service';
import { CountryService } from './services/country/country.service';

@Module({
  controllers: [CountryController, SalonController, LocationController],
  providers: [SalonService, LocationService, CountryService],
})
export class PlacesModule {}
