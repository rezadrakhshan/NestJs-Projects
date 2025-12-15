import { registerAs } from '@nestjs/config';

const AppConfig = registerAs('App', () => ({
  port: 3000,
  version: 'v1',
}));

export const configurations = [AppConfig];
