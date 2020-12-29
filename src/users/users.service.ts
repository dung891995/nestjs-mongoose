import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, set } from 'mongoose';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserDocument } from './schemas/user.schema';
import { getClientIp } from 'request-ip';
import { genSaltSync, hashSync, compareSync } from 'bcrypt';

const SALT_ROUND = 10

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) { }
  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const createdUser = new this.userModel(createUserDto);
      return createdUser.save();
    } catch (error) {
      throw new Error(error);
      
    }

  }


  async historyLogin(account) {
    try {
      let time = new Date
      return await this.userModel.updateOne({ account: account }, { lastTimeLogin: time });
    } catch (error) {
      throw new Error(error);
    }
  }

  generatePassword(password) {
    let salt = genSaltSync(SALT_ROUND);
    return hashSync(password, salt);

  }

  historyIP(req, account) {
    try {
      let clientIp = getClientIp(req);
      return this.userModel.updateOne({ account: account }, { IP: clientIp });
    } catch (error) {
      throw new Error(error);
    }
  }

  async findOneAccount(account: string): Promise<User> {
    return this.userModel.findOne({ account: account });
  }

  async findOneEmail(email: string): Promise<User> {
    return this.userModel.findOne({ email: email }, { password: 0 });
  }

  async findById(id: string): Promise<User> {
    return this.userModel.findOne({ _id: id }, { password: 0 });
  }

  async updateUserInfo(id: string, UpdateUserDto): Promise<any> {
    try {
      let result = await this.userModel.findByIdAndUpdate(id, UpdateUserDto, { new: true });
      result.password = undefined //set undefined
      return result
    } catch (error) {
      throw new Error(error);
    }
  }


}
