import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Admin } from 'src/entity/admin';
import { AdminRepository } from 'src/repository/admin.repository';
import { Connection } from 'typeorm';

@Injectable()
export class AdminService {
  constructor(
    private connection: Connection,
    ) {}

  async updateRefreshToken(refreshToken: string, adminId: string): Promise<Admin> {
    const adminRepository = this.connection.getCustomRepository(AdminRepository)
    const admin = await adminRepository.findOne(adminId)
    if (!admin) {
      throw new UnauthorizedException('Admin not found')
    }
    admin.refreshToken = refreshToken
    return adminRepository.save(admin)
  }
}