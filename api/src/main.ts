import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  process.loadEnvFile();
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');

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

  console.log(`Enviroment ${process.env.NODE_ENV}`);
  console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
}
bootstrap();
