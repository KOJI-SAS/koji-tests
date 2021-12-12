export interface Props {
  children: React.ReactNode;
}

export interface Request {
  name: string;
  service: Function;
}

export interface Query extends Request {
  defaultValue?: any;
  refresh?: string[];
  subscribe?: Record<string, Function>;
}

export interface Mutation extends Request {}

export type QueryResult<T> = [T, boolean, string];
