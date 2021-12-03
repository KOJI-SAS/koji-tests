import {IJsonWeatherModel} from "../JsonWeatherModel/IJsonWeatherModel";

export interface IFilesWeatherModel {
    uuid : string;
    fileData :IJsonWeatherModel;
}