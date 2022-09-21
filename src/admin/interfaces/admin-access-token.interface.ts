import { Admin } from "src/entity/admin"

type PartialAdmin = Omit<Admin, 'password'>

export interface AdminAccessToken {
  token: string
  refreshToken: string
  admin: PartialAdmin
}