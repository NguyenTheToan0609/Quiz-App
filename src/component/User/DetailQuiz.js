import { useEffect, useState } from "react";
import { useParams, useLocation, NavLink } from "react-router-dom";
import { getDataQuiz, postSubmitQuiz } from "../../services/apiServices";
import Question from "./Question";
import _ from "lodash";
import "./DetailQuiz.scss";
import ModalResult from "./ModalResult";
import RightContent from "./Content/RightContent";
import { useTranslation, Trans } from "react-i18next";
import { Breadcrumb } from "react-bootstrap";

const DetailQuiz = () => {
  const { t } = useTranslation();

  const params = useParams();
  const location = useLocation();
  const quizId = params.id;
  const [dataQuiz, setDataQuiz] = useState([]);
  const [index, setIndex] = useState(0);
  const [isSubmitQuiz, setIsSubmitQuiz] = useState(false);
  const [isShowAnswer, setIsShowAnswer] = useState(false);

  const [isShowModelReult, setIsShowModelReult] = useState(false);
  const [dataModalResult, setDataModalResult] = useState({});

  useEffect(() => {
    fetchQuestion();
  }, [quizId]);

  const fetchQuestion = async () => {
    const res = await getDataQuiz(quizId);
    if (res && res.EC === 0) {
      let raw = res.DT;
      let data = _.chain(raw)
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
            item.answers.isSelected = false;
            item.answers.isCorrect = false;
            answers.push(item.answers);
          });
          answers = _.orderBy(answers, ["id", ["asc"]]);

          return { questionId: key, answers, questionDescription, image };
        })
        .value();
      setDataQuiz(data);
      // console.log("check data", data);
    }
  };

  const handlePrev = () => {
    if (index - 1 < 0) return;
    setIndex(index - 1);
  };

  const handleNext = () => {
    if (dataQuiz && dataQuiz.length > index + 1) setIndex(index + 1);
  };

  const handleCheckBox = (answerId, questionId) => {
    let dataQuizClone = _.cloneDeep(dataQuiz);
    let question = dataQuizClone.find(
      (item) => +item.questionId === +questionId
    );
    if (question && question.answers) {
      question.answers = question.answers.map((item) => {
        if (+item.id === +answerId) {
          item.isSelected = !item.isSelected;
        }
        return item;
      });
    }
    let index = dataQuizClone.findIndex(
      (item) => +item.questionId === +questionId
    );
    if (index > -1) {
      dataQuizClone[index] = question;
      setDataQuiz(dataQuizClone);
    }
  };

  const handleFinish = async () => {
    let payload = {
      quizId: +quizId,
      answers: [],
    };
    let answers = [];
    if (dataQuiz && dataQuiz.length > 0) {
      dataQuiz.forEach((question) => {
        let questionId = question.questionId;
        let userAnswerId = [];

        question.answers.forEach((a) => {
          if (a.isSelected === true) {
            userAnswerId.push(a.id);
          }
        });
        answers.push({
          questionId: +questionId,
          userAnswerId: userAnswerId,
        });
      });

      payload.answers = answers;
      //submit api
      let res = await postSubmitQuiz(payload);
      if (res && res.EC === 0) {
        setIsSubmitQuiz(true);
        setDataModalResult({
          countCorrect: res.DT.countCorrect,
          countTotal: res.DT.countTotal,
          quizData: res.DT.quizData,
        });
        setIsShowModelReult(true);

        //update DataQuiz with correct answer
        if (res.DT && res.DT.quizData) {
          let dataQuizClone = _.cloneDeep(dataQuiz);
          let a = res.DT.quizData;
          for (let q of a) {
            for (let i = 0; i < dataQuizClone.length; i++) {
              if (+q.questionId === +dataQuizClone[i].questionId) {
                //update answer
                let newAnswers = [];
                for (let j = 0; j < dataQuizClone[i].answers.length; j++) {
                  let s = q.systemAnswers.find(
                    (item) => +item.id === +dataQuizClone[i].answers[j].id
                  );
                  if (s) {
                    dataQuizClone[i].answers[j].isCorrect = true;
                  }
                  newAnswers.push(dataQuizClone[i].answers[j]);
                }
                dataQuizClone[i].answers = newAnswers;
              }
            }
          }
          setDataQuiz(dataQuizClone);
        }
      } else {
        alert("somthing wrongs....");
      }
    }
  };

  const handleShowAnswer = () => {
    if (!isSubmitQuiz) return;
    setIsShowAnswer(true);
  };

  return (
    <>
      <Breadcrumb className="quiz-detail-new-header">
        <NavLink to="/" className="breadcrumb-item">
          {t("header.home")}
        </NavLink>
        <NavLink to="/users" className="breadcrumb-item">
          {t("header.user")}
        </NavLink>
        <Breadcrumb.Item active> {t("header.quiz")}</Breadcrumb.Item>
      </Breadcrumb>
      <div className="detail-quiz-container">
        <div className="left-content">
          <div className="title">
            {t("detailquiz.quiz1")} {quizId} : {location?.state?.quizDetail}
            <hr />
          </div>
          {/* <div className="q-body">
          <img />
        </div> */}
          <div className="q-content">
            <Question
              index={index}
              handleCheckBox={handleCheckBox}
              isShowAnswer={isShowAnswer}
              isSubmitQuiz={isSubmitQuiz}
              data={dataQuiz && dataQuiz.length > 0 ? dataQuiz[index] : []}
            />
          </div>

          <div className="footer">
            <button className="btn btn-danger" onClick={() => handlePrev()}>
              {t("detailquiz.prve")}
            </button>
            <button className="btn btn-primary" onClick={() => handleNext()}>
              {t("detailquiz.next")}
            </button>
            <button
              disabled={isSubmitQuiz}
              className="btn btn-warning"
              onClick={() => handleFinish()}
            >
              {t("detailquiz.Finish")}
            </button>
          </div>
        </div>
        <div className="right-content">
          <RightContent
            dataQuiz={dataQuiz}
            handleFinish={handleFinish}
            setIndex={setIndex}
          />
        </div>
        <ModalResult
          show={isShowModelReult}
          setShow={setIsShowModelReult}
          dataModalResult={dataModalResult}
          handleShowAnswer={handleShowAnswer}
        />
      </div>
    </>
  );
};

export default DetailQuiz;
