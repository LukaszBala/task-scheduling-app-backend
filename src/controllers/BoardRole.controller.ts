import {
    Body,
    Controller,
    Get,
    Post
} from '@nestjs/common';

import { BoardRoleService } from 'src/services/BoardRole.service'

@Controller('boardRole')
export class BoardRoleController {
    constructor(private readonly boardRoleService: BoardRoleService) {}

    
}