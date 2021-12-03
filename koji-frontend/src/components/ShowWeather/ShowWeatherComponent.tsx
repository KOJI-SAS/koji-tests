import React from "react";
import {IShowWeatherProps} from "./IShowWeatherProps";
import {IShowWeatherState} from "./IShowWeatherState";
import "./ShowWeather.css"
import {Util} from "../../util/Util";

export class ShowWeatherComponent extends React.Component<IShowWeatherProps, IShowWeatherState> {

    render() {
        return (
            <div hidden={!this.props.weather.city}>
                <h2 className={"item"}>{this.props.weather.city}</h2>
                <div className={"item"}>{Util.FormatDate(this.props.weather.date, "dddd mmmm dS yyyy HH:MM:ss")}</div>
                <div className={"horizontal-container item"}>
                    <div className={"item"}><img src={this.props.weather.iconUrl}/></div>
                    <div className={"item"}>{this.props.weather.weather} {Util.FormatTemperature(this.props.weather.temperature)}</div>
                    {/*<div className={"item"}>{Util.FormatTemperature(this.props.weather.temperature)}</div>*/}
                </div>

            </div>
        );

    }
}