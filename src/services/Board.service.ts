import {Injectable, NotFoundException } from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import { Model } from 'mongoose';

import {Board} from 'src/models/Board.model';

@Injectable()
export class BoardService {
    private boards: Board[] = [];

    constructor(
        @InjectModel('Board') private readonly boardModel: Model<Board>) {}

    async insertBoard(name: string, createdBy: string, createdDate: string) {
        const newBoard = new this.boardModel({name: name, 
            createdBy: createdBy, 
            createdDate: createdDate
        });
        const result = await newBoard.save();
        return result.id as string;
    }
}
