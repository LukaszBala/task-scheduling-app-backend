import { Task } from "./task";
import { IsNotEmpty } from "class-validator";

export class EditTaskDto {

  @IsNotEmpty()
  boardId: string;

  @IsNotEmpty()
  task: Task;
}
