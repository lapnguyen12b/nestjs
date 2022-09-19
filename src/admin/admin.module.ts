import { Module } from '@nestjs/common';
import { AdminRepository } from 'src/repository/admin.repository';
import { AdminController } from './controllers';
import { AdminService } from './services';

@Module({
  providers: [AdminService, AdminRepository],
  controllers: [AdminController],
  exports: [AdminService],
})
export class AdminModule {}
