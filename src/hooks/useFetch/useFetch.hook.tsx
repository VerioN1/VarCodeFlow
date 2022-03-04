import { useEffect, useRef, useReducer } from 'react';
import { Dict } from '@chakra-ui/utils';
import axios, { AxiosError, AxiosResponse } from 'axios';

export type Status = 'idle' | 'loading' | 'succeeded' | 'failed';
export type Response<F> = F | undefined;
type ERROR = Error | undefined | null | string | AxiosError | AxiosResponse;
export type StateType<F> = {
  status: Status;
  error?: ERROR;
  data?: Response<F>;
};
type Action<F> =
    | { type: 'FETCHING' }
    | { type: 'FETCHED', payload: Response<F> }
    | { type: 'FETCH_ERROR', payload: ERROR };

const useFetch = <T extends any>(url: string, serviceFunc : Function) => {
  const cache = useRef<Dict<Response<T>>>({});

  const initialState : StateType<T> = {
    status: 'idle',
    error: null,
    data: undefined,
  };
  // eslint-disable-next-line no-shadow
  const [state, dispatch] = useReducer((state: StateType<T>, action: Action<T>):StateType<T> => {
    switch (action.type) {
      case 'FETCHING':
        return { ...initialState, status: 'loading' };
      case 'FETCHED':
        return { ...initialState, status: 'succeeded', data: action.payload };
      case 'FETCH_ERROR':
        return { ...initialState, status: 'failed', error: action.payload };
      default:
        return state;
    }
  }, initialState);

  useEffect(() => {
    let cancelRequest = false;
    if (!url || !url.trim()) return undefined;

    const fetchData = async () => {
      dispatch({ type: 'FETCHING' });
      if (cache.current[url]) {
        const data = cache.current[url];
        dispatch({ type: 'FETCHED', payload: data });
      } else {
        try {
          const data = await serviceFunc();
          cache.current[url] = data;
          if (cancelRequest) return;
          dispatch({ type: 'FETCHED', payload: data });
        } catch (error) {
          if (cancelRequest) return;
          if (axios.isAxiosError(error)) {
            dispatch({ type: 'FETCH_ERROR', payload: error.response });
          } else {
            // @ts-ignore
            dispatch({ type: 'FETCH_ERROR', payload: error.message });
          }
        }
      }
    };

    fetchData();

    return () => {
      cancelRequest = true;
    };
  }, [url]);

  return state;
};

export default useFetch;
