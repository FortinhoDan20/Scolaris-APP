import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = () => {
  const { auth } = useSelector((state) => ({ ...state }));
  return auth?.owner ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
