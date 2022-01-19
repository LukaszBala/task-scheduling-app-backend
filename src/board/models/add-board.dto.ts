import { Column } from "./column.model";
import { IsNotEmpty } from "class-validator";

export class AddBoardDto {

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  columns: Column[];
}
