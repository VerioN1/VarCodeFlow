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
import FinishedTests from './Pages/FinishedTests/FinishedTests';
import ErrorPage from './Components/FetchWrapper/ErrorPage';
import CreateOrganizationForm from './Pages/CreateOrganizationForm/CreateOrganizationForm';

const App :FC = () => (
  <>
    <Navbar />
    <Flex h="100%" w="100%" justify="center" overflowY="auto">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/NewOrganization" element={<CreateOrganizationForm />} />
        <Route path="/FinishedTest/:id" element={<FinishedTests />} />
        <Route path="/TestsHistory" element={<TestsHistory />} />
        <Route path="/NewTest/:testId" element={<NewTest />} />
        <Route path="/Logout" element={<Logout />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Flex>
  </>
);

export default App;
