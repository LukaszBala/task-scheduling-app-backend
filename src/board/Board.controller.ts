import { Body, Controller, Get, Post, Req } from "@nestjs/common";
import { BoardService } from "src/services/board.service";
import { BoardRoleService } from "src/services/BoardRole.service";
import { AddBoardDto } from "./models/add-board.dto";

@Controller("board")
export class BoardController {
  constructor(private readonly boardService: BoardService, private readonly boardRoleService: BoardRoleService) {
  }

  @Post()
  async addBoard(
    @Body() board: AddBoardDto,
    @Req() req
  ) {
    const generatedId = await this.boardService.insertBoard(board, req.user.userId);
    return { id: generatedId };
  }

  @Get()
  async getAllBoards(@Req() req) {
    return await this.boardService.getAllUserBoards(req.user.userId);
  }


}
