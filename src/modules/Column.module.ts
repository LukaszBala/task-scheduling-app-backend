import {Module} from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'
import { ColumnSchema } from 'src/models/Column.model'
import { ColumnController } from 'src/controllers/Column.controller'
import { ColumnService } from 'src/services/Column.service'

@Module({
    imports: [MongooseModule.forFeature([{name: 'Column', schema:ColumnSchema}])],
    controllers: [ColumnController],
    providers: [ColumnService]
})
export class ColumnModule{}