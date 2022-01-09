import {Injectable, NotFoundException } from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import { Model } from 'mongoose';

import {BoardRole} from 'src/models/BoardRole.model';

@Injectable()
export class BoardRoleService {
    private boardsRoles: BoardRole[] = [];

    constructor(
        @InjectModel('BoardRole') private readonly boardRoleModel: Model<BoardRole>) {}

    async insertBoardRole(userId: string, boardId: string, role: string) {
        const newBoardRole = new this.boardRoleModel({userId: userId, 
            boardId: boardId, 
            role: role
        });
        const result = await newBoardRole.save();
        return result.id as string;
    }
}