import {
    Body,
    Controller,
    Get,
    Post
} from '@nestjs/common';

import { TaskRoleService } from 'src/services/TaskRole.service'

@Controller('taskRole')
export class TaskRoleController {
    constructor(private readonly taskRoleService: TaskRoleService) {}

    
}