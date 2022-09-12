import { Module } from '@nestjs/common'
import { CatsController } from './controllers'
import { CatsService } from './services'

@Module({
  controllers: [CatsController],
  providers: [CatsService]
})
export class CatsModule {}
