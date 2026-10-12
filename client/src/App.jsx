import React from 'react';
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Home from './pages/Home';
import useGetCurrentUser from './hook/useGetCurrentUser';
export const serverUrl = "http://localhost:8000"

const App = () => {

  useGetCurrentUser()
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home/>} />
    </Routes>
    </BrowserRouter>
  );
};

export default App;