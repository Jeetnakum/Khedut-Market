import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const ProtectedRoute = ({ children, role }) => {
  const { user, loading, isAuthenticated } = useAuth();

  if (loading) return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
      <div className="loader">Loading...</div>
    </div>
  );

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  if (role && user?.role !== role && user?.role !== 'admin') {
    // Redirect to correct dashboard
    if (user?.role === 'farmer') return <Navigate to="/farmer/dashboard" replace />;
    if (user?.role === 'trader') return <Navigate to="/buyer/dashboard" replace />;
    if (user?.role === 'admin') return <Navigate to="/admin/dashboard" replace />;
  }

  return children;
};

export default ProtectedRoute;
