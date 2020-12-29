import { IsEmail, IsInt, IsString, MinLength ,IsNotEmpty} from 'class-validator';
export class CreateUserDto {
  @IsString()
  @MinLength(4)
  account: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @IsNotEmpty()
  phoneNumber: string;
}