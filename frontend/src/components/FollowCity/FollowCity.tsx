import React from 'react';
import Select from 'react-select/async';
import { useMutation, useQueryRequest } from '../../providers/Data';
import c from './FollowCity.module.css';

interface State {
  value: number;
  option: string;
}

const FollowCity = () => {
  const [selectedOption, setSelectedOption] = React.useState<State | null>(null);
  const searchCity = useQueryRequest('city.search');
  const followCity = useMutation('action.follow');
  return (
    <div className={c.followCity}>
      <div className={c.select}>
        <Select
          placeholder={'Select a city to follow'}
          value={selectedOption}
          onChange={(option: any) => setSelectedOption(option)}
          defaultOptions
          loadOptions={async (inputValue: string) => {
            const cities = await searchCity(inputValue);
            return cities.map((city: any) => ({ value: city.id, label: city.name }));
          }}
        />
      </div>
      <div>
        <button
          className={c.button}
          onClick={() => {
            if (selectedOption) {
              followCity(selectedOption.value);
            }
          }}
        >
          Follow
        </button>
      </div>
    </div>
  );
};

export default FollowCity;
