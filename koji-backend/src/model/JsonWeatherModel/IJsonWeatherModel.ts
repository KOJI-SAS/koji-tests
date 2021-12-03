import {IWeatherModel} from "../WeatherModel/IWeatherModel";

export interface IJsonWeatherModel{
    isTracking : boolean;
    city : string;
    weather : Array<IWeatherModel>;
}