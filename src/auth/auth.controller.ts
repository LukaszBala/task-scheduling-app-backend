import { Body, ConflictException, Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { Public } from "../public";
import { LocalAuthGuard } from "./guards/local-auth.guard";
import { AuthService } from "./services/auth.service";
import { UsersService } from "../users/services/users.service";
import { RegisterModel } from "./models/register.model";
import { User } from "../users/models/User.model";
import { LoginModel } from "./models/login.model";

@Controller("auth/")
export class AuthController {

  constructor(private authService: AuthService, private userService: UsersService) {
  }

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post("login")
  async login(@Body() user: LoginModel) {
    return this.authService.login(user as unknown as User); // LocalAuthGuard to mapuje na usera
  }

  @Get("profile")
  getProfile(@Req() req) {
    return req.user;
  }

  @Public()
  @Post("register")
  async register(
    @Body() registerDto: RegisterModel) {
    let exist = await this.userService.existsByUsername(registerDto.username);
    if (exist) {
      throw new ConflictException(`username: ${registerDto.username} is existed`);
    }
    exist = await this.userService.existsByEmail(registerDto.email);
    if (exist) {
      throw new ConflictException(`email:${registerDto.email} is existed`);
    }
    const res = await this.userService.register(registerDto);
    return res ? "Successfully created user" : "Not that successful";
  }

}
