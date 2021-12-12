import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  Put,
  Get,
} from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import FollowedCity from 'src/entities/FollowedCity';
import {
  FollowedCityFindEvent,
  FollowedCityCreateEvent,
  FollowedCityUpdateEvent,
  FollowedCityDeleteEvent,
  FollowedCityFindOneEvent,
} from 'src/shared/events';

@Controller('followedCities')
export class FollowedCityController {
  constructor(private readonly bus: QueryBus) {}

  @Post()
  create(@Body() data: FollowedCity) {
    return this.bus.execute(new FollowedCityCreateEvent(data));
  }

  @Put(':id')
  update(@Param('id') id, @Body() data: Partial<FollowedCity>) {
    return this.bus.execute(new FollowedCityUpdateEvent(id, data));
  }

  @Delete(':id')
  delete(@Param('id') id) {
    return this.bus.execute(new FollowedCityDeleteEvent(id));
  }

  @Post('search')
  findAll(@Body() data: Partial<FollowedCity>) {
    return this.bus.execute(new FollowedCityFindEvent(data));
  }

  @Get(':id')
  findOne(@Param('id') id) {
    return this.bus.execute(new FollowedCityFindOneEvent(id));
  }
}
