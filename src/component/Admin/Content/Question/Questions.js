import { useState } from "react";
import Select from "react-select";
import "./Questions.scss";
import { BsFillPatchPlusFill } from "react-icons/bs";
import { FaPlusCircle, FaMinusCircle } from "react-icons/fa";
import { BsFillPatchMinusFill } from "react-icons/bs";
import { RiImageAddFill } from "react-icons/ri";
import { v4 as uuidv4 } from "uuid";
import _, { cloneDeep } from "lodash";
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
      descripton: "questions 1",
      imageName: "",
      imageFile: "",
      answers: [
        {
          id: uuidv4(),
          descripton: "answer 1",
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

  console.log("question", questions);
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
                    />
                    <label>Questions {index + 1} description </label>
                  </div>
                  <div className="group-Upload">
                    <label className="label-upload">
                      <RiImageAddFill />
                    </label>
                    <input type="file" hidden />
                    <span>0 file is upload</span>
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
                        />
                        <div className="form-floating answer-name ">
                          <input
                            value={answer.descripton}
                            type="text"
                            className="form-control"
                            placeholder="Answers"
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
      </div>
    </div>
  );
};

export default Questions;
