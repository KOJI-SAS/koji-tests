import { Controller, Post, UseGuards, Req, Param } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { FollowEvent, UnfollowEvent } from 'src/shared/events';
import { AuthGuard } from 'src/shared/guards';

@Controller('actions')
export class ActionController {
  constructor(private readonly bus: QueryBus) {}

  @Post('follow/:cityId')
  @UseGuards(AuthGuard)
  followCity(@Param('cityId') cityId: string, @Req() request) {
    return this.bus.execute(new FollowEvent(cityId, request.userId));
  }

  @Post('unfollow')
  @UseGuards(AuthGuard)
  unfollow(@Req() request) {
    return this.bus.execute(new UnfollowEvent(request.userId));
  }
}
