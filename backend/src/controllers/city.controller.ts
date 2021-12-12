import { Body, Controller, Post } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import City from 'src/entities/City';
import { CityFindEvent } from 'src/shared/events';

@Controller('cities')
export class CityController {
  constructor(private readonly bus: QueryBus) {}

  @Post('search')
  findAll(@Body() data: Partial<City>) {
    return this.bus.execute(new CityFindEvent(data));
  }
}
