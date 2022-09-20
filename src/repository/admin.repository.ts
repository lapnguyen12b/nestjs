import { Admin } from 'src/entity/admin';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Admin)
export class AdminRepository extends Repository<Admin> {
  async getAdminByEmail(email: string): Promise<Admin | undefined> {
    return this.findOne({email: email})
  }
}
