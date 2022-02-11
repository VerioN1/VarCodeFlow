import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../Redux/reducers/auth.reducer';
import { USER_TOKEN_FIELD } from '../../Utils/Cookies/Cookies.constants';
import { deleteCookie } from '../../Utils/Cookies/CookiesHandler';

const Logout = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const handleLogout = () => {
      deleteCookie(USER_TOKEN_FIELD);
      localStorage.removeItem(USER_TOKEN_FIELD);
      dispatch(logout({}));
      window.location.replace('/Login');
    };
    handleLogout();
  }, []);

  return (
    <div />
  );
};

export default Logout;
