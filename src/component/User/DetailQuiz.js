import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getDataQuiz } from "../../services/apiServices";

const DetailQuiz = () => {
  const params = useParams();
  const quizId = params.id;

  useEffect(() => {
    fetchQuestion();
  }, [quizId]);

  const fetchQuestion = async () => {
    const res = await getDataQuiz(quizId);
    console.log("check res", res);
  };

  return (
    <div className="detail-quiz-container">
      DetailQuiz
      <div></div>
    </div>
  );
};

export default DetailQuiz;
