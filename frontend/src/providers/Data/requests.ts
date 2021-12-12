import axios from 'axios';
import { API_URL } from '../../shared/config';
import { Mutation, Query } from './typing';

export const http = axios.create({ baseURL: API_URL });

const queries: Query[] = [
  {
    name: 'auth.userInfo',
    service: () => http.get('/auth/userInfo').then(({ data }) => data),
    refresh: ['auth.addToken'],
    subscribe: {
      'action.follow': (state: any, action: any) => ({ ...state, followedCityId: action.data.id }),
      'action.unfollow': (state: any) => ({ ...state, followedCityId: null }),
      'auth.removeToken': () => undefined,
    },
  },
  {
    name: 'city.search',
    service: (name: string) => http.post('/cities/search', { name }).then(({ data }) => data),
  },
  {
    name: 'followedCity.find.one',
    service: (id: string) => http.get('/followedCities/' + id).then(({ data }) => data),
    refresh: ['followedCity.find.one.refresh'],
  },
  {
    name: 'followedCityWeather.search',
    service: (filters: Record<string, any> = {}) =>
      http.post('/followedCityWeathers/', filters).then(({ data }) => data),
  },
];

const mutations: Mutation[] = [
  {
    name: 'auth.login',
    service: (username: string) => http.post('/auth/login', { username }).then(({ data }) => data),
  },
  {
    name: 'auth.addToken',
    service: (token: string) => (http.defaults.headers.common['Authorization'] = `Bearer ${token}`),
  },
  {
    name: 'auth.removeToken',
    service: () => (http.defaults.headers.common['Authorization'] = ''),
  },
  {
    name: 'action.follow',
    service: (cityId: string) => http.post('/actions/follow/' + cityId).then(({ data }) => data),
  },
  {
    name: 'action.unfollow',
    service: () => http.post('/actions/unfollow').then(({ data }) => data),
  },
];

const requests = { queries, mutations };

export default requests;
