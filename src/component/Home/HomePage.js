import videoHomepage from "../../assets/video-homepage.mp4";

const HomePage = () => {
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
        <button className="btn-start">Get's started</button>
      </div>
    </div>
  );
};

export default HomePage;
