import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as path from 'path';
import { env } from './env.config';

const rootDir = path.join(__dirname, '..', '..')
const configDB: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: '5432',
  username: 'postgres',
  password: '123456',
  database: 'nestjsDB',
  entities: [rootDir + '/dist/**/*.entity.js'],
  migrations: [rootDir + '/dist/migration/**/*.js'],
      cli: {
        migrationsDir: ['src/migration'],
      },
  synchronize: true,
} as any
export = configDB