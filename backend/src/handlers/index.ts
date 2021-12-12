import { LoginHandler } from './login.handler';
import { FollowHandler } from './follow.handler';
import * as FollowedCityHandlers from './followedCity.handler';
import * as UserHandlers from './user.handler';
import * as FollowedCityWeatherHandlers from './followedCityWeather.handler';
import * as CityHandlers from './city.handler';
import * as WeatherHandlers from './weather.handler';
import { UnfollowHandler } from './unfollow.handler';

export default [
  LoginHandler,
  FollowHandler,
  UnfollowHandler,
  ...Object.values(UserHandlers),
  ...Object.values(FollowedCityHandlers),
  ...Object.values(FollowedCityWeatherHandlers),
  ...Object.values(CityHandlers),
  ...Object.values(WeatherHandlers),
];
