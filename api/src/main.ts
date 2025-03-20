import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { ClassSerializerInterceptor, Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { HttpExceptionFilter } from 'filters/http-exception.filter';

async function bootstrap() {

  const Backend = new Logger("Puerto Backend")
  const entorno = new Logger("Entorno de desarrollo")
  dotenv.config();
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalFilters(new HttpExceptionFilter()); 
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('API Entrenamiento Esri Nosa')
    .addServer('https://entrenamientobeta.esri.co/api/')
    .setDescription(
      'Aplicación que provee los datos necesarios de la plataforma de entrenamiento',
    )
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);
  await app.listen(process.env.PORT);

  entorno.log(`Enviroment ${process.env.NODE_ENV}`);
  Backend.log(`Servidor corriendo en puerto ${process.env.PORT}`);
}
bootstrap();
