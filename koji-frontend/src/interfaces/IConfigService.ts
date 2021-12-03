import {IGeoApiJson} from "../models/IGeoApiJson";
import {IBackEndJson} from "../models/IBackEndJson";

export interface IConfigService {
    GetGeoApiParameters() : IGeoApiJson;
    GetBackEndApiParameters() : IBackEndJson;
}