import { BadRequestException, Injectable } from "@nestjs/common";
import { UsersService } from "../../users/services/users.service";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {
  }

  async validateUser(login: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByEmailOrUsername(login);
    if (user && await bcrypt.compare(pass, user.password)) {
      return user;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload)
    };
  }

  async getUserFromToken(token: string) {
    const newToken = token.substring(7, token.length);
    const decoded: any = this.jwtService.decode(newToken);
    if (!decoded) {
      throw new BadRequestException("Invalid user");
    }
    const user = await this.usersService.findOneByUserId(decoded.sub);
    if (!user) {
      throw new BadRequestException("Invalid user");
    }
    return { username: user.username, userId: user.userId, email: user.email };
  }
}
