import { NestFactory } from "@nestjs/core";
import { ProdModule } from "./modules/prod.module";
import MongooseConnection from "./infrastructure/connection/db-connection";
import * as dotenv from "dotenv";

dotenv.config();
const DBCONNECTIONSTRING = process.env.DB_CONNECTION_STRING;
const PORT = process.env.PORT;

async function bootstrap() {
  const app = await NestFactory.create(ProdModule);
  const dbConnection = new MongooseConnection(DBCONNECTIONSTRING);
  app.enableCors();
  dbConnection.connect();
  await app.listen(PORT);
}

bootstrap();
