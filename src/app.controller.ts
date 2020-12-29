import { Controller, Get, UseGuards, Req, Render, Post, Request } from '@nestjs/common';
import { AppService } from './app.service';

import { AuthGuard } from "@nestjs/passport";
@Controller()
export class AppController {
  getHello(): any {
    throw new Error('Method not implemented.');
  }
  constructor(private readonly appService: AppService) { }

  @Get('login')
  @Render('index')
  root() {
    return {};
  }

  
  @Post('auth/login')
  @UseGuards(AuthGuard('local'))
  async login(@Request() req) {
    
    return req.user;
  }

  @Get('auth/google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req) {
  }

  @Get('auth/google/callback')
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(@Req() req) {
    return this.appService.googleLogin(req)
  }
}
