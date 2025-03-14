import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuration Swagger
  const config = new DocumentBuilder()
    .setTitle('Mon API NestJS')
    .setDescription('Documentation de l’API avec Swagger')
    .setVersion('1.0')
    .addBearerAuth() // Si tu as une authentification JWT
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // L’UI sera accessible via "/api"

  await app.listen(3000);
}
bootstrap();