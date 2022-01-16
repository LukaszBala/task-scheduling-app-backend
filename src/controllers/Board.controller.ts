import {
    Body,
    Controller,
    Get,
    Post,
    Req
} from '@nestjs/common';
import { BoardService } from 'src/services/Board.service'
import { BoardRoleService } from 'src/services/BoardRole.service';

@Controller('board')
export class BoardController {
    constructor( private readonly boardService: BoardService, private readonly boardRoleService: BoardRoleService) {}

    @Post()
    async addBoard(
        @Body('name') boardName: string,
        @Body('createdDate') createdDate: string,
        @Body('createdBy') createdBy: string,
        @Req() req
    ) {
        
        const generatedId = await this.boardService.insertBoard(
            boardName,
            createdDate,
            createdBy
        );
        this.boardRoleService.insertBoardRole(req.user.userId, generatedId, 'admin')
        return {id: generatedId};
    }

    @Get()
    doGet(@Req() req){
        let userBoards = this.boardRoleService.retrieveUserBoards(req.user.userId)
        return this.boardService.retrieveAllBoards(userBoards);
    }
    
}