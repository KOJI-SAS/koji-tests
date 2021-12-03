import {Body, Controller, Delete, Get, Inject, Logger, Param, Post} from "@nestjs/common";
import {IOpenWeatherMapService} from "../interfaces/IOpenWeatherMapService";
import {IOpenWeatherMap} from "../model/OpenWeatherMapModel/IOpenWeatherMap";
import {map, Observable, of} from "rxjs";
import {IWeatherModel} from "../model/WeatherModel/IWeatherModel";
import {IJsonDataStorageService} from "../interfaces/IJsonDataStorageService";
import {Cron, SchedulerRegistry} from "@nestjs/schedule";
import {IGetWeatherBody} from "../model/GetWeatherBody/IGetWeatherBody";
import {MessageModel} from "../model/MessageModel/MessageModel";


@Controller("weather")
export class WeatherController {
    private weather: IOpenWeatherMap;
    private cronName : string = "history";
    private readonly logger = new Logger(WeatherController.name);

    constructor(@Inject("IOpenWeatherMapService") private readonly openWeatherMapService: IOpenWeatherMapService
                , @Inject("IJsonDataStorageService") private readonly jsonDataStorageService: IJsonDataStorageService
                , private schedulerRegistry : SchedulerRegistry
    ) {

    }

    @Post("getWeather")
    getWeatherByCity(@Body() getWeatherBody : IGetWeatherBody): Observable<IWeatherModel | MessageModel>{

        if (getWeatherBody != null){
            let city : string = getWeatherBody.city;
            let uuid : string = getWeatherBody.uuid;

            return this.openWeatherMapService.GetWeather(city).pipe( map(weather => {
                if (weather instanceof  MessageModel){
                    return weather;
                }

                this.jsonDataStorageService.GetCityCurrentlyTracked(uuid).subscribe(result =>{

                    if (result){
                        if (result.city != city){
                            this.jsonDataStorageService.DeleteFollowedCityHistory(uuid);
                            this.jsonDataStorageService.AddWeather(uuid, weather as IWeatherModel);
                        }

                    }else {
                        this.jsonDataStorageService.AddWeather(uuid, weather as IWeatherModel);
                    }

                })
                return weather as IWeatherModel;
            }));
        }

        return ;
    }



    @Post("getWeatherHistory")
    getWeatherHistory(@Body() getWeatherBody : IGetWeatherBody): Observable<IWeatherModel[]>{
        if (getWeatherBody != null) {
            let uuid: string = getWeatherBody.uuid;
            return this.jsonDataStorageService.GetWeatherHistory(uuid);
        }
    }



    @Delete("deleteWeather/:uuid")
    deleteWeatherByUserId(@Param("uuid") uuid: string) : void {
        this.jsonDataStorageService.DeleteFollowedCityHistory(uuid);
    }


    @Cron("*/10 * * * *", {
        name : 'history'
    })
    private TrackWeather(){
        try{
            this.jsonDataStorageService.GetFiles().subscribe((filesData) => {
                for (let fileDataKey in filesData) {
                    this.GetAndStoreWeatherData(filesData[fileDataKey].fileData.city, filesData[fileDataKey].uuid);
                }
            } );
            this.logger.log("Cron Executed");


        }catch (e) {
            this.logger.error(e);
        }
    }

    private GetAndStoreWeatherData(city : string, uuid : string){
        this.openWeatherMapService.GetWeather(city).subscribe(weather => {
            if (weather instanceof MessageModel){
                this.logger.log(weather)
            }else {
                this.jsonDataStorageService.AddWeather(uuid, weather as IWeatherModel);
            }
        });
    }
}