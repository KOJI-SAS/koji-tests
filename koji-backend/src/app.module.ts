import {Module} from '@nestjs/common';
import {HttpModule} from '@nestjs/axios';
import {WeatherController} from "./controllers/WeatherController";
import {OpenWeatherMapService} from "./services/OpenWeatherMapService";
import {JsonDataStorageService} from "./services/JsonDataStorageService";
import {ScheduleModule} from "@nestjs/schedule";

@Module({
  imports: [
      HttpModule.register({
        timeout: 5000,
        maxRedirects: 5
      })
      , ScheduleModule.forRoot()
  ],
  controllers: [WeatherController],
  providers: [
    { provide : "IOpenWeatherMapService", useClass : OpenWeatherMapService },
    { provide : "IJsonDataStorageService", useClass : JsonDataStorageService}
  ],
})
export class AppModule {}
