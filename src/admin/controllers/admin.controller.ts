import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/core/guards';

@Controller('admin')
export class AdminController {
  constructor() {}


  @Get('test/jwt')
  @UseGuards(JwtAuthGuard)
  testJWT(): string {
    return 'test Authorized'
  }

}