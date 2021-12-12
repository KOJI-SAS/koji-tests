import { InMemoryDBService } from '@nestjs-addons/in-memory-db';
import { IQueryHandler, QueryBus, QueryHandler } from '@nestjs/cqrs';
import {
  FollowedCityCreateEvent,
  FollowedCityDeleteEvent,
  FollowedCityFindEvent,
  FollowedCityFindOneEvent,
  FollowedCityUpdateEvent,
  FollowedCityWeatherFindEvent,
} from 'src/shared/events';
import FollowedCity from 'src/entities/FollowedCity';

// -------------------------------------
// Create handler ----------------------
// -------------------------------------
@QueryHandler(FollowedCityCreateEvent)
export class CreateHandler
  implements IQueryHandler<FollowedCityCreateEvent, FollowedCity>
{
  constructor(private readonly repository: InMemoryDBService<FollowedCity>) {}

  async execute(event: FollowedCityCreateEvent) {
    return this.repository.create({
      ...event.data,
      __type: 'FollowedCity',
      createdAt: Math.floor(new Date().getTime() / 1000),
    });
  }
}

// -------------------------------------
// Update handler ----------------------
// -------------------------------------
@QueryHandler(FollowedCityUpdateEvent)
export class UpdateHandler
  implements IQueryHandler<FollowedCityUpdateEvent, void>
{
  constructor(private readonly repository: InMemoryDBService<FollowedCity>) {}

  async execute(event: FollowedCityUpdateEvent) {
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

@QueryHandler(FollowedCityDeleteEvent)
export class DeleteHandler
  implements IQueryHandler<FollowedCityDeleteEvent, void>
{
  constructor(private readonly repository: InMemoryDBService<FollowedCity>) {}

  async execute(event: FollowedCityDeleteEvent) {
    return this.repository.delete(event.id);
  }
}

// -------------------------------------
// Find one handler --------------------
// -------------------------------------
@QueryHandler(FollowedCityFindOneEvent)
export class FindOneHandler
  implements IQueryHandler<FollowedCityFindOneEvent, FollowedCity>
{
  constructor(
    private readonly repository: InMemoryDBService<FollowedCity>,
    private readonly bus: QueryBus,
  ) {}

  async execute(event: FollowedCityFindOneEvent) {
    const followedCity = await this.repository.get(event.id);
    if (!followedCity) return followedCity;
    const weathers = await this.bus.execute(
      new FollowedCityWeatherFindEvent({
        followedCityId: followedCity.id,
      }),
    );
    return { ...followedCity, weathers };
  }
}

// -------------------------------------
// Find handler ------------------------
// -------------------------------------

@QueryHandler(FollowedCityFindEvent)
export class FindHandler
  implements IQueryHandler<FollowedCityFindEvent, FollowedCity[]>
{
  constructor(private readonly repository: InMemoryDBService<FollowedCity>) {}

  async execute(event: FollowedCityFindEvent) {
    return this.repository.query(
      (current) =>
        current.__type === 'FollowedCity' &&
        Object.keys(event.filter).reduce(
          (acc: boolean, filterKey: string) =>
            acc && current[filterKey] === event.filter[filterKey],
          true,
        ),
    );
  }
}
