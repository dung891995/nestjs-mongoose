import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  googleLogin(req) {
    if (!req.user) {
      return 'ko co tk gg nay'
    }
    return {
      message: 'thong tin ng dung`',
      user: req.user
    }
  }
}