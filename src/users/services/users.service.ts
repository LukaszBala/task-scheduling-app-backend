import { Injectable } from "@nestjs/common";
import { User } from "../models/User.model";

@Injectable()
export class UsersService {
  private readonly users: User[] = [
    {
      userId: "1",
      username: "john",
      password: "changeme",
      email: "john@email.com"
    },
    {
      userId: "2",
      username: "maria",
      password: "guess",
      email: "maria@email.com"
    }
  ];

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find(user => user.username === username);
  }
}
