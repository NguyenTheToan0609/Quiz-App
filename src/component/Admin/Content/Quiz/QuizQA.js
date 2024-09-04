import { useState, useEffect } from "react";
import Select from "react-select";
import "./QuizQA.scss";
import { BsFillPatchPlusFill } from "react-icons/bs";
import { FaPlusCircle, FaMinusCircle } from "react-icons/fa";
import { BsFillPatchMinusFill } from "react-icons/bs";
import { RiImageAddFill } from "react-icons/ri";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import _ from "lodash";
import { useTranslation, Trans } from "react-i18next";

import {
  getQuizWithQA,
  getAllQuizForAdmin,
  postCreateNewQuestionForQuiz,
  postCreateNewAnswerForQuiz,
  postUpsertQA,
} from "../../../../services/apiServices";

import Lightbox from "react-awesome-lightbox";

const QuizQA = () => {
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

  useEffect(() => {
    if (selectedQuiz && selectedQuiz.value) {
      fetchWithQuizQA();
    }
  }, [selectedQuiz]);

  //Cần convert từ base64 về file để hiển thị:
  function dataURLtoFile(dataurl, filename) {
    var arr = dataurl.split(","),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[arr.length - 1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  }

  const fetchWithQuizQA = async () => {
    let res = await getQuizWithQA(selectedQuiz.value);
    if (res && res.EC === 0) {
      //consver base64 to file object
      let newQA = [];
      for (let i = 0; i < res.DT.qa.length; i++) {
        let q = res.DT.qa[i];

        if (q.imageFile) {
          q.imageName = `Question-${q.id}.png`;
          q.imageFile = dataURLtoFile(
            await `data:image/png;base64,${q.imageFile}`,
            `Question-${q.id}.png`,
            "image/png"
          );
        }
        newQA.push(q);
      }
      setQuestions(newQA);
    }
  };

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

    let questionsClone = _.cloneDeep(questions);
    for (let i = 0; i < questionsClone.length; i++) {
      if (questionsClone[i].imageFile) {
        questionsClone[i].imageFile = await toBase64(
          questionsClone[i].imageFile
        );
      }
    }
    let res = await postUpsertQA({
      quizId: selectedQuiz.value,
      questions: questionsClone,
    });
    if (res && res.EC === 0) {
      toast.success("Save questions and answers success ");
      fetchWithQuizQA();
    }
  };

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
    });

  return (
    <div className="questions-container">
      <div className="add-new-questions">
        <div className="col-6 form-group">
          <label className="mb-2">{t("QuizQA.SelectQuiz")}:</label>
          <Select
            defaultValue={selectedQuiz}
            onChange={setSelectedQuiz}
            options={listQuiz}
          />
        </div>
        <div className="mt-4 mb-2">{t("QuizQA.AddQuestion")}:</div>

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
              {t("QuizQA.Save")}
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

export default QuizQA;
