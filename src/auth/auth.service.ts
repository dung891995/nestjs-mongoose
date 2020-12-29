import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async validateUser(account: string, password: string): Promise<any> {
    // const user = await this.usersService.findOne(account);
    // if(!user){
    //   return null;
    // } 

    // if(user?.password === password) {
    //   //Check Password.

    //   return user
    // }
    // return null;

       // console.log('service', user);
    
    // if (user && user[0].password === password) {
    //   const { password, ...result } = user[0];
    //   console.log('user',user[0]);
      
    //   return result;
    // }
    // return null;
  }
}