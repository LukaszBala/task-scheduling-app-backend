import {
    Body,
    Controller,
    Get,
    Post
} from '@nestjs/common';

import { BoardService } from 'src/services/Board.service'

@Controller('board')
export class BoardController {
    constructor(private readonly boardService: BoardService) {}

    @Post()
    async addBoard(
        @Body('name') boardName: string,
        @Body('createdDate') createdDate: string,
        @Body('createdBy') createdBy: string,
    ) {
        console.log('test')
        const generatedId = await this.boardService.insertBoard(
            boardName,
            createdDate,
            createdBy
        );
        return {id: generatedId};
    }

    @Get()
    doGet(){
        console.log('get done')
        return 'test'
    }
    
}