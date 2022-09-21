import { Module } from '@nestjs/common';
import { JwtStrategy } from './jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { env } from 'src/config/env.config';
import { AuthService } from './services';
import { AuthController } from './controllers/auth.controller';
import { AdminModule } from 'src/admin/admin.module';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: env.ACCESS_TOKEN_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
    AdminModule,
  ],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}