import { InMemoryDBService } from '@nestjs-addons/in-memory-db';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import {
  FollowedCityWeatherCreateEvent,
  FollowedCityWeatherDeleteEvent,
  FollowedCityWeatherFindEvent,
  FollowedCityWeatherFindOneEvent,
  FollowedCityWeatherUpdateEvent,
} from 'src/shared/events';
import FollowedCityWeather from 'src/entities/FollowedCityWeather';

// -------------------------------------
// Create handler ----------------------
// -------------------------------------
@QueryHandler(FollowedCityWeatherCreateEvent)
export class CreateHandler
  implements IQueryHandler<FollowedCityWeatherCreateEvent, FollowedCityWeather>
{
  constructor(
    private readonly repository: InMemoryDBService<FollowedCityWeather>,
  ) {}

  async execute(event: FollowedCityWeatherCreateEvent) {
    return this.repository.create({
      ...event.data,
      __type: 'FollowedCityWeather',
      createdAt: Math.floor(new Date().getTime() / 1000),
    });
  }
}

// -------------------------------------
// Update handler ----------------------
// -------------------------------------
@QueryHandler(FollowedCityWeatherUpdateEvent)
export class UpdateHandler
  implements IQueryHandler<FollowedCityWeatherUpdateEvent, void>
{
  constructor(
    private readonly repository: InMemoryDBService<FollowedCityWeather>,
  ) {}

  async execute(event: FollowedCityWeatherUpdateEvent) {
    const record = this.repository.get(event.id);
    Object.keys(event.data).forEach((key) => {
      record[key] = event.data[key];
    });
    return this.repository.update({
      ...record,
      updatedAt: Math.floor(new Date().getTime() / 1000),
    });
  }
}

// -------------------------------------
// Delete handler ----------------------
// -------------------------------------

@QueryHandler(FollowedCityWeatherDeleteEvent)
export class DeleteHandler
  implements IQueryHandler<FollowedCityWeatherDeleteEvent, void>
{
  constructor(
    private readonly repository: InMemoryDBService<FollowedCityWeather>,
  ) {}

  async execute(event: FollowedCityWeatherDeleteEvent) {
    return this.repository.delete(event.id);
  }
}

// -------------------------------------
// Find one handler --------------------
// -------------------------------------
@QueryHandler(FollowedCityWeatherFindOneEvent)
export class FindOneHandler
  implements
    IQueryHandler<FollowedCityWeatherFindOneEvent, FollowedCityWeather>
{
  constructor(
    private readonly repository: InMemoryDBService<FollowedCityWeather>,
  ) {}

  async execute(event: FollowedCityWeatherFindOneEvent) {
    return this.repository.get(event.id);
  }
}

// -------------------------------------
// Find handler ------------------------
// -------------------------------------

@QueryHandler(FollowedCityWeatherFindEvent)
export class FindHandler
  implements IQueryHandler<FollowedCityWeatherFindEvent, FollowedCityWeather[]>
{
  constructor(
    private readonly repository: InMemoryDBService<FollowedCityWeather>,
  ) {}

  async execute(event: FollowedCityWeatherFindEvent) {
    return this.repository.query(
      (current) =>
        current.__type === 'FollowedCityWeather' &&
        Object.keys(event.filter).reduce(
          (acc: boolean, filterKey: string) =>
            acc && current[filterKey] === event.filter[filterKey],
          true,
        ),
    );
  }
}
