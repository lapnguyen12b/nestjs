import { Controller, Get } from '@nestjs/common';
import { Admin } from 'src/entity/admin';
import { AdminService } from '../services';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get()
  getAdmins(): Promise<Admin[]> {
    return this.adminService.getAdmins()
  }

}