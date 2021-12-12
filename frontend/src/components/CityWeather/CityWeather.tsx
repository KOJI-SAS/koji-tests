import { get } from 'lodash';
import { useQuery } from '../../providers/Data';
import { QueryResult } from '../../providers/Data/typing';
import { FollowedCity, FollowedCityWeather } from '../../shared/entities';
import { unixToDate } from '../../shared/helpers';
import WeatherCard from '../WeatherCard/WeatherCard';
import c from './CityWeather.module.css';
import DataGrid from 'react-data-grid';

interface Props {
  followedCityId: string;
}

const CityWeather = (props: Props) => {
  const { followedCityId } = props;
  const [followedCity, loading, status]: QueryResult<FollowedCity> = useQuery(
    'followedCity.find.one',
    [followedCityId],
    {}
  );

  if (loading) {
    return <div>Loading weather data...</div>;
  }

  if (status === 'ERROR' || !followedCity) {
    return <div>There has been an Error, we apologize</div>;
  }

  const [latestWeather, ...weatherHistory] = followedCity.weathers
    .sort((a: FollowedCityWeather, b: FollowedCityWeather) => a.createdAt - b.createdAt)
    .map((el: FollowedCityWeather) => ({
      ...el,
      date: unixToDate(el.createdAt),
      temperature: Math.floor((el.temperature - 273.15) * 100) / 100,
    }));

  if (followedCity.weathers.length === 0) {
    return (
      <div className={c.cityWeather}>
        No weather information available for {get(followedCity, 'city.name')}
      </div>
    );
  }
  return (
    <div className={c.cityWeather}>
      <div className={c.latestWeather}>
        <WeatherCard weather={latestWeather} city={followedCity.city} />
      </div>
      {weatherHistory.length > 0 && (
        <div className={c.history}>
          <DataGrid
            columns={[
              { key: 'date', name: 'Date' },
              { key: 'title', name: 'Title' },
              { key: 'description', name: 'Description' },
              { key: 'temperature', name: 'Temperature' },
              { key: 'windSpeed', name: 'Wind speed' },
              { key: 'windDegree', name: 'Wind angle' },
              { key: 'humidity', name: 'Humidity' },
            ]}
            rows={weatherHistory}
          />
        </div>
      )}
    </div>
  );
};

export default CityWeather;
