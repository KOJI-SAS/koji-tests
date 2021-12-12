import { useAuth } from '../../providers/Auth';
import FollowCity from '../FollowCity/FollowCity';
import HeaderLayout from '../HeaderLayout/HeaderLayout';
import CityWeather from '../CityWeather/CityWeather';
import c from './App.module.css';

const App = () => {
  const { user, logout } = useAuth();
  return (
    <div className={c.app}>
      <HeaderLayout user={user} onLogout={logout}>
        <div className={c.follow}>
          <FollowCity />
        </div>
        <div className={c.cityWeather}>
          {user.followedCityId && <CityWeather followedCityId={user.followedCityId} />}
        </div>
      </HeaderLayout>
    </div>
  );
};

export default App;
