import { IQueryHandler, QueryHandler, QueryBus } from '@nestjs/cqrs';
import {
  CityFindOneEvent,
  FollowedCityCreateEvent,
  FollowedCityWeatherCreateEvent,
  FollowEvent,
  UnfollowEvent,
  UserUpdateEvent,
  WeatherFetchOneEvent,
} from '../shared/events';
import FollowedCity from '../entities/FollowedCity';

@QueryHandler(FollowEvent)
export class FollowHandler implements IQueryHandler<FollowEvent, FollowedCity> {
  constructor(private readonly bus: QueryBus) {}

  async execute(event: FollowEvent) {
    const { cityId, userId } = event;
    // Unfollow current city
    await this.bus.execute(new UnfollowEvent(userId));
    /* ========== CREATE NEW FOLLOWED CITY  =========== */
    const city = await this.bus.execute(new CityFindOneEvent(cityId));
    const followedCity = await this.bus.execute(
      new FollowedCityCreateEvent({ city, weathers: [] }),
    );

    /* ========== UPDATE USER ======================= */
    await this.bus.execute(
      new UserUpdateEvent(userId, { followedCityId: followedCity.id }),
    );
    /* ========== ADD ONE LINE OF WEATHER =========== */
    const weather = await this.bus.execute(new WeatherFetchOneEvent(cityId));
    const followedCityWeather = await this.bus.execute(
      new FollowedCityWeatherCreateEvent({
        ...weather,
        followedCityId: followedCity.id,
        cityId,
      }),
    );
    return { ...followedCity, weathers: [followedCityWeather] };
  }
}
