import { Module } from "@nestjs/common";
import { UsersService } from "./services/users.service";
import { MongooseModule } from "@nestjs/mongoose";
import { UserSchema } from "./models/User.model";
import { UsersController } from "./users.controller";

@Module({
  imports: [MongooseModule.forFeature([{ name: "User", schema: UserSchema }])],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService]
})
export class UsersModule {
}
