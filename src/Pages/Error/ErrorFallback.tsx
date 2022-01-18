import React, { FC, useEffect } from 'react';

interface props {
    error: any,
    resetErrorBoundary: () => void
}

const ErrorFallback :FC<props> = ({ error, resetErrorBoundary }) => {
  useEffect(() => {
    console.log('ErrorFallback:', error);
  }, []);

  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <button type="button" onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
};

export default ErrorFallback;
