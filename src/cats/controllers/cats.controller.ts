import { Controller, Get, Req } from '@nestjs/common'
import { Request } from 'express'
import { CatsService } from '../services'

@Controller('cats')
export class CatsController {
  constructor(private readonly catService: CatsService) {}
  
  @Get()
  getCat(): string {
    return this.catService.getCats()
  }
  
  @Get('filter')
  getFilterData(@Req() req: Request): string {
    return this.catService.getFilterData(req)
  }
}
