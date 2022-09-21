import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { CatsModule } from './cats/cats.module'
import { LoggerModule } from './logger/logger.module'
import { LoggerMiddleware } from './logger/middleware'
import { AdminModule } from './admin/admin.module';
import { dataBaseConfig } from './config/database.config'
import { CoreModule } from './core/core.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    dataBaseConfig,
    CatsModule,
    LoggerModule,
    AdminModule,
    CoreModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(LoggerMiddleware).forRoutes({ path: '*', method: RequestMethod.ALL})
  }
}
