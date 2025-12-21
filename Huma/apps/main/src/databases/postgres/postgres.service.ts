import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PostgreService implements OnModuleInit {
  private readonly logger = new Logger(PostgreService.name);
  public connection: Sequelize;
  constructor(private readonly configService: ConfigService) {}

  async onModuleInit() {
    try {
      this.logger.log('Trying to connect to Postgresql');
      const dbConfig = this.configService.get('Database');

      this.connection = new Sequelize({
        dialect: dbConfig.dialect,
        host: dbConfig.host,
        port: dbConfig.port,
        username: dbConfig.username,
        password: dbConfig.password,
        database: dbConfig.database,
        logging: false,
      });

      await this.connection.authenticate();
      this.logger.log('Connected to PostgreSql successfuly');
    } catch (error) {
      this.logger.error('Failed to Connect to PostgreSql', error);
      process.exit(1);
    }
  }
}
