import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder } from '@nestjs/swagger';
import { SwaggerModule } from '@nestjs/swagger';
import { apiReference } from '@scalar/nestjs-api-reference';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const config = new DocumentBuilder()
    .setTitle('InVozo')
    .setDescription('The InVozo API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);

  app.use(
    '/reference',
    apiReference({
      content: document,
    }),
  );
  const port = process.env.PORT ?? 3000;
  await app.listen(port);
  Logger.log(`Application listening on port ${port}`);
}
bootstrap();
