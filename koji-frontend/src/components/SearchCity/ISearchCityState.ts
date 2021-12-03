import {IWeatherModel} from "../../models/IWeatherModel";

export interface ISearchCityState {
    selected : any;
    isLoading : boolean;
    hasCity : boolean;
    options : Array<any>;
    weather : IWeatherModel;
    historyList : IWeatherModel[];
}