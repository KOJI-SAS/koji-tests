import IGeoApiService from "../../interfaces/IGeoApiService";
import {IBackEndService} from "../../interfaces/IBackEndService";
import {ICookieService} from "../../interfaces/ICookieService";

export interface ISearchCityProps {
    geoApiService : IGeoApiService;
    backEndService : IBackEndService;
    cookieService : ICookieService;
}