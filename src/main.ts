import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';

//Modules
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  //configs
  const apiPrefix = 'api';
  const apiVersion = 'v1';
  app.setGlobalPrefix(`${apiPrefix}/${apiVersion}`);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  //Port
  const configService: ConfigService = app.get<ConfigService>(ConfigService);
  const port = configService.get('PORT') || 3000;

  // Swagger Api Documentaion
  const options = new DocumentBuilder()
    .setTitle('Birdhouse API')
    .setDescription('API for managing birdhouses')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup(`${apiPrefix}/${apiVersion}/apidocs`, app, document);

  await app.listen(port);
}
bootstrap();
