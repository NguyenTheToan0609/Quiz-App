import { useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { getDataQuiz } from "../../services/apiServices";
import _ from "lodash";
import "./DetailQuiz.scss";

const DetailQuiz = () => {
  const params = useParams();
  const location = useLocation();
  console.log(location);
  const quizId = params.id;

  useEffect(() => {
    fetchQuestion();
  }, [quizId]);

  const fetchQuestion = async () => {
    const res = await getDataQuiz(quizId);
    if (res && res.EC === 0) {
      let raw = res.DT;
      let data = _.chain(raw)
        // Group the elements of Array based on `color` property
        .groupBy("id")

        .map((value, key) => {
          let answers = [];
          let questionDescription,
            image = null;
          value.forEach((item, index) => {
            if (index === 0) {
              questionDescription = item.description;
              image = item.image;
            }
            answers.push(item.answers);
          });
          console.log("value :", value, "key", key);

          return { questionID: key, answers, questionDescription, image };
        })
        .value();
      console.log(data);
      // console.log("check data", data);
    }
  };

  return (
    <div className="detail-quiz-container">
      <div className="left-content">
        <div className="title">
          Quiz {quizId} : {location?.state?.quizDetail}
          <hr />
        </div>
        <div className="q-body">
          <img />
        </div>
        <div className="q-content">
          <div className="question">Question 1 : How are you doing?</div>
          <div className="answer">
            <div className="a-child"> A. asdsdqwwew</div>
            <div className="a-child"> B. asdsdqwwew</div>
            <div className="a-child"> C. asdsdqwwew</div>
          </div>
        </div>

        <div className="footer">
          <button className="btn btn-danger">Prev</button>
          <button className="btn btn-primary">Next</button>
        </div>
      </div>
      <div className="right-content">Count down</div>
    </div>
  );
};

export default DetailQuiz;
