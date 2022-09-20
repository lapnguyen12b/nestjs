import { BadRequestException, Injectable } from '@nestjs/common';
import { genSaltSync, hashSync } from 'bcryptjs'
import { Admin } from 'src/entity/admin';
import { STATUS } from 'src/enums/status.enum';
import { AdminRepository } from 'src/repository/admin.repository';
import { Connection } from 'typeorm';
import { env } from 'src/config/env.config';
import { JwtService } from '@nestjs/jwt';
import { SALTROUNDS } from 'src/constants/constant';
import { AdminLoginDto, AdminSignupDto } from '../dto';

@Injectable()
export class AdminService {
  constructor(
    private connection: Connection,
    private jwtService: JwtService,
    ) {}

  async signUpAdmin(dto: AdminSignupDto): Promise<Admin> {
    const { name, password } = dto
    const adminRepo = this.connection.getCustomRepository(AdminRepository)
    const existedAdmin = await adminRepo.getAdminByEmail(dto.email)
    if (existedAdmin && existedAdmin?.status !== STATUS.INACTIVE) {
      throw new BadRequestException(`Admin already exists`)
    }
    const pass = this.createHash(password)
    const admin = await this.connection.transaction(async entityManager => {
    let newAdmin: Admin
		const adminRepository = entityManager.getCustomRepository(AdminRepository)
		newAdmin = await adminRepository.save({
		  ...dto,
		  name,
		  status: STATUS.ACTIVE,
		  password: pass,
		})
      return newAdmin
    })

    return admin
  }

  //Authorization
  login(data: AdminLoginDto): string {
    const accessToken = this.jwtService.sign(data, {
      secret: env.ACCESS_TOKEN_SECRET,
       expiresIn: '60s',
      })
    return accessToken
  }
  
  private createHash(password: string): string {
    const salt = genSaltSync(SALTROUNDS)
    return hashSync(password, salt)
  }

}