import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element }) => {
  const isAuthenticated = useSelector(state => state.Auth.isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/auth/signin" replace />;
  }

  return element;
};

export default ProtectedRoute