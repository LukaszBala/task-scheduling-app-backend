import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BoardController } from 'src/board/board.controller';
import { BoardSchema } from 'src/board/models/board.model';
import { BoardService } from 'src/services/board.service';
import { UsersModule } from '../users/users.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    MongooseModule.forFeature([
      {
        name: 'Board',
        schema: BoardSchema,
      },
    ]),
  ],
  controllers: [BoardController],
  providers: [BoardService],
})
export class BoardModule {}
