import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { postLogOut } from "../../services/apiServices";
import { toast } from "react-toastify";
import { doLogout } from "../../redux/action/userAction";
import Language from "./Language";
import { useTranslation, Trans } from "react-i18next";
const Header = () => {
  const { t } = useTranslation();
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const account = useSelector((state) => state.user.account);
  const dispatch = useDispatch();
  console.log("account", account);
  //
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  const handleSignUp = () => {
    navigate("/register");
  };

  const handleLogOut = async () => {
    let res = await postLogOut(account.email, account.refresh_token);
    if (res && res.EC == 0) {
      dispatch(doLogout());
      toast.success(res.EM);
      navigate("./login");
    } else {
      toast.error(res.EM);
    }
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <NavLink to="/" className="navbar-brand">
          App-Quiz
        </NavLink>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavLink to="/" className="nav-link">
              {t("header.home")}
            </NavLink>
            <NavLink to="users" className="nav-link">
              {t("header.user")}
            </NavLink>
            <NavLink to="admins" className="nav-link">
              {t("header.admin")}
            </NavLink>
          </Nav>
          <Nav>
            {isAuthenticated === false ? (
              <>
                <button className="btn-login" onClick={() => handleLogin()}>
                  {t("header.login")}
                </button>
                <button className="btn-signup" onClick={() => handleSignUp()}>
                  {t("header.Signup")}
                </button>
              </>
            ) : (
              <NavDropdown title={t("header.setting")} id="basic-nav-dropdown">
                <NavDropdown.Item>{t("header.Profile")}</NavDropdown.Item>
                <NavDropdown.Item onClick={() => handleLogOut()}>
                  {t("header.Logout")}
                </NavDropdown.Item>
              </NavDropdown>
            )}
            <Language />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
