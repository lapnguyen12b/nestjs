import { IsEmail, IsNotEmpty, IsString } from 'class-validator'


export class AdminSigninDto {
  @IsNotEmpty()
  @IsEmail({}, { message: 'Email must be valid' })
  readonly email: string

  @IsNotEmpty()
  @IsString()
  readonly password: string
}
