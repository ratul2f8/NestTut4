import { Controller, Get, Request, UseGuards, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { JWTAuthGuard } from './auth/jwt-auth.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  postLogin(@Request() req): string{
    return req.user;
  }

  @UseGuards(JWTAuthGuard)
  @Get('protected')
  getProtected(@Request() req): string{
    return req.user;
  }
  
}
