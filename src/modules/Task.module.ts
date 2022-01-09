import {Module} from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'
import { TaskSchema } from 'src/models/Task.model'
import { TaskController } from 'src/controllers/Task.controller'
import { TaskService } from 'src/services/Task.service'

@Module({
    imports: [MongooseModule.forFeature([{name: 'Task', schema:TaskSchema}])],
    controllers: [TaskController],
    providers: [TaskService]
})
export class TaskModule{}