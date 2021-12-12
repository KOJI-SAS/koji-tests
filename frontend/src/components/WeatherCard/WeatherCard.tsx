import { useMutation } from '../../providers/Data';
import { City, FollowedCityWeather } from '../../shared/entities';
import c from './WeatherCard.module.css';

interface Props {
  weather: FollowedCityWeather;
  city: City;
}
const WeatherCard = (props: Props) => {
  const { weather, city } = props;
  const unfollow = useMutation('action.unfollow');
  return (
    <div className={c.weatherCard}>
      <div className={c.title}>
        {city.name}
        <span className={c.cross} onClick={unfollow}>
          x
        </span>
      </div>
      <div className={c.date}>{weather.date}</div>
      <div className={c.grid}>
        <div className={c.temperature}>
          {Math.floor(weather.temperature)}
          <span className={c.symbol}>℃</span>
        </div>
        <div className={c.icon}>
          <img height={50} alt="weather" src={weather.icon} />
        </div>
        <div className={c.humidity}>Humidity {weather.humidity}</div>
        <div className={c.windSpeed}>Wind speed {weather.windSpeed}</div>
      </div>
    </div>
  );
};

export default WeatherCard;
