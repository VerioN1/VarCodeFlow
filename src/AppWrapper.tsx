import {
  Route, Routes,
} from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import App from './App';
import Login from './Pages/Login/Login';
import ErrorFallback from './Pages/Error/ErrorFallback';
import useAuth from './hooks/useAuth/useAuth.hook';

const AppWrapper = () => {
  const { authStatus, setAuthStatus } = useAuth();

  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => {
      }}
    >
      <Routes>
        {
            authStatus === 'loading' && <Route path="*" element={<div>Loading...</div>} />
        }
        {
          authStatus === 'loggedIn' && <Route path="*" element={<App />} />
        }
        {
            authStatus === 'loggedOut' && <Route path="*" element={<Login setAuthStatus={setAuthStatus} />} />
        }
      </Routes>
    </ErrorBoundary>
  );
};

export default AppWrapper;
