import { IsNotEmpty } from 'class-validator';

export class DeleteTaskDto {
  @IsNotEmpty()
  boardId: string;

  @IsNotEmpty()
  taskId: string;
}
