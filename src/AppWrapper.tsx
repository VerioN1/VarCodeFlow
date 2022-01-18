import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Flex } from '@chakra-ui/react';
import { ErrorBoundary } from 'react-error-boundary';
import App from './App';
import AuthWrapper from './Components/Auth/AuthWrapper';
import Login from './Pages/Login/Login';
import Navbar from './Components/Navbar/Navbar';
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
      <Navbar />
      <Flex minH="93vh" w="100%">
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
      </Flex>
    </ErrorBoundary>
  </BrowserRouter>
);

export default AppWrapper;
