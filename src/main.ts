import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from 'nestjs-pino';
import { INestApplication } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useLogger(app.get(Logger));

  setupSwagger(app);
  
  await app.listen(3000);
}
bootstrap();
function setupSwagger(app: INestApplication<any>) {
  throw new Error('Function not implemented.');
}

