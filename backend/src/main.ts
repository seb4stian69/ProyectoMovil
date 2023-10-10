import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {

  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
  .setTitle('Nombre de tu API')
  .setDescription('Descripción de tu API')
  .setVersion('1.0')
  .addTag('tus-etiquetas')
  .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // Aquí se configura Swagger

  await app.listen(3000);

}
bootstrap();
