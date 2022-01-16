import {Module} from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'
import { BoardController } from 'src/controllers/Board.controller';
import { BoardSchema } from 'src/models/Board.model';
import { BoardService } from 'src/services/Board.service';
import { BoardRoleService } from 'src/services/BoardRole.service';
import { UsersModule } from "../users/users.module";
import { BoardRoleModule} from 'src/modules/BoardRole.module'
import { BoardRoleController } from 'src/controllers/BoardRole.controller';
import { BoardRoleSchema } from 'src/models/BoardRole.model';


@Module({
    imports: [BoardRoleModule, UsersModule,MongooseModule.forFeature([{name: 'Board', schema:BoardSchema}], ), MongooseModule.forFeature([{name: 'BoardRole', schema:BoardRoleSchema}])],
    controllers: [BoardController],
    providers: [ BoardRoleService, BoardService]
})
export class BoardModule{}