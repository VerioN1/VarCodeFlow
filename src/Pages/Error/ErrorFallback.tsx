import React, { FC, useEffect } from 'react';
import ErrorStackParser from 'error-stack-parser';
import { deleteCookie } from '../../Utils/Cookies/CookiesHandler';
import { TEST_IN_PROGRESS_COOKIE_NAME } from '../../Utils/Cookies/Cookies.constants';
import Logger from '../../Utils/Logger/Logger.Logic';

interface props {
    error: any,
    resetErrorBoundary: () => void
}

const ErrorFallback :FC<props> = ({ error, resetErrorBoundary }) => {
  useEffect(() => {
    const newError = ErrorStackParser.parse(error);
    console.log('ErrorFallback:', newError);
    Logger.Error('UI CRASHED', { error });
    deleteCookie(TEST_IN_PROGRESS_COOKIE_NAME);
  }, []);

  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <p>--please refresh--</p>
      <pre>{error.message}</pre>
      <button type="button" onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
};

export default ErrorFallback;
