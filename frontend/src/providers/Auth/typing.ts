import { User } from '../../shared/entities';

export interface Props {
  children: React.ReactNode;
}

export interface State {
  token: null | string;
  user: null | User;
}

export interface AuthContext {
  user: User;
  login: (username: string) => void;
  logout: () => void;
}
