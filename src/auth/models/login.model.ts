import { IsNotEmpty } from "class-validator";

export class LoginModel {

  @IsNotEmpty()
  login: string;

  @IsNotEmpty()
  password: string;
}
