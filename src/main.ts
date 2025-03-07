import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from 'nestjs-pino';
import { setupSwagger } from './swagger';
import { AppDataSource } from 'typeorm.config';

const isProduction = process.env.NODE_ENV === 'production';

async function bootstrap() {

async function bootstrap() {
  console.log('🚀 Iniciando aplicação...');

  await AppDataSource.initialize()
    .then(() => {
      console.log('✅ Banco de dados conectado com sucesso!');
      console.log('📌 Entidades carregadas:', AppDataSource.entityMetadatas.map(e => e.name));
    })
    .catch((error) => console.error('❌ Erro ao conectar no banco:', error));

  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
  console.log('🔥 Servidor rodando em http://localhost:3000');
}
bootstrap();

  const app = await NestFactory.create(AppModule);

  const logger = app.get(Logger);
  app.useLogger(logger);

  setupSwagger(app);
  const port = process.env.PORT || 3000;
  
  await app.listen(3000, '0.0.0.0');
  console.log(`🚀 Server running on http://localhost:${port}`);
  
  console.log('isProduction', isProduction);
  console.log('process.env.DATABASE_URL', process.env.DATABASE_URL);
}
bootstrap();
