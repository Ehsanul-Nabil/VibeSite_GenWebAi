import React from 'react';
import {BrowserRouter,Routes,Route, Navigate} from "react-router-dom"
import Home from './pages/Home';
import useGetCurrentUser from './hook/useGetCurrentUser';
import { useSelector } from 'react-redux';
import Dashboard from './pages/Dashboard';
import Generate from './pages/Generate';
import Editor from './pages/Editor';
export const serverUrl = "http://localhost:8000"

const App = () => {

  useGetCurrentUser()
  const {userData}=useSelector(state=>state.user)
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/dashboard' element={userData?<Dashboard/>:<Home/>}/>
      <Route path='/generate' element={userData?<Generate/>:<Home/>}/>
      <Route path='/editor/:id' element={userData?<Editor/>:<Home/>}/>
    </Routes>
    </BrowserRouter>
  );
};

export default App;