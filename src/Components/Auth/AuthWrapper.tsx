import React, { FC, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../Redux/store';
import { login } from '../../Redux/reducers/auth.reducer';

const AuthWrapper :FC = ({ children }) => {
  const userData = useSelector((state: RootState) => state.userData);
  const [cookies] = useCookies([]);
  const dispatch = useDispatch();
  useEffect(() => {
    // @ts-ignore
    if (cookies.token) dispatch(login(cookies.token));
  }, []);
  // @ts-ignore
  if (!userData.isAuthenticated && !cookies.token) {
    window.location.href = '/login';
  }

  return (
  // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {children}
    </>
  );
};

export default AuthWrapper;
