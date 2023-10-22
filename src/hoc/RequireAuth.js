import { useLocation, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function RequireAuth({ children }) {
  const location = useLocation();

  const isLogged = useSelector((state) => state.blog.isLogged);

  if (!isLogged) {
    return <Navigate to="/sign-in" state={{ from: location }} />;
  }

  return children;
}

export default RequireAuth;
