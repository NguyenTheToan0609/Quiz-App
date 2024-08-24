import { useState } from "react";
import Select from "react-select";
import "./Questions.scss";
import { BsFillPatchPlusFill } from "react-icons/bs";
import { FaPlusCircle, FaMinusCircle } from "react-icons/fa";
import { BsFillPatchMinusFill } from "react-icons/bs";
import { RiImageAddFill } from "react-icons/ri";
import { v4 as uuidv4 } from "uuid";
import _, { cloneDeep, set } from "lodash";
const Questions = () => {
  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];
  const [selectedQuiz, setSelectedQuiz] = useState({});
  const [questions, setQuestions] = useState([
    {
      id: uuidv4(),
      descripton: "",
      imageName: "",
      imageFile: "",
      answers: [
        {
          id: uuidv4(),
          descripton: "",
          isCorrect: false,
        },
      ],
    },
  ]);

  const handleAddRemoveQuestion = (type, id) => {
    if (type === "ADD") {
      {
        const newQuestion = {
          id: uuidv4(),
          descripton: "",
          imageName: "",
          imageFile: "",
          answers: [
            {
              id: uuidv4(),
              descripton: "",
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
          descripton: "",
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
        questionsClone[index].descripton = value;
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
              answer.descripton = value;
            }
          }
          return answer;
        }
      );
    }
    setQuestions(questionsClone);
  };

  const handleSubmitQuetionForQuiz = () => {
    console.log("questions", questions);
  };

  return (
    <div className="questions-container">
      <div className="title">Manage Questions</div>
      <hr />
      <div className="add-new-questions">
        <div className="col-6 form-group">
          <label className="mb-2">Select quiz:</label>
          <Select
            defaultValue={selectedQuiz}
            onChange={setSelectedQuiz}
            options={options}
          />
        </div>
        <div className="mt-3 mb-2">Add questions:</div>

        {questions &&
          questions.length > 0 &&
          questions.map((question, index) => {
            return (
              <div key={question.id} className="q-main mb-4">
                <div className="questions-content">
                  <div className="form-floating description">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="name@example.com"
                      value={question.descripton}
                      onChange={(event) =>
                        handleOnChange(
                          "QUESTION",
                          question.id,
                          event.target.value
                        )
                      }
                    />
                    <label>Questions {index + 1} description </label>
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
                      {question.imageName
                        ? question.imageName
                        : "0 file is upload"}
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
                          className="form-check-input iscorrect"
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
                        <div className="form-floating answer-name ">
                          <input
                            value={answer.descripton}
                            type="text"
                            className="form-control"
                            placeholder="Answers"
                            onChange={(event) =>
                              hanleAnswerQuestion(
                                "INPUT",
                                answer.id,
                                question.id,
                                event.target.value
                              )
                            }
                          />
                          <label>Answers {index + 1}</label>
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
              Save Questions
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Questions;
