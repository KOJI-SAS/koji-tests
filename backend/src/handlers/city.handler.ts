import cities from '../shared/data/french-cities.min.json';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { CityFindEvent, CityFindOneEvent } from 'src/shared/events';
import City from 'src/entities/City';

// -------------------------------------
// Find one handler --------------------
// -------------------------------------
@QueryHandler(CityFindOneEvent)
export class FindOneHandler implements IQueryHandler<CityFindOneEvent, City> {
  async execute(event: CityFindOneEvent) {
    return cities.find((city: any) => city.id.toString() === event.id);
  }
}

// -------------------------------------
// Find handler ------------------------
// -------------------------------------

@QueryHandler(CityFindEvent)
export class FindHandler implements IQueryHandler<CityFindEvent, City[]> {
  async execute(event: CityFindEvent) {
    return cities
      .filter((current) =>
        Object.keys(event.filter).reduce(
          (acc: boolean, filterKey: string) =>
            acc &&
            current[filterKey]
              .toLowerCase()
              .includes(event.filter[filterKey].toLowerCase()),
          true,
        ),
      )
      .slice(event.offset || 0, (event.limit || 100) + 1);
  }
}
