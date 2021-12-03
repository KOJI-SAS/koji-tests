export class Util{
    static KelvinToCelcius(kelvin : number, round : number) : number{
        let zeroCelciusInKelvin : number = -273.15;
        return this.RoundToDecimal(kelvin + zeroCelciusInKelvin, round);
    }

    static RoundToDecimal(value : number, decimals : number){
        if (decimals == null || decimals < 1)
            decimals = 1;

        let pow = Math.pow(10, decimals);
        value = value * pow;
        return Math.round(value)/pow;
    }
}