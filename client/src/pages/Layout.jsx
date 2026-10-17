import { Navigate, Outlet } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import Loading from '../components/Loading';

export function AuthLayout() {
  const { user, loadingUser } = useAppContext();

  if (loadingUser) return <Loading />;
  // if (!user) return <Navigate to="/" replace />;
  if (!user) return <Navigate to="/homepage" replace />;

  return <Outlet />;
}



export function GuestLayout() {
  const { user, loadingUser } = useAppContext();

  if (loadingUser) return <Loading />;
  // if (user) return <Navigate to="/" replace />;
  if (user) return <Navigate to="/homepage" replace />;

  return <Outlet />;
}