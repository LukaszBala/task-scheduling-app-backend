import { Controller, Get, Post, Query } from '@nestjs/common';
import { UsersService } from './services/users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  async getUserByName(@Query() query) {
    const res = await this.usersService.findByEmailOrUsername(query.name);
    return res.map((user) => ({ ...user, label: query.name }));
  }

  @Post('/updateColors')
  async assignColorsToUsers() {
    await this.usersService.assignColors();
  }
}
