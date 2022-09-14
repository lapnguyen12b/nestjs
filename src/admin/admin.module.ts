import { Module } from '@nestjs/common';
import { AdminRepository } from 'src/repository/admin.repository';
import { AdminController } from './controller';
import { AdminService } from './service';

@Module({
  imports: [AdminModule],
  providers: [AdminService, AdminRepository],
  controllers: [AdminController],
  exports: [AdminService],
})
export class AdminModule {}
