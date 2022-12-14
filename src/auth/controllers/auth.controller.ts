import { Body, Controller, Post } from '@nestjs/common';
import { SerializeAdminToken } from 'src/admin/decorators';
import { AdminLoginDto, AdminSigninDto, AdminSignupDto } from 'src/admin/dto';
import { Admin } from 'src/entity/admin';
import { RefreshTokenDto } from '../dto';
import { RefreshToken } from '../interfaces';
import { AuthService } from '../services';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signUp(@Body() dto: AdminSignupDto): Promise<Admin> {
    return this.authService.signUpAdmin(dto)
  }
  
  @Post('signin')
  @SerializeAdminToken()
  signin(@Body() dto: AdminSigninDto): Promise<Admin> {
    return this.authService.signin(dto)
  }

  @Post('refresh-token')
  refreshToken(@Body() refreshTokenDto: RefreshTokenDto): Promise<RefreshToken> {
    return this.authService.refreshToken(refreshTokenDto)
  }

  @Post('login-test-token')
  login(@Body() loginDto: AdminLoginDto): string {
    return this.authService.login(loginDto)
  }
}
