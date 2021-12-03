import {IWeatherModel} from "../model/WeatherModel/IWeatherModel";
import {Observable} from "rxjs";
import {IJsonWeatherModel} from "../model/JsonWeatherModel/IJsonWeatherModel";
import {IFilesWeatherModel} from "../model/FilesWeatherModel/IFilesWeatherModel";

export interface IJsonDataStorageService {
    GetWeather(uuid : string) :  Observable<IWeatherModel>;
    GetWeatherHistory(uuid : string) : Observable<IWeatherModel[]>;
    AddWeather(uuid : string, weather : IWeatherModel) : void;
    DeleteFollowedCityHistory(uuid : string) : void;
    GetCityCurrentlyTracked(uuid : string) : Observable<IJsonWeatherModel>;
    GetFiles() : Observable<IFilesWeatherModel[]>;
}