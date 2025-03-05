import { Module } from '@nestjs/common';
import { SurveyController } from './controllers/survey/survey.controller';
import { QuestionController } from './controllers/question/question.controller';
import { SurveyService } from './services/survey/survey.service';
import { QuestionService } from './services/question/question.service';
import { Encuesta } from './entities/encuesta.entity';
import { Pregunta } from './entities/pregunta.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Clase } from 'classes/entities/clase.entity';

@Module({
   imports: [TypeOrmModule.forFeature([Encuesta, Pregunta, Clase])],
  controllers: [SurveyController, QuestionController],
  providers: [SurveyService, QuestionService]
})
export class SurveysModule {}
