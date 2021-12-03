import {Observable} from "rxjs";
import {IWeatherModel} from "../models/IWeatherModel";
import {MessageModel} from "../models/MessageModel";

export interface IBackEndService {
    GetWeather(city : string, uuid : string ) : Observable<IWeatherModel | MessageModel>;
    GetWeatherHistory(uuid : string) : Observable<IWeatherModel[] | MessageModel>;
    DeleteWeatherHistory(uuid : string) : Observable<boolean | MessageModel>;
}