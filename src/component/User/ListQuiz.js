import { useEffect, useState } from "react";
import { getQuizByuser } from "../../services/apiServices";
import { useNavigate } from "react-router-dom";
import "./ListQuiz.scss";

const ListQuiz = () => {
  const navigate = useNavigate();

  const [arrQuiz, setArrQuiz] = useState([]);
  useEffect(() => {
    getQuizData();
  }, []);

  const getQuizData = async () => {
    const res = await getQuizByuser();
    if (res && res.EC === 0) {
      setArrQuiz(res.DT);
    }
  };
  return (
    <div className="list-quiz-container">
      {arrQuiz &&
        arrQuiz.length > 0 &&
        arrQuiz.map((item, index) => {
          return (
            <div
              key={`${index}-quiz`}
              className="card"
              style={{ width: "18rem" }}
            >
              <img
                className="card-img-top"
                src={`data:image/jpeg;base64,${item.image}`}
                alt="Card image cap"
              />
              <div className="card-body">
                <h5 className="card-title">Quiz {index + 1}</h5>
                <p className="card-text">{item.description}</p>
                <button
                  className="btn btn-primary"
                  onClick={() => navigate(`/quiz/${item.id}`)}
                >
                  Start Now
                </button>
              </div>
            </div>
          );
        })}

      {arrQuiz && arrQuiz.length === 0 && <div>You don't have Quiz Now</div>}
    </div>
  );
};

export default ListQuiz;
