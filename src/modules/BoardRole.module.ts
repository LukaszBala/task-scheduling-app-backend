import {Module} from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'
import { BoardRoleSchema } from 'src/models/BoardRole.model'
import { BoardRoleService } from 'src/services/BoardRole.service'
import { BoardRoleController } from 'src/controllers/BoardRole.controller'

@Module({
    imports: [MongooseModule.forFeature([{name: 'BoardRole', schema:BoardRoleSchema}])],
    controllers: [BoardRoleController],
    providers: [BoardRoleService],
    exports: [MongooseModule]
})
export class BoardRoleModule {}