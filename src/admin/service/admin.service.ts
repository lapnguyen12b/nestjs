import { Injectable } from '@nestjs/common';
import { Admin } from 'src/entity/base/admin';
import { AdminRepository } from 'src/repository/admin.repository';

@Injectable()
export class AdminService {
  constructor(private adminRepository: AdminRepository) {}

  async getAdmins(): Promise<Admin[]> {
    return this.adminRepository.getAdmins()
  }
}
