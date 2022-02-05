import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useCookies } from 'react-cookie';
import { logout } from '../../Redux/reducers/auth.reducer';
import { USER_TOKEN_FIELD } from '../../Utils/Cookies/Cookies.constants';

const Logout = () => {
  const dispatch = useDispatch();
  const [, , removeCookies] = useCookies();

  const handleLogout = () => {
    removeCookies(USER_TOKEN_FIELD);
    localStorage.removeItem(USER_TOKEN_FIELD);
    dispatch(logout({}));
    window.location.replace('/Login');
  };
  useEffect(() => {
    handleLogout();
  }, []);

  return (
    <div />
  );
};

export default Logout;
