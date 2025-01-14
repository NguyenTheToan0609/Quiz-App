import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

const PrivateRoute = (props) => {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const account = useSelector((state) => state.user.account);

  if (!isAuthenticated) {
    return <Navigate to="/login"></Navigate>;
  } else {
    if (account.role === "USER") {
      return <Navigate to="/login"></Navigate>;
    }
  }

  return <div>{props.children}</div>;
};

export default PrivateRoute;
