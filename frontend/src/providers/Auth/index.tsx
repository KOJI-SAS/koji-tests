import { useEffect, useState, createContext, useContext } from 'react';
import { AuthContext, Props } from './typing';
import { TOKEN_STORAGE } from '../../shared/config';
import { useMutation, useQuery } from '../Data';
import { User } from '../../shared/entities';
import { QueryResult } from '../Data/typing';
import Login from '../../components/Login/Login';

const authContext: React.Context<Record<string, any>> = createContext({});
const AuthProvider = authContext.Provider;

export const useAuth = () => useContext(authContext) as AuthContext;

const AuthenticationProvider = (props: Props) => {
  const [token, setToken] = useState<string | null>(null);
  // Mutations
  const addToken = useMutation('auth.addToken');
  const removeToken = useMutation('auth.removeToken');
  const loginUser = useMutation('auth.login');
  // Queries
  const [user, loading, status]: QueryResult<User> = useQuery('auth.userInfo', [], {
    disabled: !token,
  });
  // Effects
  useEffect(() => {
    const token = localStorage.getItem(TOKEN_STORAGE);
    if (token) {
      addToken(token);
      setToken(token);
    }
  }, []);

  // Methods
  const login = (username: string) => {
    if (!username) return;
    loginUser(username).then((newToken: string) => {
      localStorage.setItem(TOKEN_STORAGE, newToken);
      addToken(newToken);
      setToken(newToken);
    });
  };

  const logout = () => {
    localStorage.removeItem(TOKEN_STORAGE);
    removeToken();
    setToken(null);
  };
  const value = { login, logout, token, user: status === 'ERROR' ? undefined : user };
  if (token && loading) return <div>Loading...</div>;
  if (!user) return <Login onSubmit={login} />;
  return <AuthProvider value={value}>{props.children}</AuthProvider>;
};

export default AuthenticationProvider;
