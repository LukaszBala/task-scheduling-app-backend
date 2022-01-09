import {Module} from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'
import { TaskCommentSchema } from 'src/models/TaskComment.model'
import { TaskCommentController } from 'src/controllers/TaskComment.controller'
import { TaskCommentService } from 'src/services/TaskComment.service'

@Module({
    imports: [MongooseModule.forFeature([{name: 'Task', schema:TaskCommentSchema}])],
    controllers: [TaskCommentController],
    providers: [TaskCommentService]
})
export class TaskCommentModule{}