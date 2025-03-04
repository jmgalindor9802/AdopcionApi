import { Module } from '@nestjs/common';
import { GroupController } from './controllers/group/group.controller';
import { ClasseController } from './controllers/classe/classe.controller';
import { GroupTypeController } from './controllers/group_type/group_type.controller';
import { CourseController } from './controllers/course/course.controller';
import { ScheduleController } from './controllers/schedule/schedule.controller';
import { GroupService } from './services/group/group.service';
import { GroupTypeService } from './services/group_type/group_type.service';
import { ClasseService } from './services/classe/classe.service';
import { CourseService } from './services/course/course.service';
import { ScheduleService } from './services/schedule/schedule.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlacesModule } from './../places/places.module';
import { Clase } from './entities/clase.entity';
import { Grupo } from './entities/grupo.entity';
import { TipoGrupo } from './entities/tipoGrupo.entity';
import { Horario } from './entities/horario.entity';
import { Curso } from './entities/curso.entity';
import { SurveysModule } from './../surveys/surveys.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Clase,Curso,Grupo,TipoGrupo,Horario]), 
    PlacesModule,
    SurveysModule
  ],
  controllers: [GroupController, ClasseController, GroupTypeController, CourseController, ScheduleController],
  providers: [GroupService, GroupTypeService, ClasseService, CourseService, ScheduleService],
  exports: [TypeOrmModule.forFeature([Clase])], 
})
export class ClassesModule {}
