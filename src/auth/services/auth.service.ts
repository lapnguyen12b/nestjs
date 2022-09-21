import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { genSaltSync, hashSync } from 'bcryptjs';
import { AdminLoginDto, AdminSigninDto, AdminSignupDto } from 'src/admin/dto';
import { AdminAccessToken } from 'src/admin/interfaces/admin-access-token.interface';
import { AdminService } from 'src/admin/services';
import { env } from 'src/config/env.config';
import { SALTROUNDS } from 'src/constants/constant';
import { Admin } from 'src/entity/admin';
import { STATUS } from 'src/enums/status.enum';
import { AdminRepository } from 'src/repository/admin.repository';
import { Connection } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    private connection: Connection,
    private jwtService: JwtService,
    private adminService: AdminService,
  ) {}
  
  async signUpAdmin(dto: AdminSignupDto): Promise<Admin> {
    const { name, password } = dto
    const adminRepo = this.connection.getCustomRepository(AdminRepository)
    const existedAdmin = await adminRepo.getAdminByEmail(dto.email)
    if (existedAdmin && existedAdmin?.status !== STATUS.INACTIVE) {
      throw new BadRequestException('Admin already exists')
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
  
  async signin(dto: AdminSigninDto): Promise<Admin> {
    const { email } = dto
    const admin = await this.validateSignin(email)
    if (!admin) { throw new UnauthorizedException('Admin not found') }
    return admin
  }

  async validateSignin(email: string): Promise<Admin | null> {
    const adminRepository = this.connection.getCustomRepository(AdminRepository)
    const admin = await adminRepository.findOne({ email: email })

    if (admin && admin.password) {
      if (admin.status === STATUS.INACTIVE) {
        throw new BadRequestException('Your account is currently inactive')
      }
      return admin
    }
    return null
  }

  async signToken(admin: Admin): Promise<AdminAccessToken> {
    const { id, email } = admin
    const payload = { email: email, sub: id }
    const refreshToken = this.jwtService.sign(payload, {
      secret: env.REFRESH_TOKEN_SECRET,
      expiresIn: '30d',
    })
    const accessToken = this.jwtService.sign(payload)
    await this.adminService.updateRefreshToken(refreshToken, id)
    return { token: accessToken, refreshToken, admin }
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
