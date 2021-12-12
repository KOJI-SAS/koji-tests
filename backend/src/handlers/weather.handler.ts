import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { WeatherFetchOneEvent } from 'src/shared/events';
import { HttpService } from '@nestjs/axios';
import Weather from 'src/entities/Weather';
import { lastValueFrom } from 'rxjs';

// -------------------------------------
// Find one handler --------------------
// -------------------------------------
@QueryHandler(WeatherFetchOneEvent)
export class FindOneHandler
  implements IQueryHandler<WeatherFetchOneEvent, Partial<Weather>>
{
  constructor(private readonly httpService: HttpService) {}

  async execute(event: WeatherFetchOneEvent) {
    const result = await lastValueFrom(
      this.httpService.get(
        `https://api.openweathermap.org/data/2.5/weather?id=${event.cityId}&appid=131119eef7ea7060e522074988b8e99e`,
      ),
    );
    const { weather, main, wind } = result.data;
    return {
      title: weather?.[0]?.main,
      description: weather?.[0]?.description,
      temperature: main?.temp,
      pressure: main?.pressure,
      humidity: main?.humidity,
      icon: `https://openweathermap.org/img/wn/${weather?.[0]?.icon}.png`,
      windSpeed: wind?.speed,
      windDegree: wind?.deg,
    };
  }
}
