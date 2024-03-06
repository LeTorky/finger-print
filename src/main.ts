import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import MongooseConnection from './infrastructure/connection/concretes/db-connection';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const dbConnection = new MongooseConnection(
    `mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.1.9`,
  );
  dbConnection.connect();
  await app.listen(3000);
}

bootstrap();
