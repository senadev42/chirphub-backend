import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

//Modules
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //configs
  app.setGlobalPrefix('api/v1');

  const configService: ConfigService = app.get<ConfigService>(ConfigService);
  const port = configService.get('PORT') || 3000;
  
  await app.listen(port);
}
bootstrap(); 
