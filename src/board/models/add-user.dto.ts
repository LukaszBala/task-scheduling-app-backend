import { BoardRoleEnum } from "./board-role.enum";
import { IsNotEmpty } from "class-validator";

export class AddUserDto {

  @IsNotEmpty()
  userId: string;

  @IsNotEmpty()
  role: BoardRoleEnum;
}
