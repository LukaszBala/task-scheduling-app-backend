import {
    Body,
    Controller,
    Get,
    Post
} from '@nestjs/common';

import { ColumnService } from 'src/services/Column.service'

@Controller('column')
export class ColumnController {
    constructor(private readonly columnService: ColumnService) {}

    
}