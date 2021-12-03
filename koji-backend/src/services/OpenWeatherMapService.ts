import {Inject, Injectable, Logger} from "@nestjs/common";
import {HttpService} from "@nestjs/axios";
import { AxiosResponse} from "axios";
import {catchError, map, Observable, of} from "rxjs";
import {IOpenWeatherMap} from "../model/OpenWeatherMapModel/IOpenWeatherMap";
import {IOpenWeatherMapService} from "../interfaces/IOpenWeatherMapService";
import * as json from "../../config/config.json";
import {IWeather} from "../model/OpenWeatherMapModel/IWeather";
import {IWeatherModel} from "../model/WeatherModel/IWeatherModel";
import {Util} from "../util/util";
import {MessageModel} from "../model/MessageModel/MessageModel";
import {MessageType} from "../model/MessageModel/MessageType";

@Injectable()
export class OpenWeatherMapService implements IOpenWeatherMapService{
//{"cod":401, "message": "Invalid API key. Please see http://openweathermap.org/faq#error401 for more info."}
    private readonly logger = new Logger(OpenWeatherMapService.name);
    private apiKey : string;
    private cityParameterName : string;
    private apiKeyParameterName : string;
    private apiUrl : string;
    private iconUrlStart : string;
    private iconUrlEnd4x : string;


    constructor(private httpService : HttpService) {
        this.apiKey = json.openWeatherMap.apiKey;
        this.cityParameterName = json.openWeatherMap.cityParameterName;
        this.apiKeyParameterName = json.openWeatherMap.apiKeyParameterName;
        this.apiUrl = json.openWeatherMap.apiUrl;
        this.iconUrlStart = json.openWeatherMap.iconUrlStart;
        this.iconUrlEnd4x = json.openWeatherMap.iconUrlEnd4x;
    }

    private BuildQuery(city : string): string{
        return `${this.apiUrl}?${this.cityParameterName}=${city}&${this.apiKeyParameterName}=${this.apiKey}`;
    }

    private ConvertToIOpenWeatherMap(city : string, openWeatherMap : IOpenWeatherMap) : IWeatherModel{
        let weather : IWeather;
        if (this.AreOpenWeatherMapDataOk(openWeatherMap)){
            weather = openWeatherMap.weather[0];

            return {
                city : city,
                weather : weather.main,
                weatherDescription : weather.description,
                date : new Date().toISOString(),
                id : weather.id,
                iconUrl :  `${this.iconUrlStart}${weather.icon}${this.iconUrlEnd4x}`,
                temperature : Util.KelvinToCelcius(openWeatherMap.main.temp, 2),
            }
        }

        return null;
    }

    private AreOpenWeatherMapDataOk(openWeatherMap : IOpenWeatherMap): boolean{
        if (openWeatherMap == null){
            return false;
        }

        if (openWeatherMap.weather == null){
            return false;
        }

        if (!Array.isArray(openWeatherMap.weather)){
            return false;
        }

        if (openWeatherMap.main == null){
            return false;
        }

        return true;
    }

    public GetWeather(city: string): Observable<IWeatherModel | MessageModel > {
        try {
            return this.httpService.get(this.BuildQuery(city)).pipe(
                map(axiosResponse => {
                    if (axiosResponse.status >= 200 && axiosResponse.status <= 299){
                        return this.ConvertToIOpenWeatherMap(city, axiosResponse.data as IOpenWeatherMap);
                    }
                })
                , catchError((error) => {
                    this.logger.error(error);
                    return of({
                        status : error.status,
                        type : MessageType.ERROR,
                        message : error.message
                    } as MessageModel);
                })
            );
        }catch (e) {
            this.logger.error(e);
        }
    }

}