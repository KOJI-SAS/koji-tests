import {IConfigService} from "../interfaces/IConfigService";
import {IGeoApiJson} from "../models/IGeoApiJson";
import config from '../config/config.json';
import {injectable} from "inversify";
import {IBackEndJson} from "../models/IBackEndJson";



@injectable()
export class ConfigService implements IConfigService{
    GetGeoApiParameters(): IGeoApiJson {
        return {
            url : config.geoApi.url,
            searchCityParamName : config.geoApi.searchCityParamName
        };
    }

    GetBackEndApiParameters(): IBackEndJson {
        return {
            url : config.backend.url,
            weather : config.backend.weather,
            getWeather : config.backend.getWeather,
            getWeatherHistory : config.backend.getWeatherHistory,
            deleteWeatherHistory : config.backend.deleteWeatherHistory
        };
    }

}