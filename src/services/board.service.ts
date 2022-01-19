import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Board } from "src/board/models/board.model";
import { UsersService } from "../users/services/users.service";
import { AddBoardDto } from "../board/models/add-board.dto";
import { BoardRoleEnum } from "../board/models/board-role.enum";
import { User } from "../users/models/User.model";

@Injectable()
export class BoardService {

  constructor(
    @InjectModel("Board") private readonly boardModel: Model<Board>, private usersService: UsersService) {
  }

  async insertBoard(board: AddBoardDto, userId: string) {
    const newBoard = new this.boardModel({
      name: board.name,
      columns: board.columns,
      createdBy: userId,
      createdDate: new Date().getTime(),
      users: [{ userId, role: BoardRoleEnum.CREATOR }]
    });
    const result = await newBoard.save();
    await this.usersService.addBoardToUsers([userId], result.id);
    return result.id as string;
  }

  async getAllUserBoards(userId: string) {
    const user = await this.usersService.findOneByUserId(userId);
    if (!user?.boardIds?.length) {
      return [];
    }

    const boards: Board[] = await this.boardModel.find({ _id: { $in: user.boardIds } });
    return await Promise.all(boards.map(async board => {
      const userIds = board.users.map(user => user.userId);
      const users: User[] = await this.usersService.findUsersByIds(userIds);
      board.users = board.users.map(user => {
        const data = users.find(u => u.userId === user.userId);
        return { ...user, username: data.username, email: data.email};
      });

      return board;
    }));
  }
}
