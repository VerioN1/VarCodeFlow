import Cookies from 'universal-cookie';

const cookies = new Cookies();

export const createCookie = (key: string, value: any) => cookies.set(key, value, { maxAge: 172800 });
export const getCookie = (key: string) => cookies.get(key);
export const deleteCookie = (key: string) => cookies.remove(key);
