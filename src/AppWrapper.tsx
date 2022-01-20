import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import App from './App';
import AuthWrapper from './Components/Auth/AuthWrapper';
import Login from './Pages/Login/Login';
import ErrorFallback from './Pages/Error/ErrorFallback';

const AppWrapper = () => (
  <BrowserRouter>
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => {
        console.log('Reset');
      }}
      // resetKeys={[explode]}
    >
      <Routes>
        <Route path="/Login" element={<Login />} />
        <Route
          path="*"
          element={(
            <AuthWrapper>
              <App />
            </AuthWrapper>
                      )}
        />
      </Routes>
    </ErrorBoundary>
  </BrowserRouter>
);

export default AppWrapper;
