import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {MongooseModule} from '@nestjs/mongoose'
import { BoardModule } from './modules/Board.module';
import { BoardController } from './controllers/Board.controller';

@Module({
  imports: [
    BoardModule ,MongooseModule.forRoot(
    'mongodb+srv://adminZTP:admin@cluster0.x6jly.mongodb.net/TaskScheduling?retryWrites=true&w=majority'
  )],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
