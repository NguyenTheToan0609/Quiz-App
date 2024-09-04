import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRouteListQuiz = (props) => {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/login"></Navigate>;
  }

  return <div>{props.children}</div>;
};

export default PrivateRouteListQuiz;
