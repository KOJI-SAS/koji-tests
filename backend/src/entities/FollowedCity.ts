import City from './City';
import FollowedCityWeather from './FollowedCityWeather';
import _Entity from './_Entity';

export default class FollowedCity extends _Entity {
  city: City;
  weathers: FollowedCityWeather[];
}
