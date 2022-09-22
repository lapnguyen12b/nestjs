import { Admin } from 'src/entity/admin'

type PartialAdmin = Omit<Admin, 'password'>

export interface AdminAccessToken {
  admin: PartialAdmin
  token: string
  refreshToken: string
}