import { BoardRoleEnum } from "./board-role.enum";

export interface BoardUserModel {
  userId: string;
  role: BoardRoleEnum
}
