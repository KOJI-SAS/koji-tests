import _Entity from './_Entity';

export default class Weather extends _Entity {
  title: string;
  description: string;
  temperature: number;
  windSpeed: number;
  windDegree: number;
  pressure: number;
  humidity: number;
  icon: string;
}
