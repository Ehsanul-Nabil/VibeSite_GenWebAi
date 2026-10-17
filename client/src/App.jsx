import { Navigate, Route, Routes } from 'react-router-dom';
import Generate from './pages/Generate';
import Home from './pages/Home';
import BuilderPage from './pages/BuilderPage';
import PreviewPage from './pages/PreviewPage';
import { Toaster } from 'react-hot-toast';
import PublishPage from './pages/PublishPage';
import Dashboard from './pages/Dashboard';
import Pricing from './pages/Pricing';
import { AuthLayout } from './components/layout/Layout';

const App = () => {
  return (
    <>
    <Toaster/>
    <Routes>

      <Route path='/' element={<Home />} />

      {/* Protected Routes */}
      <Route element={<AuthLayout />}>
        <Route path='/generate' element={<Generate />} />
        {/* <Route path='/dashboard' element={userData?<Dashboard/>:<Home/>}/> */}
        <Route path='/dashboard' element={<Dashboard/>}  />
        <Route path='/builder/:id' element={<BuilderPage />} />
        <Route path='/preview/:id' element={<PreviewPage />} />
        <Route path='/pricing' element={<Pricing/>} />
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





      {/* <Route element={<GuestLayout />}> */}
        {/* passing the string "login" */}
        {/* <Route path='/login' element={<AuthPage mode="login" />} />  */}
        {/* <Route path='/register' element={<AuthPage mode="register" />} /> */}
      {/* </Route> */}