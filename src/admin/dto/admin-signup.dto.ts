import { IsEmail, IsNotEmpty, IsString } from 'class-validator'


export class AdminSignupDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string

  @IsNotEmpty()
  @IsString()
  readonly password: string

  @IsNotEmpty()
  @IsEmail({}, { message: 'Email must be valid' })
  readonly email: string
}
