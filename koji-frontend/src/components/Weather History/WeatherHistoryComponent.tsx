import React from "react";
import {IWeatherHistoryProps} from "./IWeatherHistoryProps";
import {IWeatherHistoryState} from "./IWeatherHistoryState";
import DataTable, {TableColumn} from "react-data-table-component";
import {IWeatherHistoryColumnsModel} from "./IWeatherHistoryColumnsModel";
import {IWeatherModel} from "../../models/IWeatherModel";
import "./WeatherHistory.css";
import {Util} from "../../util/Util";




export class WeatherHistoryComponent extends React.Component<IWeatherHistoryProps, IWeatherHistoryState>{
    private columns : TableColumn<IWeatherHistoryColumnsModel>[] = [
        {
            name : "Date",
            selector : ( row ) => row.date
        },
        {
            name : "Condition",
            selector : row => row.condition,
            cell : row => <span> {row.condition} <img className={"reduce-image-size"} src={row.imageUrl}/></span>
        },
        {
            name : "Temperature",
            selector : ( row ) => row.temperature
        }
    ];

    constructor(props : IWeatherHistoryProps) {
        super(props);
        this.state = {

        }
    }

    private SetDatatable(data : IWeatherModel[]) : IWeatherHistoryColumnsModel[]{
        if(data == null){
            return [];
        }

        return data.map(row => {
            return {
                date : Util.FormatDate(row.date, "dd/mm/yyyy HH:MM"),
                condition : row.weather,
                imageUrl : row.iconUrl,
                temperature : Util.FormatTemperature(row.temperature),
            } as IWeatherHistoryColumnsModel;
        })
    }

    render() {
        return (
            <div>
                <h2>{this.props.city}</h2>
                <DataTable
                    columns={this.columns}
                    data={this.SetDatatable(this.props.historyList)}
                    pagination={true}
                />
            </div>
        );
    }
}