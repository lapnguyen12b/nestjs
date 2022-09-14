import { STATUS } from 'src/enums/status.enum';
import { Column, Entity } from 'typeorm';
import { BaseColumn } from '../base-column.entity';

@Entity('admin')
export class Admin extends BaseColumn {
  constructor(data?: Partial<Admin>) {
    super()
    Object.assign(this, data)
  }
  @Column({ nullable: false })
  name: string
  
  @Column({ nullable: false })
  email: string
  
  @Column({ nullable: false })
  password: string

  @Column({ nullable: false, default:() => STATUS.INACTIVE })
  status: STATUS
  
  @Column({ nullable: true })
  public refreshToken: string
}