import {map, Observable, of} from "rxjs";
import IGeoApiService from "../interfaces/IGeoApiService";
import {IGeoApiModel} from "../models/IGeoApiModel";
import {IConfigService} from "../interfaces/IConfigService";
import {IGeoApiJson} from "../models/IGeoApiJson";
import {ajax} from "rxjs/ajax";
import {injectable, inject} from "inversify";
import {TYPES} from "../const/TYPES";



@injectable()
export class GeoApiService implements IGeoApiService{
    private apiConfig? : IGeoApiJson;

    @inject(TYPES.IConfigService) private readonly configService?: IConfigService;

    private SetConfig() {
        if (this.apiConfig == null){
            this.apiConfig = this.configService?.GetGeoApiParameters();
        }
    }

    FindCity(city: string): Observable<string[]> {
        return ajax.get(this.BuildQuery(city)).pipe(map((result)=> {
            if (result.response == null){
                return [];
            }

            let response : IGeoApiModel[] = result.response as IGeoApiModel[];
            return  response.map(p => p.nom) as string[];
        }));
    }

    private BuildQuery(city: string){
        this.SetConfig();
        return `${this.apiConfig?.url}?${this.apiConfig?.searchCityParamName}=${city}`;
    }
}