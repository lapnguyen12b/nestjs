import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { env } from './config/env.config'
import { logger } from './logger/middleware'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  //using Global middleware
  app.use(logger)
  await app.listen(process.env.PORT || 3000, () => {
    console.log('Server is running ...');
    console.log(env.DOMAN_BE)
  });
}
bootstrap();
