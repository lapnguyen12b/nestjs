import { Controller, Get } from '@nestjs/common'
import { CatsService } from '../services/cats.service'

@Controller('cats')
export class CatsController {
  constructor(private readonly catService: CatsService) {}
  
  @Get()
  getCat(): string {
    return this.catService.getCats()
  }
}
