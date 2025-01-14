import { Routes, Route } from "react-router-dom";
import App from "./App";
import User from "./component/User/User";
import Admin from "./component/Admin/Admin";
import HomePage from "./component/Home/HomePage";
import ManagerUser from "./component/Admin/Content/UserAdmin/ManageUser";
import DashBoard from "./component/Admin/Content/DashBoard";
import Login from "./component/Auth/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Register from "./component/Auth/Register";
import ListQuiz from "./component/User/ListQuiz";
import DetailQuiz from "./component/User/DetailQuiz";
import ManageQuiz from "./component/Admin/Content/Quiz/ManageQuiz";
import Questions from "./component/Admin/Content/Question/Questions";
import PrivateRoute from "./routes/PrivateRoute";
import { Suspense } from "react";
import { useSelector } from "react-redux";
import PrivateRouteListQuiz from "./routes/PrivateRouteLisQuiz";

const NotFound = () => {
  return (
    <div className="container mt-3 alert alert-danger">
      404.Not found data with current URL
    </div>
  );
};

const Layout = (props) => {
  const account = useSelector((state) => state.user.account);
  console.log("account", account);

  return (
    <Suspense fallback="...is loading">
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route
            path="/users"
            element={
              <PrivateRouteListQuiz>
                <ListQuiz />
              </PrivateRouteListQuiz>
            }
          />
        </Route>
        <Route path="/quiz/:id" element={<DetailQuiz />} />

        <Route
          path="/admins"
          element={
            <PrivateRoute>
              <Admin />
            </PrivateRoute>
          }
        >
          <Route index element={<DashBoard />} />
          <Route path="manage-user" element={<ManagerUser />} />
          <Route path="manage-quiz" element={<ManageQuiz />} />
          <Route path="manage-questions" element={<Questions />} />
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Suspense>
  );
};

export default Layout;
