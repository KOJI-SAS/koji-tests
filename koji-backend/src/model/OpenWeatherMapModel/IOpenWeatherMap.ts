import {IWeather} from "./IWeather";
import {ITemperature} from "./ITemperature";

export interface IOpenWeatherMap {
    weather : IWeather[];
    main : ITemperature;
}