import {Module} from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'
import { BoardController } from 'src/controllers/Board.controller';
import { BoardSchema } from 'src/models/Board.model';
import { BoardService } from 'src/services/Board.service';

@Module({
    imports: [MongooseModule.forFeature([{name: 'Board', schema:BoardSchema}])],
    controllers: [BoardController],
    providers: [BoardService]
})
export class BoardModule{}