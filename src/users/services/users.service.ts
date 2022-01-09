import { Injectable } from "@nestjs/common";
import { User } from "../models/User.model";
import { RegisterModel } from "../../auth/models/register.model";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import * as bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";


@Injectable()
export class UsersService {

  constructor(@InjectModel("User") private readonly boardModel: Model<User>) {
  }

  async findOne(login: string): Promise<User | undefined> {
    return this.boardModel.findOne({$or: [
        {email: login},
        {username: login}
      ]});
  }

  async existsByUsername(username: string): Promise<boolean | undefined> {
    const user = await this.boardModel.findOne({ username });
    return !!user;
  }

  async existsByEmail(email: string): Promise<boolean | undefined> {
    const user = await this.boardModel.findOne({ email });
    return !!user;
  }

  async register(registerDto: RegisterModel) {
    const saltOrRounds = 10;
    const hashedPass = await bcrypt.hash(registerDto.password, saltOrRounds);
    const userId = uuidv4();
    const result = await this.boardModel.create({
      userId: userId,
      username: registerDto.username,
      password: hashedPass,
      email: registerDto.email
    });
    return !!result;
  }
}
