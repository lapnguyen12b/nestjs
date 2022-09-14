import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator'
import { EMAIL_LENGTH, STR_LENGTH, TEXT_LENGTH } from 'src/constants/constant'
import { STATUS } from 'src/enums/status.enum'


export class AdminDto {
  @IsOptional()
  @IsString()
  @MaxLength(TEXT_LENGTH)
  readonly name: string

  @IsOptional()
  @IsEmail({}, { message: 'Email must be valid' })
  @MaxLength(EMAIL_LENGTH)
  readonly email: string

  @IsOptional()
  @IsString()
  @MaxLength(STR_LENGTH)
  readonly password: string

  @IsNotEmpty()
  @IsEnum([STATUS.ACTIVE, STATUS.INACTIVE])
  readonly status: STATUS
}

