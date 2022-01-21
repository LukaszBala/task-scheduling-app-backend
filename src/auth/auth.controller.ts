import {
  Body,
  ConflictException,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Public } from '../public';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthService } from './services/auth.service';
import { UsersService } from '../users/services/users.service';
import { RegisterModel } from './models/register.model';

@Controller('auth/')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UsersService,
  ) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req) {
    return this.authService.login(req.user); // LocalAuthGuard maps to user
  }

  @Get('user')
  async getUser(@Req() req) {
    return this.authService.getUserFromToken(req.headers.authorization);
  }

  @Get('profile')
  getProfile(@Req() req) {
    return req.user;
  }

  @Public()
  @Post('register')
  async register(@Body() registerDto: RegisterModel) {
    let exist = await this.userService.existsByUsername(registerDto.username);
    if (exist) {
      throw new ConflictException(
        `username: ${registerDto.username} is existed`,
      );
    }
    exist = await this.userService.existsByEmail(registerDto.email);
    if (exist) {
      throw new ConflictException(`email:${registerDto.email} is existed`);
    }
    await this.userService.register(registerDto);
  }
}
