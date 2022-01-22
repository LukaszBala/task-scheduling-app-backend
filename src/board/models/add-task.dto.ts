import { TaskDto } from './task.dto';
import { IsNotEmpty } from 'class-validator';

export class AddTaskDto {
  @IsNotEmpty()
  boardId: string;

  @IsNotEmpty()
  task: TaskDto;
}
