import {IJsonDataStorageService} from "../interfaces/IJsonDataStorageService";
import {IWeatherModel} from "../model/WeatherModel/IWeatherModel";
import {map, Observable, of} from "rxjs";
import * as confingJson from "../../config/config.json";
import * as fs from "fs";
import {Logger} from "@nestjs/common";
import {IJsonWeatherModel} from "../model/JsonWeatherModel/IJsonWeatherModel";
import {IFilesWeatherModel} from "../model/FilesWeatherModel/IFilesWeatherModel";

export class JsonDataStorageService implements IJsonDataStorageService{
    private readonly logger = new Logger(JsonDataStorageService.name);
    private basePath : string;

    constructor() {
        this.basePath = confingJson.jsonStorage.basePath;
    }

    public GetWeather(uuid: string): Observable<IWeatherModel> {
        let data = this.GetFromFile(uuid);
        if (this.CheckFileData(data)){
            return of(data.weather.pop());
        }
        return ;
    }

    public GetWeatherHistory(uuid: string): Observable<IWeatherModel[]> {
        let data = this.GetFromFile(uuid);
        if (this.CheckFileData(data)){
            return of(data.weather);
        }
        return ;
    }

    public AddWeather(uuid: string, weather: IWeatherModel): void {

        try {
            let path : string = this.GetPath(uuid);
            let json : IJsonWeatherModel = this.DefaultFileData();

            if (fs.existsSync(path)){
                json = this.GetFromFile(uuid);
            }else {
                json.city = weather.city;
                json.isTracking = true;
            }

            json.weather.push(weather);

            fs.writeFileSync(path, JSON.stringify(json), "utf-8");
        }
        catch (e) {
            this.logger.error(e);
        }
    }

    public DeleteFollowedCityHistory(uuid: string): void {
        try {
            let path : string = this.GetPath(uuid);
            if (fs.existsSync(path)){
                fs.unlinkSync(path);
            }
        }
        catch (e) {
            this.logger.error(e);
        }
    }

    public GetCityCurrentlyTracked(uuid: string): Observable<IJsonWeatherModel> {
        return of(this.GetFromFile(uuid));
    }

    public GetFiles(): Observable<IFilesWeatherModel[]> {
        try {
            let filesData : IFilesWeatherModel[] = [];
            let files = fs.readdirSync(this.basePath);
            for (let filesKey in files) {
                let fileName : string = files[filesKey];

                if (fileName.includes(".")){
                    let uuid : string = fileName.split(".")[0];

                    filesData.push({
                        uuid : uuid,
                        fileData : this.GetFromFile(uuid)
                    });
                }
            }

            return of(filesData);
        }catch (e) {
            this.logger.error(e);
        }
    }

    private GetFromFile(uuid : string) : IJsonWeatherModel{

        try {
            let path : string = this.GetPath(uuid);
            if (!fs.existsSync(path)){
                return;
            }

            let file = fs.readFileSync(path, "utf-8");
            let parsedFile = JSON.parse(file);
            return parsedFile as IJsonWeatherModel;
        }
        catch (e) {
            this.logger.error(e);
            return ;
        }
    }

    private CheckFileData(data : IJsonWeatherModel) : boolean{
        if (data == null){
            return false;
        }

        if (data.weather == null){
            return false;
        }

        if (!Array.isArray(data.weather)){
            return false;
        }

        return true;
    }

    private GetPath(uuid : string) : string {
        return `${this.basePath}${uuid}.json`;
    }

    private DefaultFileData() : IJsonWeatherModel{
        return {
            city : null,
            weather : [],
            isTracking : false
        };
    }

}