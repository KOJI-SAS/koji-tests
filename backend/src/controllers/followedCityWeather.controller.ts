import { Body, Controller, Delete, Param, Post, Put } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import FollowedCityWeather from 'src/entities/FollowedCityWeather';
import {
  FollowedCityWeatherFindEvent,
  FollowedCityWeatherCreateEvent,
  FollowedCityWeatherUpdateEvent,
  FollowedCityWeatherDeleteEvent,
} from 'src/shared/events';

@Controller('followedCityWeathers')
export class FollowedCityWeatherController {
  constructor(private readonly bus: QueryBus) {}

  @Post()
  create(@Body() data: FollowedCityWeather) {
    return this.bus.execute(new FollowedCityWeatherCreateEvent(data));
  }

  @Put(':id')
  update(@Param('id') id, @Body() data: Partial<FollowedCityWeather>) {
    return this.bus.execute(new FollowedCityWeatherUpdateEvent(id, data));
  }

  @Delete(':id')
  delete(@Param('id') id) {
    return this.bus.execute(new FollowedCityWeatherDeleteEvent(id));
  }

  @Post('search')
  findAll(@Body() data: Partial<FollowedCityWeather>) {
    return this.bus.execute(new FollowedCityWeatherFindEvent(data));
  }
}
