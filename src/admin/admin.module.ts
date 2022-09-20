import { Module } from '@nestjs/common';
import { AdminRepository } from 'src/repository/admin.repository';
import { AdminController } from './controllers';
import { AdminService } from './services';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [JwtModule, PassportModule],
  providers: [AdminService, AdminRepository],
  controllers: [AdminController],
  exports: [AdminService],
})
export class AdminModule {}
