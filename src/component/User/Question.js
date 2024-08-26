import _ from "lodash";
import { useState } from "react";
import Lightbox from "react-awesome-lightbox";
import { BsCursor } from "react-icons/bs";

const Question = (props) => {
  const { data, index, handleCheckBox } = props;
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
        Question {index + 1} : {data.questionDescription}
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
                    onChange={(event) =>
                      handleOnChangeCheckBox(event, a.id, data.questionID)
                    }
                  />
                  <label className="form-check-label">{a.description}</label>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default Question;
