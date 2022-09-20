import { Body, Controller, Post } from '@nestjs/common';
import { Admin } from 'src/entity/admin';
import { AdminLoginDto, AdminSignupDto } from '../dto';
import { AdminService } from '../services';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('signup')
  async signUp(@Body() dto: AdminSignupDto): Promise<Admin> {
    return this.adminService.signUpAdmin(dto)
  }

  @Post('login')
  login(@Body() loginDto: AdminLoginDto): string {
    return this.adminService.login(loginDto)
  }

}