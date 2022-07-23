import {
  Route, Routes,
} from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import { QueryClient, QueryClientProvider } from 'react-query';
import App from './App';
import Login from './Pages/Login/Login';
import ErrorFallback from './Pages/Error/ErrorFallback';
import useAuth from './hooks/useAuth/useAuth.hook';

const AppWrapper = () => {
  const { authStatus, setAuthStatus } = useAuth();
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
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
    </QueryClientProvider>
  );
};

export default AppWrapper;
