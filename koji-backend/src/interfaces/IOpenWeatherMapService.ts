import {Observable} from "rxjs";
import {IWeatherModel} from "../model/WeatherModel/IWeatherModel";
import {MessageModel} from "../model/MessageModel/MessageModel";

export interface IOpenWeatherMapService{
    GetWeather(city : string) : Observable<IWeatherModel | MessageModel>;
}