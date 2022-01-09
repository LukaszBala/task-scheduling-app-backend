import {
    Body,
    Controller,
    Get,
    Post
} from '@nestjs/common';

import { TaskCommentService } from 'src/services/TaskComment.service'

@Controller('taskComment')
export class TaskCommentController {
    constructor(private readonly taskCommentService: TaskCommentService) {}

    
}