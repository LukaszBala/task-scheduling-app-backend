import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { BoardController } from "src/board/board.controller";
import { BoardSchema } from "src/board/models/board.model";
import { BoardService } from "src/services/board.service";
import { BoardRoleService } from "src/services/BoardRole.service";
import { UsersModule } from "../users/users.module";
import { BoardRoleSchema } from "src/board/models/board-role.model";
import { AuthModule } from "../auth/auth.module";


@Module({
  imports: [UsersModule, AuthModule, MongooseModule.forFeature([{
    name: "Board",
    schema: BoardSchema
  }]), MongooseModule.forFeature([{ name: "BoardRole", schema: BoardRoleSchema }])],
  controllers: [BoardController],
  providers: [BoardRoleService, BoardService]
})
export class BoardModule {
}
