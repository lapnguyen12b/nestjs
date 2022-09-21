import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common'
import { Observable } from 'rxjs'
import { switchMap } from 'rxjs/operators'
import { AuthService } from 'src/auth/services'
import { Admin } from 'src/entity/admin'

@Injectable()
export class AdminTokenInterceptor implements NestInterceptor {
  constructor(private authService: AuthService) {}

  intercept(_context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      switchMap(async (admin: Admin) => {
        const { token, refreshToken } = await this.authService.signToken(admin)
        admin.refreshToken = refreshToken
        return {
          token,
          refreshToken,
          admin,
        }
      }),
    )
  }
}
