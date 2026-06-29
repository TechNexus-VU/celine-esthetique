import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Loader from "@/components/admin/Loader";

const AdminProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading, role } = useSelector(
    (state) => state.auth
  );

  if (loading) {
    return <Loader text="Checking admin access..." />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AdminProtectedRoute;