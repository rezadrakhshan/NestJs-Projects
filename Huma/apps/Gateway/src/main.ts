import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import { ExpressAdapter } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AdminModule } from './rest/admin/admin.module';
import { DriverModule } from './rest/driver/driver.module';
import { PassengerModule } from './rest/passenger/passenger.module';
import * as cookieParser from 'cookie-parser';


async function bootstrap() {
  const server = express();
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));

  app.use(cookieParser())

  const swaggerOptions = new DocumentBuilder()
    .setTitle('Huma')
    .setDescription('This is a online transporter apllication')
    .setVersion('1.0.0')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerOptions);
  const adminDocument = SwaggerModule.createDocument(app, swaggerOptions, {
    include: [AdminModule],
  });
  const driverDocument = SwaggerModule.createDocument(app, swaggerOptions, {
    include: [DriverModule],
  });
  const passengerDocument = SwaggerModule.createDocument(app, swaggerOptions, {
    include: [PassengerModule],
  });
  const configService = app.get(ConfigService);
  const appVersion = configService.get<string>('App.version');
  const port = configService.get<number>('App.port');

  SwaggerModule.setup(`${appVersion}/docs`, app, document);
  SwaggerModule.setup(`${appVersion}/docs/admin`, app, adminDocument);
  SwaggerModule.setup(`${appVersion}/docs/driver`, app, driverDocument);
  SwaggerModule.setup(`${appVersion}/docs/passenger`, app, passengerDocument);

  await app.init();
  server.listen(port, () => console.log(`Server running on port ${port}`));
}
bootstrap();
