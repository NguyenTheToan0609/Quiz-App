import { useState } from "react";
import "./Register.scss";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import { postSignUp } from "../../services/apiServices";

const Register = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [isShowpassword, setIsShowpassword] = useState(false);
  let navigate = useNavigate();

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleRegister = async () => {
    //validate
    const isValidEmail = validateEmail(email);

    if (!isValidEmail) {
      toast.error("Invalid Email");
      return;
    }

    let data = await postSignUp(email, password, username);
    if (data && data.EC === 0) {
      toast.success(data.EM);
      navigate("/login");
    }
    if (data && data.EC !== 0) {
      toast.error(data.EM);
    }
  };

  return (
    <div className="login-container">
      <div className="header">
        <span>Already have an account?</span>
        <button onClick={() => navigate("/login")}>Log in</button>
      </div>
      <div className="title col-4 mx-auto">TypeForm Register</div>
      <div className="welcome col-4 mx-auto">Start your journey?</div>
      <div className="content-form col-4 mx-auto ">
        <div className="form-group">
          <label>Email (*)</label>
          <input
            type={"email"}
            className="form-control"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div className="form-group pass-group">
          <label>Password (*)</label>
          <input
            type={isShowpassword ? "text" : "password"}
            className="form-control"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />

          {isShowpassword ? (
            <span
              className="icons-eye"
              onClick={() => setIsShowpassword(false)}
            >
              <VscEye />
            </span>
          ) : (
            <span className="icons-eye" onClick={() => setIsShowpassword(true)}>
              <VscEyeClosed />
            </span>
          )}
        </div>
        <div className="form-group">
          <label>Username</label>
          <input
            type={"text"}
            className="form-control"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>
        <div>
          <button className="btn-submit" onClick={() => handleRegister()}>
            Sign Up to Typeform
          </button>
        </div>
        <div className="text-center">
          <span
            className="back"
            onClick={() => {
              navigate("/");
            }}
          >
            &#60;&#60;Go to HomePage
          </span>
        </div>
      </div>
    </div>
  );
};

export default Register;
