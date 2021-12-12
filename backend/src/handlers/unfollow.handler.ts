import { IQueryHandler, QueryHandler, QueryBus } from '@nestjs/cqrs';
import {
  FollowedCityDeleteEvent,
  FollowedCityWeatherDeleteEvent,
  FollowedCityWeatherFindEvent,
  UnfollowEvent,
  UserFindOneEvent,
  UserUpdateEvent,
} from '../shared/events';
import FollowedCityWeather from '../entities/FollowedCityWeather';

@QueryHandler(UnfollowEvent)
export class UnfollowHandler implements IQueryHandler<UnfollowEvent, void> {
  constructor(private readonly bus: QueryBus) {}

  async execute(event: UnfollowEvent) {
    const { userId } = event;
    const user = await this.bus.execute(new UserFindOneEvent(userId));
    if (!user.followedCityId) {
      return;
    }

    // Delete old followed city
    await this.bus.execute(new FollowedCityDeleteEvent(user.followedCityId));
    // Delete old history
    const weathers: FollowedCityWeather[] = await this.bus.execute(
      new FollowedCityWeatherFindEvent({
        followedCityId: user.followedCityId,
      }),
    );
    await Promise.all(
      weathers.map((weather) =>
        this.bus.execute(new FollowedCityWeatherDeleteEvent(weather.id)),
      ),
    );

    await this.bus.execute(
      new UserUpdateEvent(userId, { followedCityId: undefined }),
    );
  }
}
