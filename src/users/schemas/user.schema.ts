import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  _id: string;

  @Prop()
  account: string;

  @Prop()
  email: string;

  @Prop()
  password?: string;

  @Prop()
  address: string;

  @Prop({ default: 'user' })
  role: string;

  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop()
  phoneNumber: string;

  @Prop({default:''})
  lastTimeLogin: Date;

  @Prop({default:''})
  IP: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
