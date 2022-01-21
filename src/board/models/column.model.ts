import { Task } from './task';

export class Column {
  id: string;
  name: string;
  boardId?: string;
  items?: Task[];
}
