import { FC } from 'react';
import {
  Route, Routes,
} from 'react-router-dom';
import { Flex } from '@chakra-ui/react';
import Home from './Pages/Home/Home';
import Register from './Pages/Register/Register';
import NewTest from './Pages/NewTest/NewTest';
import Navbar from './Components/Navbar/Navbar';

const App :FC = () => (
  <>
    <Navbar />
    <Flex minH="93vh" w="100%">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/NewTest" element={<NewTest />} />
      </Routes>
    </Flex>
  </>
);

export default App;
