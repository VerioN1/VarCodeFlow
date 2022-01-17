import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Flex } from '@chakra-ui/react';
import App from './App';
import AuthWrapper from './Components/Auth/AuthWrapper';
import Login from './Pages/Login/Login';
import Navbar from './Components/Navbar/Navbar';

const AppWrapper = () => (
  <BrowserRouter>
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
  </BrowserRouter>
);

export default AppWrapper;
