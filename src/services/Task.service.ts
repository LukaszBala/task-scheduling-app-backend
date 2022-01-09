import {Injectable, NotFoundException } from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import { Model } from 'mongoose';

import {Task} from 'src/models/Task.model';

@Injectable()
export class TaskService {
    private tasks: Task[] = [];

    constructor(
        @InjectModel('Task') private readonly taskModel: Model<Task>) {}

    async insertTask(columnId: string, name: string, createdBy: string,
        createdDate: string, description: string, status: string) {
        const newTask = new this.taskModel({columnId, 
            name, 
            createdBy,
            createdDate,
            description,
            status
        });
        const result = await newTask.save();
        return result.id as string;
    }
}