import { Controller, Req, Post, Get, Body, UseGuards } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { LoginEvent, UserFindOneEvent } from 'src/shared/events';
import { AuthGuard } from 'src/shared/guards';

class LoginDTO {
  username: string;
}

@Controller('auth')
export class AuthController {
  constructor(private readonly bus: QueryBus) {}

  @Post('login')
  login(@Body() data: LoginDTO) {
    return this.bus.execute(new LoginEvent(data.username));
  }

  @Get('userinfo')
  @UseGuards(AuthGuard)
  userInfo(@Req() request) {
    return this.bus.execute(new UserFindOneEvent(request.userId));
  }
}
