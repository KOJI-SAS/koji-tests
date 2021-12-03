import {IWeatherModel} from "../../models/IWeatherModel";

export interface IWeatherHistoryProps {
    historyList : IWeatherModel[];
    city : string;
}