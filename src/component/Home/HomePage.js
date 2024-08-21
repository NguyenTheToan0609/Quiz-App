import videoHomepage from "../../assets/video-homepage.mp4";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const HomePage = (props) => {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const nagivate = useNavigate();
  return (
    <div className="homepage-container">
      <video autoPlay muted loop>
        <source src={videoHomepage} />
      </video>

      <div className="homepage-content">
        <div className="title-first">Looks striking. Feels effortless.</div>
        <div className="title-second">
          Impress your form takers. Catch their eye with striking visuals, and
          make form-filling feel effortless by replacing walls of questions with
          just one at a time.
        </div>
        <div>
          {isAuthenticated === false ? (
            <button className="btn-start" onClick={() => nagivate("/login")}>
              Get's started
            </button>
          ) : (
            <button className="btn-start" onClick={() => nagivate("/users")}>
              Doing Quiz Now
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
