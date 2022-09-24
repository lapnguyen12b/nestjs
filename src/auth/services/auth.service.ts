import {
  BadRequestException,
  ForbiddenException,
  Injectable
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compareSync, genSaltSync, hashSync } from 'bcryptjs';
import { AdminLoginDto, AdminSigninDto, AdminSignupDto } from 'src/admin/dto';
import { AdminAccessToken } from 'src/admin/interfaces';
import { AdminService } from 'src/admin/services';
import { env } from 'src/config/env.config';
import { SALTROUNDS } from 'src/constants/constant';
import { Admin } from 'src/entity/admin';
import { STATUS } from 'src/enums/status.enum';
import { AdminRepository } from 'src/repository/admin.repository';
import { Connection } from 'typeorm';
import { RefreshTokenDto } from '../dto';

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
    const { email, password } = dto
    const admin = await this.validateSignin(email, password)
    if (!admin) { throw new BadRequestException('Admin not found') }
    return admin
  }

  async validateSignin(email: string, password: string): Promise<Admin | null> {
    const adminRepository = this.connection.getCustomRepository(AdminRepository)
    const admin = await adminRepository.findOne({ email: email })

    if (admin && admin.password) {
      if (admin.status === STATUS.INACTIVE) {
        throw new BadRequestException('Your account is currently inactive')
      }
      if (!compareSync(password, admin.password)) {
        throw new ForbiddenException('Password is incorrect')
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
    const accessToken = this.jwtService.sign(payload, {
      secret: env.ACCESS_TOKEN_SECRET,
      expiresIn: '7d',
    })
    await this.adminService.updateRefreshToken(refreshToken, id)
    return { admin, token: accessToken, refreshToken }
  }

  async refreshToken(refreshTokenDto: RefreshTokenDto): Promise<{ accessToken: string, refreshToken: string }> {
    const { id, refreshToken } = refreshTokenDto
    if (!refreshToken) {
      throw new BadRequestException('Token not null')
    }

    const tokenVerify = await this.jwtService.verifyAsync<{ email: string; exp: number }>(refreshToken, { secret: env.REFRESH_TOKEN_SECRET })
    if (!tokenVerify || !tokenVerify.email) {
      throw new BadRequestException('Invalid refresh token')
    }

    const admin = await this.adminService.findOneById(id)
    if (!admin.refreshToken) {
      throw new BadRequestException('Admin Invalid refresh token')
    }

    if (refreshToken !== admin.refreshToken) {
      throw new BadRequestException('Invalid refresh token')
    }

    const payload = { email: admin.email, sub: admin.id }
    const newRefreshToken = this.jwtService.sign(payload, {
      secret: env.REFRESH_TOKEN_SECRET,
      expiresIn: '30d',
    })
    const token = this.jwtService.sign(payload)
    await this.adminService.updateRefreshToken(refreshToken, admin.id)
    return { accessToken: token, refreshToken: newRefreshToken }
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
