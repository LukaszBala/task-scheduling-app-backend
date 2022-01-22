import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class User {
  @Prop()
  userId: string;

  @Prop()
  username: string;

  @Prop()
  password: string;

  @Prop()
  email: string;

  @Prop()
  boardIds: string[];

  @Prop()
  color?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
