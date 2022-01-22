import { IsNotEmpty } from 'class-validator';

export class TaskDto {
  @IsNotEmpty()
  columnId: string;

  @IsNotEmpty()
  name: string;

  description: string;
}
