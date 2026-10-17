import { Navigate, Outlet } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import Loading from '../Loading';

export function AuthLayout() {
  const { user, loadingUser } = useAppContext();

  if (loadingUser) return <Loading />;
  // if (!user) return <Navigate to="/" replace />;
  if (!user) return <Navigate to="/homepage" replace />;

  return <Outlet />;
}

