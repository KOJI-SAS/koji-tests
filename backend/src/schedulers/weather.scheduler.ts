import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { QueryBus } from '@nestjs/cqrs';
import {
  FollowedCityFindEvent,
  FollowedCityWeatherCreateEvent,
  WeatherFetchOneEvent,
} from 'src/shared/events';
import FollowedCity from 'src/entities/FollowedCity';

@Injectable()
export class WeatherScheduler {
  constructor(private readonly bus: QueryBus) {}

  @Cron(CronExpression.EVERY_10_MINUTES)
  async updateWeather() {
    const followedCities: FollowedCity[] = await this.bus.execute(
      new FollowedCityFindEvent({}),
    );
    // Create followedcityweather for each followed city
    followedCities.forEach(async (followedCity) => {
      const weather = await this.bus.execute(
        new WeatherFetchOneEvent(followedCity.city.id.toString()),
      );
      this.bus.execute(
        new FollowedCityWeatherCreateEvent({
          ...weather,
          followedCityId: followedCity.id,
          cityId: followedCity.city.id.toString(),
        }),
      );
    });
  }
}
