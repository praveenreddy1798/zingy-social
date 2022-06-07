import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const PrivateRoute = () => {
  const { isAuth } = useSelector((state) => state.auth);
  const location = useLocation();
  return isAuth ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export { PrivateRoute };
