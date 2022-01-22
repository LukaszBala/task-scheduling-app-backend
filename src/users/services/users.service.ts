import { Injectable } from '@nestjs/common';
import { User } from '../models/User.model';
import { RegisterModel } from '../../auth/models/register.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async findOneByEmailOrUsername(login: string): Promise<User | undefined> {
    return this.userModel.findOne({
      $or: [{ email: login }, { username: login }],
    });
  }

  async findByEmailOrUsername(name: string) {
    const users: User[] = await this.userModel.find({
      $or: [{ email: name }, { username: name }],
    });

    return users.map((user) => ({
      userId: user.userId,
      username: user.username,
      email: user.email,
      color: user.color,
    }));
  }

  async findOneByUserId(userId: string): Promise<User | undefined> {
    return this.userModel.findOne({ userId });
  }

  async existsByUsername(username: string): Promise<boolean | undefined> {
    const user = await this.userModel.findOne({ username });
    return !!user;
  }

  async existsByEmail(email: string): Promise<boolean | undefined> {
    const user = await this.userModel.findOne({ email });
    return !!user;
  }

  async register(registerDto: RegisterModel) {
    const saltOrRounds = 10;
    const hashedPass = await bcrypt.hash(registerDto.password, saltOrRounds);
    const userId = uuidv4();
    const result = await this.userModel.create({
      userId: userId,
      username: registerDto.username,
      color: '#' + Math.floor(Math.random() * 16777215).toString(16),
      password: hashedPass,
      email: registerDto.email,
      boardIds: [],
    });
    return !!result;
  }

  async addBoardToUsers(userIds: string[], boardId: string) {
    await this.userModel.updateMany(
      { userId: { $in: userIds } },
      { $push: { boardIds: boardId } },
    );
  }

  async findUsersByIds(userIds: string[]) {
    return this.userModel.find({ userId: { $in: userIds } });
  }

  async assignColors() {
    const users = await this.userModel.find({});
    await Promise.all(
      users.map(async (user) => {
        await this.userModel.updateOne(
          { userId: user.userId },
          { color: '#' + Math.floor(Math.random() * 16777215).toString(16) },
        );
      }),
    );
  }
}
