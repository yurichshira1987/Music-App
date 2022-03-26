import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const PORT = process.env.PORT || 1000
  const app = await NestFactory.create(AppModule);
  app.enableCors()
  await app.listen(1000, ()=> console.log(`SERVER STARTED ON PORT ${PORT}`));
}
bootstrap();
