import { IsNotEmpty} from 'class-validator';
export class LoginUserDto {  
    @IsNotEmpty()  readonly account: string;
    @IsNotEmpty()  readonly password: string;
}