import { Admin } from 'src/entity/admin';
import { Repository } from 'typeorm';

export class AdminRepository extends Repository<Admin> {
  async getAdmins(): Promise<Admin[]> {
    return this.find()
  }
}
