import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { Props } from './typing';
import requests from './requests';
const Quest = require('redux-fleo');

const store = createStore(
  Quest.default.createReducer(requests),
  undefined,
  (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__()
);

export const useQuery = (name: string, params: any[], config: Record<string, any>) =>
  Quest.useQuery(name, params || [], config);
export const useMutation = (name: string) => {
  const mutation = Quest.useMutation(name);
  return (...params: any[]) =>
    mutation(...params).catch(() => {
      alert('Network error please refresh');
    });
};
export const useQueryRequest = (name: string) => Quest.useQueryRequest(name);

const DataProvider = (props: Props) => {
  return <Provider store={store}>{props.children}</Provider>;
};

export default DataProvider;
