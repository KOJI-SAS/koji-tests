interface _Entity {
  id: string;
  createdAt: number;
  updatedAt: number;
}

export interface User extends _Entity {
  username: string;
  followedCityId: string;
}

export interface FollowedCity extends _Entity {
  city: City;
  weathers: FollowedCityWeather[];
}

export interface FollowedCityWeather extends _Entity {
  followedCityId: string;
  cityId: string;
  title: string;
  description: string;
  temperature: number;
  windSpeed: number;
  windDegree: number;
  pressure: number;
  humidity: number;
  icon: string;
  date?: string;
}

export interface City {
  id: number;
  name: string;
}
