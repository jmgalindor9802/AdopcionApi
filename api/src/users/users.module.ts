import { Module } from '@nestjs/common';
import { EstudianteController } from './controllers/student/estudiante.controller';
import { InstructorController } from './controllers/instructor/instructor.controller';
import { AdministratorController } from './controllers/administrator/administrator.controller';
import { EstudianteService } from './services/estudiante/estudiante.service';
import { InstructorService } from './services/instructor/instructor.service';
import { AdministratorService } from './services/administrator/administrator.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Estudiante } from './entities/estudiante.entity';
import { PlacesModule } from './../places/places.module';
import { Instructor } from './entities/instructor.entity';
import { Administrador } from './entities/administrador.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Estudiante, Instructor, Administrador]),
    PlacesModule],
  controllers: [EstudianteController, InstructorController, AdministratorController],
  providers: [EstudianteService, InstructorService, AdministratorService]
})
export class UsersModule {}
