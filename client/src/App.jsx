import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { GuestLayout, AuthLayout } from './pages/Layout';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import Home from './pages/Home';
import BuilderPage from './pages/BuilderPage';
import PreviewPage from './pages/PreviewPage';
import { Toaster } from 'react-hot-toast';
import PublishPage from './pages/PublishPage';

const App = () => {
  return (
    <>
    <Toaster/>
    <Routes>
      {/* Guest Routes */}
      <Route element={<GuestLayout />}>
        {/* passing the string "login" */}
        <Route path='/login' element={<AuthPage mode="login" />} /> 
        <Route path='/register' element={<AuthPage mode="register" />} />
      </Route>

      <Route path='/homepage' element={<Home />} />


      {/* Protected Routes */}
      <Route element={<AuthLayout />}>
        <Route path='/' element={<HomePage />} />
        <Route path='/builder/:id' element={<BuilderPage />} />
        <Route path='/preview/:id' element={<PreviewPage />} />
      </Route>

      {/* Public Routes */}
      <Route path='/publish/:id' element={<PublishPage/>} />
     
     {/* Catch-all */}
      <Route path='*' element={<Navigate to="/" replace />} />

    </Routes>
    </>
  );
};

export default App;