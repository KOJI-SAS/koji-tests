import dateFormat from "dateformat";

export class Util{
    public static FormatDate(date : string, format : string) : string{
        if (!date || date.length == 0){
            return "";
        }

        return dateFormat(date, format);
    }

    public static FormatTemperature(temperature : number) : string{
        return `${Math.round(temperature).toString()}°C`;
    }
}