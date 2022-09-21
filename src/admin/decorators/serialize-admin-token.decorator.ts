import { applyDecorators, ClassSerializerInterceptor, UseInterceptors } from '@nestjs/common'
import { AdminTokenInterceptor } from '../interceptors'

export function SerializeAdminToken(): any {
  return applyDecorators(UseInterceptors(AdminTokenInterceptor, ClassSerializerInterceptor))
}
