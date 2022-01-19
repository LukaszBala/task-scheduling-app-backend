import { Column } from "./column.model";
import { BoardUserModel } from "./board-user.model";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class Board {

  id: string;

  @Prop()
  name: string;

  @Prop()
  createdBy: string;

  @Prop()
  createdDate: string;

  @Prop()
  users: BoardUserModel[];

  @Prop()
  columns: Column[];
}

export const BoardSchema = SchemaFactory.createForClass(Board);
