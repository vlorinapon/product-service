import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Demo API')
    .setDescription('A Demo API with CRUD functionality')
    .setVersion('v1')
    .addSecurity('Authorisation', {
      type: 'apiKey',
      in: 'header',
      name: 'x-api-key',
    })
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
