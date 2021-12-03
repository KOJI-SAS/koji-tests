import React, {Ref} from "react";
import {AsyncTypeahead, Typeahead} from "react-bootstrap-typeahead";
import "./SearchCity.css"
import 'react-bootstrap-typeahead/css/Typeahead.css';
import {injectable} from "inversify";
import {ISearchCityProps} from "./ISearchCityProps";
import {ISearchCityState} from "./ISearchCityState";
import { v4 } from "uuid";
import {ShowWeatherComponent} from "../ShowWeather/ShowWeatherComponent";
import {Tab, TabList, TabPanel, Tabs} from "react-tabs";
import {WeatherHistoryComponent} from "../Weather History/WeatherHistoryComponent";
import 'react-tabs/style/react-tabs.css';
import {IWeatherModel} from "../../models/IWeatherModel";
import {MessageModel} from "../../models/MessageModel";
import {ToastContainer, toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';



@injectable()
export class SearchCityComponent extends React.Component<ISearchCityProps, ISearchCityState>{

    private uuidKey : string = "uuid";
    private cityKey : string = "city";
    private currentTabIndex : number = 0;
    private ref : Ref<any>  = React.createRef();

    constructor(props : any) {
        super(props);
        let city = this.props.cookieService.GetCookie(this.cityKey);

        this.state = {
            isLoading : false,
            options : [],
            selected : "",
            hasCity : city != null,
            weather : this.GetDefaultWeather(city),
            historyList : []
        }

        if (city){
            this.GetWeather(city, false);
        }

    }

    private GetDefaultWeather(city : string | null) : IWeatherModel{

        return {
            city : city? city : "",
            weather : "",
            date : "",
            temperature : 0,
            id : "",
            weatherDescription :"",
            iconUrl : ""
        }
    }

    private SearchCity(city : string){
        if (city != null && city.length>= 3){
            this.props.geoApiService.FindCity(city).subscribe(result => this.setState({ isLoading:false, options : result}));
        }

    }

    private GetWeather(city: string, reloadHistory : boolean){
        if (city != null && city != ""){
            this.props.cookieService.SetCookie(this.cityKey, city);
            let userId : string = this.GetUserID();

            this.props.backEndService.GetWeather(city, userId).subscribe(result => {
                let message : MessageModel = result as MessageModel;

                this.ErrorFromService(message, true);

                if (result instanceof MessageModel){
                    return;
                }

                this.setState({weather: result});
                if (reloadHistory){
                    this.GetWeatherHistory();
                }
            });
        }
    }

    private GetWeatherHistory(){
        let userId : string = this.GetUserID();
        this.props.backEndService.GetWeatherHistory(userId).subscribe((result : IWeatherModel[] | MessageModel)  => {
            let message : MessageModel = result as MessageModel;

            if (result instanceof MessageModel){
                return;
            }

            if(this.ErrorFromService(message, false)){
                this.setState({historyList : []});
            }else {
                this.setState({historyList : result});
            }




        });
    }

    private ErrorFromService(message : MessageModel, reset : boolean) : boolean{
        if (message && message.message && message.message.length>0){
            toast.error(message.message,
                {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true
                });

            if (reset){
                this.StopFollowingCity();
            }
            return true;
        }
        return false;
    }

    private GetUserID() : string{
        let userId : string = this.props.cookieService.GetCookie(this.uuidKey)
        if (!userId){
            userId = v4() as string ;
            this.props.cookieService.SetCookie(this.uuidKey, userId);
        }

        return userId;
    }

    private StopFollowingCity(){
        this.props.backEndService.DeleteWeatherHistory(this.GetUserID());
        this.props.cookieService.RemoveCookie(this.cityKey);
        this.setState({hasCity : false});
        this.setState({weather : this.GetDefaultWeather(null)});
        this.setState({historyList : []});
        /* @ts-ignore*/
        this.ref?.current?.clear();
    }

    render() {

        return (
            <div>
                <div>
                    <ToastContainer
                        position={"top-center"}
                        autoClose={5000}
                        closeOnClick={true}
                        pauseOnHover={true}
                    />
                </div>
                <div className="typeAhead">
                    {/* @ts-ignore*/}
                    <AsyncTypeahead
                        id={"searchCity"}
                        /* @ts-ignore*/
                        ref={this.ref}
                        /* @ts-ignore*/
                        placeholder={"Type a city name"}
                        isLoading={this.state.isLoading}
                        minLength={3}
                        multiple={false}
                        onSearch={(query : string) =>{

                            this.setState({isLoading : true});
                            this.SearchCity(query);

                        }}
                        onChange={(selectedElement) => {
                            this.setState({selected: selectedElement});

                            if (Array.isArray(selectedElement)){
                                switch (this.currentTabIndex){
                                    case 1:
                                        this.GetWeather(selectedElement[0] as string, true);

                                        break;
                                    case 0 :
                                    default:
                                        this.GetWeather(selectedElement[0] as string, false);
                                        break;
                                }

                                this.setState({hasCity : true});
                            }
                        }}
                        options={this.state.options}
                    />


                </div>
                <div>
                    <button
                        hidden={!this.state.hasCity}
                        className={"btn btn-secondary btn-margin"}
                        onClick={() => {
                            this.StopFollowingCity();
                        }}
                    >
                        Stop Following City
                    </button>
                </div>
                <div>
                    <Tabs>
                        <TabList>
                            <Tab
                                onClick={() => {
                                    this.currentTabIndex = 0;
                                    this.GetWeather(this.state.weather.city, false);
                                }}
                            >
                                Current Weather
                            </Tab>
                            <Tab onClick={() => {
                                this.currentTabIndex = 1;
                                this.GetWeatherHistory();
                            }}
                            >
                                History
                            </Tab>
                        </TabList>

                        <TabPanel>
                            <ShowWeatherComponent
                                weather={this.state.weather}
                            />
                        </TabPanel>
                        <TabPanel>
                            <WeatherHistoryComponent
                                historyList={this.state.historyList}
                                city={this.state.weather.city}
                            />
                        </TabPanel>
                    </Tabs>
                </div>

            </div>
        );
    }
}