import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { ConfigService } from '@nestjs/config';
import * as models from './models';

@Injectable()
export class PostgreService implements OnModuleInit {
  private readonly logger = new Logger(PostgreService.name);
  public connection: Sequelize;
  constructor(private readonly configService: ConfigService) {}

  async onModuleInit() {
    try {
      this.logger.log('Trying to connect to Postgresql');
      const dbConfig = this.configService.get('Database');

      const sequelizeInstance = new Sequelize({
        dialect: dbConfig.dialect,
        host: dbConfig.host,
        port: dbConfig.port,
        username: dbConfig.username,
        password: dbConfig.password,
        database: dbConfig.database,
        logging: false,
      });

      sequelizeInstance.addModels(Object.values(models));

      models.Driver.hasOne(models.DriverSession, {
        foreignKey: 'driverID',
        as: 'session',
      });
      models.DriverSession.belongsTo(models.Driver, {
        foreignKey: 'driverID',
        as: 'driver',
      });

      await sequelizeInstance.sync({ alter: true });
      this.connection = sequelizeInstance;
      this.logger.log('Connected to PostgreSql successfuly');
    } catch (error) {
      this.logger.error('Failed to Connect to PostgreSql', error);
      process.exit(1);
    }
  }
  public models = models;
}
