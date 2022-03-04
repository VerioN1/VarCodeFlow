import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { isTokenValid } from '../../services/User.services';
import { login } from '../../Redux/reducers/auth.reducer';

export type AuthStatus = 'loading' | 'loggedIn' | 'loggedOut';

const useAuth = () => {
  const [authStatus, setAuthStatus] = React.useState<AuthStatus>('loading');
  const dispatch = useDispatch();

  useEffect(() => {
    const requestToken = async () => {
      const userData = await isTokenValid();
      if (userData) {
        dispatch(login(userData));
        setAuthStatus('loggedIn');
      } else {
        setAuthStatus('loggedOut');
      }
    };
    requestToken();
  }, []);

  return { authStatus, setAuthStatus };
};

export default useAuth;
