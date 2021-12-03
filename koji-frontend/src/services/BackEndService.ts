import {inject, injectable} from "inversify";
import {TYPES} from "../const/TYPES";
import {IConfigService} from "../interfaces/IConfigService";
import {IBackEndService} from "../interfaces/IBackEndService";
import {catchError, map, Observable, of} from "rxjs";
import {IWeatherModel} from "../models/IWeatherModel";
import {IBackEndJson} from "../models/IBackEndJson";
import {ajax} from "rxjs/ajax";
import {IGetWeatherBody} from "../models/IGetWeatherBody";
import axios from "axios";
import {MessageModel} from "../models/MessageModel";


@injectable()
export class BackEndService implements IBackEndService{
    @inject(TYPES.IConfigService) private readonly configService?: IConfigService;

    private backEndConfig? : IBackEndJson;


    public GetWeather(city: string, uuid: string): Observable<IWeatherModel | MessageModel> {
        return ajax.post(this.GetWeatherQuery(), this.GetWeatherBody(city, uuid)).pipe(map((result)=> {
            if (result instanceof MessageModel){
                return result.response as MessageModel;
            }

            return  result.response as IWeatherModel;
        })
        , catchError((error) => {
            return of(this.SetErrorMessage(error));
        }));
    }

    public GetWeatherHistory(uuid: string): Observable<IWeatherModel[] | MessageModel> {
        return ajax.post(this.GetWeatherHistoryQuery(), this.GetWeatherBody("", uuid)).pipe(
            map((result)=> {
                if (result instanceof MessageModel){
                    return result.response as MessageModel;
                }

                return  result.response as IWeatherModel[];
            })
            , catchError((error) => {
                return of(this.SetErrorMessage(error));
            })

        );;
    }

    public DeleteWeatherHistory(uuid :string) : Observable<boolean | MessageModel>{
        let done : boolean = false;
         axios.delete(this.DeleteWeatherHistoryQuery(uuid)).then(
             response => {
                done = response.status == 200;
             }
             , (error) => {
                 return of(this.SetErrorMessage(error));
             }
         );

        return of(done);
    }

    private GetWeatherQuery(): string {
        this.SetBackEndConfig();
        return `${this.backEndConfig?.url}${this.backEndConfig?.weather}${this.backEndConfig?.getWeather}`;
    }

    private DeleteWeatherHistoryQuery(uuid : string): string {
        this.SetBackEndConfig();
        //TODO DE SES MORTS
        return `${this.backEndConfig?.url}${this.backEndConfig?.weather}${this.backEndConfig?.deleteWeatherHistory}/${uuid}`;
    }

    private GetWeatherHistoryQuery(): string {
        this.SetBackEndConfig();
        return `${this.backEndConfig?.url}${this.backEndConfig?.weather}${this.backEndConfig?.getWeatherHistory}`;
    }

    private GetWeatherBody(city: string, uuid: string) : IGetWeatherBody{
        return {
            city : city,
            uuid : uuid
        }
    }

    private SetBackEndConfig(){
        if (this.backEndConfig == null){
            this.backEndConfig = this.configService?.GetBackEndApiParameters();
        }
    }

    private SetErrorMessage(error : any) : MessageModel{
        if (error.message == "ajax error")
            error.message = "Error from server, please retry later";

        return {
            status : error.status,
            message : error.message
        } as MessageModel
    }

}