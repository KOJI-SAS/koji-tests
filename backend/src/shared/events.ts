import FollowedCityWeather from 'src/entities/FollowedCityWeather';
import FollowedCity from 'src/entities/FollowedCity';
import User from 'src/entities/User';
import City from 'src/entities/City';

// ------------------------------------------
// User -------------------------------------
// ------------------------------------------

export class UserCreateEvent {
  constructor(public readonly data: Partial<User>) {}
}

export class UserUpdateEvent {
  constructor(
    public readonly id: string,
    public readonly data: Partial<User>,
  ) {}
}

export class UserDeleteEvent {
  constructor(public readonly id: string) {}
}

export class UserFindOneEvent {
  constructor(public readonly id: string) {}
}

export class UserFindEvent {
  constructor(public readonly filter: Partial<User>) {}
}

// ------------------------------------------
// FollowedCity -------------------------------
// ------------------------------------------

export class FollowedCityCreateEvent {
  constructor(public readonly data: Partial<FollowedCity>) {}
}

export class FollowedCityUpdateEvent {
  constructor(
    public readonly id: string,
    public readonly data: Partial<FollowedCity>,
  ) {}
}

export class FollowedCityDeleteEvent {
  constructor(public readonly id: string) {}
}

export class FollowedCityFindOneEvent {
  constructor(public readonly id: string) {}
}

export class FollowedCityFindEvent {
  constructor(public readonly filter: Partial<FollowedCity>) {}
}

// ------------------------------------------
// FollowedCityWeather ------------------------------
// ------------------------------------------

export class FollowedCityWeatherCreateEvent {
  constructor(public readonly data: Partial<FollowedCityWeather>) {}
}

export class FollowedCityWeatherUpdateEvent {
  constructor(
    public readonly id: string,
    public readonly data: Partial<FollowedCityWeather>,
  ) {}
}

export class FollowedCityWeatherDeleteEvent {
  constructor(public readonly id: string) {}
}

export class FollowedCityWeatherFindOneEvent {
  constructor(public readonly id: string) {}
}

export class FollowedCityWeatherFindEvent {
  constructor(public readonly filter: Partial<FollowedCityWeather>) {}
}

// ------------------------------------------
// FollowedCity -------------------------------
// ------------------------------------------

export class CityCreateEvent {
  constructor(public readonly data: Partial<City>) {}
}

export class CityUpdateEvent {
  constructor(
    public readonly id: string,
    public readonly data: Partial<City>,
  ) {}
}

export class CityDeleteEvent {
  constructor(public readonly id: string) {}
}

export class CityFindOneEvent {
  constructor(public readonly id: string) {}
}

export class CityFindEvent {
  constructor(
    public readonly filter: Partial<City>,
    public readonly offset?: number,
    public readonly limit?: number,
  ) {}
}

// ------------------------------------------
// Weather -- -------------------------------
// ------------------------------------------

export class WeatherFetchOneEvent {
  constructor(public readonly cityId: string) {}
}

// ------------------------------------------
// Actions ----------------------------------
// ------------------------------------------

export class LoginEvent {
  constructor(public readonly username: string) {}
}

export class FollowEvent {
  constructor(public readonly cityId: string, public readonly userId: string) {}
}

export class UnfollowEvent {
  constructor(public readonly userId: string) {}
}
