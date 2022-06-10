import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const RestrictedRoute = () => {
  const { isAuth } = useSelector((state) => state.auth);
  const location = useLocation();
  return isAuth ? (
    <Navigate to="/" state={{ from: location }} replace />
  ) : (
    <Outlet />
  );
};

export { RestrictedRoute };
