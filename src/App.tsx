import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './Pages/Home/Home';
import Register from './Pages/Register/Register';
import NewTest from './Pages/NewTest/NewTest';

const App :FC = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/Register" element={<Register />} />
    <Route path="/NewTest" element={<NewTest />} />
  </Routes>
);

export default App;
