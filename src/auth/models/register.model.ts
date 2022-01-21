import { IsEmail, IsNotEmpty } from 'class-validator';

export class RegisterModel {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
