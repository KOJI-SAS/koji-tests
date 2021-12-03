import { Observable } from "rxjs";

export default interface IGeoApiService{
    FindCity(city : string) : Observable<string[]> ;

}
