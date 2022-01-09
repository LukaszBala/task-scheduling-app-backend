import { Injectable } from "@nestjs/common";
import { UsersService } from "../../users/services/users.service";
import { JwtService } from "@nestjs/jwt";
import { User } from "../../users/models/User.model";
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {
  }

  async validateUser(login: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(login);
    if (user && await bcrypt.compare(pass, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: User) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload)
    };
  }
}
