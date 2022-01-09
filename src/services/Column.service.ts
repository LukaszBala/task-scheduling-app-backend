import {Injectable, NotFoundException } from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import { Model } from 'mongoose';

import {Column} from 'src/models/Column.model';

@Injectable()
export class ColumnService {
    private columns: Column[] = [];

    constructor(
        @InjectModel('Column') private readonly columnModel: Model<Column>) {}

    async insertColumn(boardId: string, name: string, description: string) {
        const newColumn = new this.columnModel({boardId, 
            name, 
            description
        });
        const result = await newColumn.save();
        return result.id as string;
    }
}