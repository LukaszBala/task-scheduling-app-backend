import { Body, Controller, Get, Param, Post, Req } from "@nestjs/common";
import { BoardService } from "src/services/board.service";
import { AddBoardDto } from "./models/add-board.dto";
import { AddTaskDto } from "./models/add-task.dto";
import { MoveTaskDto } from "./models/move-task.dto";
import { EditTaskDto } from "./models/edit-task.dto";
import { AddUserDto } from "./models/add-user.dto";

@Controller("board")
export class BoardController {
  constructor(private readonly boardService: BoardService) {
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

  @Get(":id")
  async getSingleBoard(@Param() params, @Req() req) {
    return await this.boardService.getSingleBoard(req.user.userId, params.id);
  }

  @Post(":id/add-user")
  async addUSerToBoard(@Param() params, @Req() req, @Body() user: AddUserDto) {
    return await this.boardService.addUserToBoard(req.user.userId, params.id, user);
}

  @Post("task")
  async addTask(@Body() task: AddTaskDto, @Req() req) {
    await this.boardService.addTask(task, req.user.userId);
  }

  @Post("task/move")
  async moveTask(@Body() taskPositions: MoveTaskDto, @Req() req) {
    await this.boardService.moveTask(req.user.userId, taskPositions);
  }

  @Post("task/edit")
  async editTask(@Body() edit: EditTaskDto, @Req() req) {
    return await this.boardService.editTask(req.user.userId, edit);
  }
}



