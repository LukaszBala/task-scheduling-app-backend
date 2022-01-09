import {Injectable, NotFoundException } from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import { Model } from 'mongoose';

import {TaskComment} from 'src/models/TaskComment.model';

@Injectable()
export class TaskCommentService {
    private taskComments: TaskComment[] = [];

    constructor(
        @InjectModel('TaskComment') private readonly taskCommentModel: Model<TaskComment>) {}

    async insertTaskComment(taskId: string, comment: string, createdBy: string,
        createdDate: string) {
        const newTaskComment = new this.taskCommentModel({taskId, 
            comment, 
            createdBy,
            createdDate
        });
        const result = await newTaskComment.save();
        return result.id as string;
    }
}