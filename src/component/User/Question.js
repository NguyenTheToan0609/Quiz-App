import _ from "lodash";
import { useState } from "react";
import Lightbox from "react-awesome-lightbox";
import { BsCursor } from "react-icons/bs";
import { useTranslation, Trans } from "react-i18next";
import { IoIosClose, IoIosCheckmark } from "react-icons/io";
const Question = (props) => {
  const { t } = useTranslation();

  const { data, index, handleCheckBox, isShowAnswer, isSubmitQuiz } = props;
  const [isPreViewImage, setIsPreViewImage] = useState(false);

  if (_.isEmpty(data)) {
    return <></>;
  }

  const handleOnChangeCheckBox = (event, aId, qId) => {
    handleCheckBox(aId, qId);
  };

  return (
    <>
      {data.image ? (
        <div className="q-image">
          <img
            style={{ cursor: "pointer" }}
            src={`data:image/jpeg;base64,${data.image}`}
            onClick={() => setIsPreViewImage(true)}
          />
          {isPreViewImage === true && (
            <Lightbox
              image={`data:image/jpeg;base64,${data.image}`}
              title={"Question Image"}
              onClose={() => setIsPreViewImage(false)}
            ></Lightbox>
          )}
        </div>
      ) : (
        <div className="q-image"></div>
      )}

      <div className="question">
        {t("question.question")} {index + 1} : {data.questionDescription}
      </div>
      <div className="answer">
        {data.answers &&
          data.answers.length > 0 &&
          data.answers.map((a, index) => {
            return (
              <div key={`answer-${index}`} className="a-child">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    checked={a.isSelected}
                    disabled={isSubmitQuiz}
                    onChange={(event) =>
                      handleOnChangeCheckBox(event, a.id, data.questionId)
                    }
                  />
                  <label className="form-check-label">{a.description}</label>

                  {isShowAnswer === true && (
                    <>
                      {a.isSelected === true && a.isCorrect === false && (
                        <IoIosClose className="incorrect" />
                      )}
                      {a.isCorrect === true && (
                        <IoIosCheckmark className="correct" />
                      )}
                    </>
                  )}
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default Question;
