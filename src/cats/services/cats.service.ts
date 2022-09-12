import { Injectable } from '@nestjs/common'
import { Request } from 'express'
import { getLoggerFillter } from 'src/logger/filters'

@Injectable()
export class CatsService {
  getCats(): string {
    return 'this is Cat'
  }

  getFilterData(req: Request): string {
    const item = 'ALOHA'
    return getLoggerFillter(req, item)
  }
}
