import { FC } from 'react';
import {
  Route, Routes,
} from 'react-router-dom';
import { Flex } from '@chakra-ui/react';
import Home from './Pages/Home/Home';
import Register from './Pages/Register/Register';
import NewTest from './Pages/NewTest/NewTest';
import Navbar from './Components/Navbar/Navbar';
import Logout from './Components/Logout/Logout';
import TestsHistory from './Pages/TestHistory/TestsHisotry';

const App :FC = () => (
  <>
    <Navbar />
    <Flex minH="93vh" w="100%" justify="center">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/TestsHistory" element={<TestsHistory />} />
        <Route path="/NewTest" element={<NewTest />} />
        <Route path="/Logout" element={<Logout />} />
      </Routes>
    </Flex>
  </>
);

export default App;
