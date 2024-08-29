import { useState, useEffect } from "react";
import Select from "react-select";
import "./Questions.scss";
import { BsFillPatchPlusFill } from "react-icons/bs";
import { FaPlusCircle, FaMinusCircle } from "react-icons/fa";
import { BsFillPatchMinusFill } from "react-icons/bs";
import { RiImageAddFill } from "react-icons/ri";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import _ from "lodash";
import { useTranslation, Trans } from "react-i18next";

import {
  getAllQuizForAdmin,
  postCreateNewQuestionForQuiz,
  postCreateNewAnswerForQuiz,
} from "../../../../services/apiServices";

import Lightbox from "react-awesome-lightbox";

const Questions = () => {
  const { t } = useTranslation();

  const initQuestions = [
    {
      id: uuidv4(),
      description: "",
      imageName: "",
      imageFile: "",
      answers: [
        {
          id: uuidv4(),
          description: "",
          isCorrect: false,
        },
      ],
    },
  ];
  const [questions, setQuestions] = useState(initQuestions);

  const [isPreViewImage, setIsPreViewImage] = useState(false);
  const [dateImagePreview, setDateImagePreview] = useState({
    title: "",
    url: "",
  });
  const [listQuiz, setListQuiz] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState({});

  useEffect(() => {
    fetchQuiz();
  }, []);

  const fetchQuiz = async () => {
    let res = await getAllQuizForAdmin();
    if (res && res.EC === 0) {
      let newQuiz = res.DT.map((item) => {
        return {
          value: item.id,
          label: `${item.id}-${item.description}`,
        };
      });
      setListQuiz(newQuiz);
    }
  };

  const handleAddRemoveQuestion = (type, id) => {
    if (type === "ADD") {
      {
        const newQuestion = {
          id: uuidv4(),
          description: "",
          imageName: "",
          imageFile: "",
          answers: [
            {
              id: uuidv4(),
              description: "",
              isCorrect: false,
            },
          ],
        };
        setQuestions([...questions, newQuestion]);
      }
    }
    if (type === "REMOVE") {
      let questionsClone = _.cloneDeep(questions);
      questionsClone = questionsClone.filter((item) => item.id !== id);
      setQuestions(questionsClone);
    }
  };

  const handleAddRemoveAnswer = (type, questionID, answerID) => {
    let questionsClone = _.cloneDeep(questions);
    if (type === "ADD") {
      {
        const newAnswer = {
          id: uuidv4(),
          description: "",
          isCorrect: false,
        };
        let index = questionsClone.findIndex((item) => item.id === questionID);
        questionsClone[index].answers.push(newAnswer);
        setQuestions(questionsClone);
      }
    }
    if (type === "REMOVE") {
      let index = questionsClone.findIndex((item) => item.id === questionID);
      questionsClone[index].answers = questionsClone[index].answers.filter(
        (item) => item.id !== answerID
      );
      setQuestions(questionsClone);
    }
  };

  const handleOnChange = (type, questionID, value) => {
    let questionsClone = _.cloneDeep(questions);
    if (type === "QUESTION") {
      let index = questionsClone.findIndex((item) => item.id === questionID);
      if (index > -1) {
        questionsClone[index].description = value;
        setQuestions(questionsClone);
      }
    }
  };

  const hanOnChangeFileQuestion = (questionID, event) => {
    let questionsClone = _.cloneDeep(questions);

    let index = questionsClone.findIndex((item) => item.id === questionID);
    if (
      index > -1 &&
      event.target &&
      event.target.files &&
      event.target.files[0]
    ) {
      questionsClone[index].imageFile = event.target.files[0];
      console.log("check file ", event.target.files[0]);
      questionsClone[index].imageName = event.target.files[0].name;
      setQuestions(questionsClone);
    }
  };

  const hanleAnswerQuestion = (type, answerID, questionID, value) => {
    let questionsClone = _.cloneDeep(questions);
    let index = questionsClone.findIndex((item) => item.id === questionID);
    if (index > -1) {
      questionsClone[index].answers = questionsClone[index].answers.map(
        (answer) => {
          if (answer.id === answerID) {
            if (type === "CHECKBOX") {
              answer.isCorrect = value;
            }
            if (type === "INPUT") {
              answer.description = value;
            }
          }
          return answer;
        }
      );
    }
    setQuestions(questionsClone);
  };

  const handlePreviewImage = (questionID) => {
    let questionsClone = _.cloneDeep(questions);
    let index = questionsClone.findIndex((item) => item.id === questionID);
    if (index > -1) {
      setDateImagePreview({
        url: URL.createObjectURL(questionsClone[index].imageFile),
        title: questionsClone[index].imageName,
      });
    }
    setIsPreViewImage(true);
  };

  const handleSubmitQuetionForQuiz = async () => {
    //Valid Quiz
    if (_.isEmpty(selectedQuiz)) {
      toast.error("Please choose a Quiz");
      return;
    }

    //Valid Answers
    let isValidAnswer = true;
    let indexQ = 0,
      indexA = 0;
    for (let i = 0; i < questions.length; i++) {
      for (let j = 0; j < questions[i].answers.length; j++) {
        if (!questions[i].answers[j].description) {
          isValidAnswer = false;
          indexA = j;
          break;
        }
      }
      indexQ = i;
      if (isValidAnswer === false) break;
    }

    if (isValidAnswer === false) {
      toast.error(`Not empty Answers ${indexA + 1} at Questions ${indexQ + 1}`);
      return;
    }

    //Valid Questions
    let isValidQ = true;
    let indexQ1 = 0;
    for (let i = 0; i < questions.length; i++) {
      if (!questions[i].description) {
        isValidQ = false;
        indexQ1 = i;
        break;
      }
    }
    if (isValidQ === false) {
      toast.error(`Not empty description for question ${indexQ1 + 1}`);
      return;
    }

    //submit questions
    for (const question of questions) {
      const q = await postCreateNewQuestionForQuiz(
        +selectedQuiz.value,
        question.description,
        question.imageFile
      );

      //submit answers
      for (const answer of question.answers) {
        await postCreateNewAnswerForQuiz(
          answer.description,
          answer.isCorrect,
          q.DT.id
        );
      }
    }
    toast.success("Create questions and answers success ");
    setQuestions(initQuestions);
  };

  return (
    <div className="questions-container">
      <div className="title">{t("Questions.title")}</div>
      <hr />
      <div className="add-new-questions">
        <div className="col-6 form-group">
          <label className="mb-2">{t("Questions.SelectQuiz")}:</label>
          <Select
            defaultValue={selectedQuiz}
            onChange={setSelectedQuiz}
            options={listQuiz}
          />
        </div>
        <div className="mt-4 mb-2">{t("Questions.AddQuestion")}:</div>

        {questions &&
          questions.length > 0 &&
          questions.map((question, index) => {
            return (
              <div key={question.id} className="q-main mb-4">
                <div className="questions-content">
                  <div className="mb-3 description">
                    <input
                      type="text"
                      value={question.description}
                      className="form-control"
                      onChange={(event) =>
                        handleOnChange(
                          "QUESTION",
                          question.id,
                          event.target.value
                        )
                      }
                      placeholder={`Questions ${index + 1} description`}
                    />
                  </div>

                  <div className="group-Upload">
                    <label htmlFor={`${question.id}`}>
                      <RiImageAddFill className="label-upload" />
                    </label>
                    <input
                      id={`${question.id}`}
                      type="file"
                      hidden
                      onChange={(event) =>
                        hanOnChangeFileQuestion(question.id, event)
                      }
                    />
                    <span>
                      {question.imageName ? (
                        <span
                          style={{ cursor: "pointer" }}
                          onClick={() => handlePreviewImage(question.id)}
                        >
                          {question.imageName}
                        </span>
                      ) : (
                        "0 file is upload"
                      )}
                    </span>
                  </div>
                  <div className="btn-group">
                    <span onClick={() => handleAddRemoveQuestion("ADD", "")}>
                      <BsFillPatchPlusFill className="icon-add" />
                    </span>

                    {questions.length > 1 && (
                      <span
                        onClick={() =>
                          handleAddRemoveQuestion("REMOVE", question.id)
                        }
                      >
                        <BsFillPatchMinusFill className="icon-remove" />
                      </span>
                    )}
                  </div>
                </div>

                {question.answers &&
                  question.answers.length > 0 &&
                  question.answers.map((answer, index) => {
                    return (
                      <div key={answer.id} className="answers-content">
                        <input
                          className="form-check-input iscorrect "
                          style={{ marginBottom: "15px" }}
                          type="checkbox"
                          checked={answer.isCorrect}
                          onChange={(event) =>
                            hanleAnswerQuestion(
                              "CHECKBOX",
                              answer.id,
                              question.id,
                              event.target.checked
                            )
                          }
                        />

                        <div className="mb-3 answer-name">
                          <input
                            value={answer.description}
                            type="text"
                            className="form-control"
                            onChange={(event) =>
                              hanleAnswerQuestion(
                                "INPUT",
                                answer.id,
                                question.id,
                                event.target.value
                              )
                            }
                            placeholder={`Answers ${index + 1}`}
                          />
                        </div>

                        <div className="btn-group">
                          <span
                            onClick={() =>
                              handleAddRemoveAnswer("ADD", question.id)
                            }
                          >
                            <FaPlusCircle className="icon-add" />
                          </span>

                          {question.answers.length > 1 && (
                            <span
                              onClick={() =>
                                handleAddRemoveAnswer(
                                  "REMOVE",
                                  question.id,
                                  answer.id
                                )
                              }
                            >
                              <FaMinusCircle className="icon-remove" />
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
              </div>
            );
          })}

        {questions && questions.length > 0 && (
          <div>
            <button
              onClick={() => handleSubmitQuetionForQuiz()}
              className="btn btn-warning"
            >
              {t("Questions.Save")}
            </button>
          </div>
        )}

        {isPreViewImage === true && (
          <Lightbox
            image={dateImagePreview.url}
            title={dateImagePreview.title}
            onClose={() => setIsPreViewImage(false)}
          ></Lightbox>
        )}
      </div>
    </div>
  );
};

export default Questions;
