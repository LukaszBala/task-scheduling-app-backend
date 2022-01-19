import { IsNotEmpty } from "class-validator";

export class MoveTaskDto {

  @IsNotEmpty()
  boardId: string;

  @IsNotEmpty()
  sourceColumnId: string;

  destColumnId: string;

  @IsNotEmpty()
  sourceTaskIndex: number;

  @IsNotEmpty()
  destTaskIndex: number;
}
