import {
    Body,
    Controller,
    Get,
    Post
} from '@nestjs/common';

import { TaskService } from 'src/services/Task.service'

@Controller('task')
export class TaskController {
    constructor(private readonly taskService: TaskService) {}

    
}