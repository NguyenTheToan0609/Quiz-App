import videoHomepage from "../../assets/video-homepage.mp4";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTranslation, Trans } from "react-i18next";

const HomePage = (props) => {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const nagivate = useNavigate();
  const { t } = useTranslation();
  return (
    <div className="homepage-container">
      <video autoPlay muted loop>
        <source src={videoHomepage} />
      </video>

      <div className="homepage-content">
        <div className="title-first">{t("homepage.title1")}</div>
        <div className="title-second">{t("homepage.title2")}</div>
        <div className="title-three">
          {isAuthenticated === false ? (
            <button className="btn-start" onClick={() => nagivate("/login")}>
              {t("homepage.title3.btn1")}
            </button>
          ) : (
            <button className="btn-start" onClick={() => nagivate("/users")}>
              {t("homepage.title3.btn2")}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
