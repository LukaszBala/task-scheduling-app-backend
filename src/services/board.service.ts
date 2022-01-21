import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Board } from 'src/board/models/board.model';
import { UsersService } from '../users/services/users.service';
import { AddBoardDto } from '../board/models/add-board.dto';
import { BoardRoleEnum } from '../board/models/board-role.enum';
import { User } from '../users/models/User.model';
import { AddTaskDto } from '../board/models/add-task.dto';
import { Task } from '../board/models/task';
import { v4 as uuidv4 } from 'uuid';
import { MoveTaskDto } from '../board/models/move-task.dto';
import { EditTaskDto } from '../board/models/edit-task.dto';
import { AddUserDto } from '../board/models/add-user.dto';
import { DeleteTaskDto } from '../board/models/delete-task.dto';

@Injectable()
export class BoardService {
  constructor(
    @InjectModel('Board') private readonly boardModel: Model<Board>,
    private usersService: UsersService,
  ) {}

  async insertBoard(board: AddBoardDto, userId: string) {
    board.columns = board.columns.map((col) => ({
      ...col,
      id: uuidv4(),
      boardId: undefined,
    }));
    const newBoard = new this.boardModel({
      name: board.name,
      columns: board.columns,
      createdBy: userId,
      createdDate: new Date().getTime(),
      users: [{ userId, role: BoardRoleEnum.CREATOR }],
    });
    const result = await newBoard.save();
    await this.usersService.addBoardToUsers([userId], result.id);
    return await this.getAllUserBoards(userId);
  }

  async getAllUserBoards(userId: string): Promise<Board[]> {
    const user = await this.usersService.findOneByUserId(userId);
    if (!user?.boardIds?.length) {
      return [];
    }

    const boards = await this.boardModel.find({ _id: { $in: user.boardIds } });
    return await Promise.all(
      boards.map(async (board) => {
        const userIds = board.users.map((user) => user.userId);
        const users: User[] = await this.usersService.findUsersByIds(userIds);
        board.users = board.users.map((user) => {
          const data = users.find((u) => u.userId === user.userId);
          return {
            ...user,
            username: data.username,
            email: data.email,
            color: data.color,
          };
        });
        board.columns = board.columns.map((col) => {
          return { ...col, boardId: board.id };
        });
        const role = board.users.find((user) => user.userId === userId)?.role;
        return {
          id: board._id,
          role,
          name: board.name,
          columns: board.columns,
          users: board.users,
          createdDate: board.createdDate,
          createdBy: board.createdBy,
        };
      }),
    );
  }

  async getSingleBoard(userId: string, boardId: string) {
    const board = await this.boardModel.findById(boardId);
    this.userCanAccessGuard(board, userId);

    const userIds = board.users.map((user) => user.userId);
    const users: User[] = await this.usersService.findUsersByIds(userIds);
    board.users = board.users.map((user) => {
      const data = users.find((u) => u.userId === user.userId);
      return {
        ...user,
        username: data.username,
        email: data.email,
        color: data.color,
      };
    });
    board.columns = board.columns.map((col) => {
      return { ...col, boardId: board.id };
    });
    const role = board.users.find((user) => user.userId === userId)?.role;
    return {
      id: board._id,
      role,
      name: board.name,
      columns: board.columns,
      users: board.users,
      createdDate: board.createdDate,
      createdBy: board.createdBy,
    };
  }

  async addTask(task: AddTaskDto, userId: string) {
    let newTask = new Task();
    newTask = { ...newTask, ...task.task };
    newTask.id = uuidv4();
    newTask.createdBy = userId;
    newTask.createdDate = new Date().getTime();

    const board = await this.boardModel.findById(task.boardId);
    this.userCanAccessGuard(board, userId);
    const updatedColumn = board.columns.find(
      (col) => col.id === newTask.columnId,
    );
    updatedColumn.items.push(newTask);
    await this.boardModel.updateOne(
      { _id: task.boardId, 'columns.id': newTask.columnId },
      {
        $set: {
          'columns.$': updatedColumn,
        },
      },
    );
  }

  async moveTask(userId, taskPositions: MoveTaskDto) {
    const board = await this.boardModel.findById(taskPositions.boardId);
    const columns = board.columns;

    this.userCanAccessGuard(board, userId);

    let newColumns;

    if (taskPositions.sourceColumnId !== taskPositions.destColumnId) {
      const sourceIdx = columns.findIndex(
        (col) => col.id === taskPositions.sourceColumnId,
      );
      const destIdx = columns.findIndex(
        (col) => col.id === taskPositions.destColumnId,
      );
      const sourceColumn = columns[sourceIdx];
      const destColumn = columns[destIdx];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      let [removed] = sourceItems.splice(taskPositions.sourceTaskIndex, 1);
      removed = { ...removed };
      removed.columnId = destColumn.id;
      destItems.splice(taskPositions.destTaskIndex, 0, removed);

      newColumns = columns.slice();
      newColumns[sourceIdx] = { ...newColumns[sourceIdx], items: sourceItems };
      newColumns[destIdx] = { ...newColumns[destIdx], items: destItems };
    } else {
      const sourceIdx = columns.findIndex(
        (col) => col.id === taskPositions.sourceColumnId,
      );
      const column = columns[sourceIdx];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(taskPositions.sourceTaskIndex, 1);
      copiedItems.splice(taskPositions.destTaskIndex, 0, removed);
      newColumns = columns.slice();
      newColumns[sourceIdx] = { ...newColumns[sourceIdx], items: copiedItems };
    }

    if (newColumns) {
      await this.boardModel.updateOne(
        { _id: taskPositions.boardId },
        {
          $set: {
            columns: newColumns,
          },
        },
      );
    }
  }

  async editTask(userId, edit: EditTaskDto) {
    const board = await this.boardModel.findById(edit.boardId);

    this.userCanAccessGuard(board, userId);

    let taskIdx;
    const column = board.columns.find((col) => {
      taskIdx = col.items.findIndex((item) => item.id === edit.task.id);
      return taskIdx != null && taskIdx >= 0;
    });

    if (!column || taskIdx == null || taskIdx < 0) {
      throw new NotFoundException('task not found.');
    }

    column.items[taskIdx] = { ...column.items[taskIdx], ...edit.task };

    await this.boardModel.updateOne(
      { _id: edit.boardId, 'columns.id': edit.task.columnId },
      {
        $set: {
          'columns.$': column,
        },
      },
    );
    return await this.getSingleBoard(userId, edit.boardId);
  }

  async addUserToBoard(userId: string, boardId: string, user: AddUserDto) {
    const board = await this.boardModel.findById(boardId);

    this.userCanAccessGuard(board, userId);

    board.users.push(user);
    await board.save();

    await this.usersService.addBoardToUsers([user.userId], boardId);
    return await this.getSingleBoard(userId, boardId);
  }

  async changeUserRole(userId: string, boardId: string, user: AddUserDto) {
    const board = await this.boardModel.findById(boardId);

    this.userCanAccessGuard(board, userId);

    board.users = board.users.map((item) => {
      if (item.userId !== user.userId) {
        return item;
      }

      return { ...item, role: user.role };
    });
    await board.save();

    await this.usersService.addBoardToUsers([user.userId], boardId);
    return await this.getSingleBoard(userId, boardId);
  }

  async deleteTask(userId, taskDeleteDto: DeleteTaskDto) {
    const board = await this.boardModel.findById(taskDeleteDto.boardId);

    this.userCanAccessGuard(board, userId);

    let taskIdx;
    const columnIdx = board.columns.findIndex((col) => {
      taskIdx = col.items.findIndex((item) => item.id === taskDeleteDto.taskId);
      return taskIdx != null && taskIdx >= 0;
    });

    if (
      columnIdx != null &&
      columnIdx >= 0 &&
      taskIdx != null &&
      taskIdx >= 0
    ) {
      board.columns[columnIdx].items.splice(taskIdx, 1);
      await board.save();
      await this.boardModel.updateOne(
        {
          _id: taskDeleteDto.boardId,
          'columns.id': board.columns[columnIdx].id,
        },
        {
          $set: {
            'columns.$': board.columns[columnIdx],
          },
        },
      );
    } else {
      throw new NotFoundException('task not found');
    }

    return await this.getSingleBoard(userId, taskDeleteDto.boardId);
  }

  private userCanAccessGuard(board: Board, userId: string) {
    const userCanAccess = !!board.users.find((user) => user.userId === userId);
    if (!userCanAccess) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
  }
}
