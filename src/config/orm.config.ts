import { ConnectionOptions } from 'typeorm';

const configDB: ConnectionOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '123456',
  database: 'nestjsDB',
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: false,
  migrationsRun: true,
  logging: true,
  logger: 'file',
  migrations: [__dirname + '/migrations/*.js'],
  cli: {
    migrationsDir: 'src/migrations',
  },
}
export = configDB