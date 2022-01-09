import {Injectable, NotFoundException } from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import { Model } from 'mongoose';

import {TaskRole} from 'src/models/TaskRole.model';

@Injectable()
export class TaskRoleService {
    private taskRoles: TaskRole[] = [];

    constructor(
        @InjectModel('TaskRole') private readonly taskRoleModel: Model<TaskRole>) {}

    async insertTaskRole(userId: string, taskId: string, role: string) {
        const newTaskRole = new this.taskRoleModel({userId, 
            taskId, 
            role
        });
        const result = await newTaskRole.save();
        return result.id as string;
    }
}