import { Controller, Get, InternalServerErrorException } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  get500Error(): string {
    throw new InternalServerErrorException('error!');
  }
}
