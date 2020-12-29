import { Body, Controller, Get, Param, Post, Put, Res, Render, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schemas/user.schema';
import { genSaltSync, hashSync, compareSync } from 'bcrypt';
import { sign, verify } from 'jsonwebtoken'
import { Response, Request } from 'express';
const saltRounds = 10;
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {

    let { account, email, password } = createUserDto;
    const isValidAccount = await this.usersService.findOneAccount(account);
    if (isValidAccount) {
      return 'Account already exist'
    }

    const isValidEmail = await this.usersService.findOneEmail(email);
    if (isValidEmail) {
      return 'Email already exist'
    }

    createUserDto.password = this.usersService.generatePassword(password);
    let result = await this.usersService.create(createUserDto);
    return result;
  }

  @Get('/private')
  async checkAuth(@Req() request: Request) {
    try {
      let token = request.cookies
      if (token) {
        let jwtDecode = verify(token.token, 'dung891995')
        return "Hello private"
      }
      return "You are not logged in"
    } catch (error) {

      return "invalid token"
    }

  }
  @Get('/:id')
  async findById(@Param('id') id): Promise<User> {
    return this.usersService.findById(id);
  }

  @Put('/find/:id')
  async updateUserInfo(@Param('id') id: string, @Body() UpdateUserDto: UpdateUserDto): Promise<User> {
    let result = await this.usersService.updateUserInfo(id, UpdateUserDto);
    return result
  }

  @Post('/login')
  async login(@Body() LoginUserDto: LoginUserDto, @Res({ passthrough: true }) response: Response, @Req() request: Request) {

    const IsValidAccount = await this.usersService.findOneAccount(LoginUserDto.account);
    console.log(IsValidAccount);

    if (!IsValidAccount) {
      return 'Tài khoản không đúng'
    }

    let comparePass = await compareSync(LoginUserDto.password, IsValidAccount.password);

    if (!comparePass) {
      return 'Mật khẩu không đúng'
    }

    const token = sign({ id: IsValidAccount._id }, 'dung891995');

    await this.usersService.historyLogin(LoginUserDto.account);

    await this.usersService.historyIP(request, LoginUserDto.account)
    try {

      response.cookie('token', token);
      return "Đăng nhập thành công"

    } catch (error) {
      console.log('error', error);
    }
  }

}
