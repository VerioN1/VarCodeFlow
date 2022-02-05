import React, { FC, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { Heading } from '@chakra-ui/react';
import { isTokenValid } from '../../services/User.services';
import { login } from '../../Redux/reducers/auth.reducer';
import useFetch from '../../hooks/useFetch/useFetch.hook';
import { USER_TOKEN_FIELD } from '../../Utils/Cookies/Cookies.constants';
import { IUser } from '../../Types/User.Types';

const AuthWrapper :FC = ({ children }) => {
  const [getCookie] = useCookies([]);
  // @ts-ignore
  const userToken = getCookie[USER_TOKEN_FIELD] ?? 'error';
  localStorage.setItem(USER_TOKEN_FIELD, userToken);
  const state = useFetch<IUser>('TokenValidation', isTokenValid);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (state.status === 'succeeded') {
      dispatch(login(state.data));
      // @ts-ignore
      localStorage.setItem('email', state.data.email);
    }
  }, [state.status]);

  if (state.status === 'loading') return <Heading>Loading...</Heading>;
  if (state.status === 'failed') {
    navigate('/Logout');
    return <Heading>Error</Heading>;
  }

  return (
  // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {children}
    </>
  );
};

export default AuthWrapper;
