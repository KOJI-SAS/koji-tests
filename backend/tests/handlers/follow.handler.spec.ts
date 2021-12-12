import { Test } from '@nestjs/testing';
import { CqrsModule, QueryBus } from '@nestjs/cqrs';
import {
  FollowEvent,
  UserFindOneEvent,
  CityFindOneEvent,
  FollowedCityCreateEvent,
  UserUpdateEvent,
  WeatherFetchOneEvent,
  FollowedCityWeatherCreateEvent,
  UnfollowEvent,
} from '../../src/shared/events';
import { FollowHandler } from '../../src/handlers/follow.handler';

describe('FollowHandler', () => {
  let followHandler: FollowHandler;
  let queryBus: QueryBus;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [CqrsModule],
      providers: [FollowHandler],
    }).compile();
    queryBus = moduleRef.get<QueryBus>(QueryBus);
    followHandler = moduleRef.get<FollowHandler>(FollowHandler);
  });

  describe('execute', () => {
    it('Should return newly created followed city', async () => {
      const calledEvents = [];
      jest.spyOn(queryBus, 'execute').mockImplementation((event) => {
        if (event instanceof UnfollowEvent) {
          return Promise.resolve(true);
        }
        if (event instanceof UserFindOneEvent) {
          return Promise.resolve({ id: 'one', username: 'myname' });
        }
        if (event instanceof CityFindOneEvent) {
          return Promise.resolve({ id: 100, name: 'Paris' });
        }
        if (event instanceof FollowedCityCreateEvent) {
          return Promise.resolve({ ...event.data, id: 'fcId' });
        }

        if (event instanceof UserUpdateEvent) {
          return Promise.resolve(null);
        }
        if (event instanceof WeatherFetchOneEvent) {
          return Promise.resolve({ temperature: 10 });
        }
        if (event instanceof FollowedCityWeatherCreateEvent) {
          return Promise.resolve({ id: 'fcwId' });
        }
        return Promise.reject(null);
      });
      const result = await followHandler.execute(
        new FollowEvent('cityId', 'userId'),
      );

      expect(result.id).toBe('fcId');
      expect(result.city.name).toBe('Paris');
    });
  });
});
