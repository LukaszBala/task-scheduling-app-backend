import { Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { AppService } from "./app.service";
import { LocalAuthGuard } from "./auth/guards/local-auth.guard";
import { AuthService } from "./auth/services/auth.service";
import { JwtAuthGuard } from "./auth/guards/jwt-auth.guard";
import { Public } from "./public";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private authService: AuthService
  ) {
  }

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post("auth/login")
  async login(@Req() req) {
    return this.authService.login(req.user);
  }

  @Get("profile")
  getProfile(@Req() req) {
    return req.user;
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
