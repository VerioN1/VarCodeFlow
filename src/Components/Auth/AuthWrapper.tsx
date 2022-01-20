import React, { FC, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../Redux/store';
import { login } from '../../Redux/reducers/auth.reducer';
import { USER_TOKEN_COOKIE_NAME } from '../../Utils/Cookies/Cookies.constants';

const AuthWrapper :FC = ({ children }) => {
  const userData = useSelector((state: RootState) => state.userData);
  const userCookie = useCookies([USER_TOKEN_COOKIE_NAME])[0];
  const dispatch = useDispatch();

  useEffect(() => { // TODO: fetch user data from server and store it in redux store
    // eslint-disable-next-line max-len
    if (Object.keys(userCookie[USER_TOKEN_COOKIE_NAME]).length !== 0) dispatch(login(userCookie[USER_TOKEN_COOKIE_NAME]));
  }, []);

  if (!userData.isAuthenticated && Object.keys(userCookie).length === 0) {
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
