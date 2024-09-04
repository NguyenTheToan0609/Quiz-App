import { useState, useEffect } from "react";
import "./ManageQuiz.scss";
import Select from "react-select";
import {
  postCreateNewQuiz,
  getAllQuizForAdmin,
} from "../../../../services/apiServices";
import { toast } from "react-toastify";
import TableQuiz from "./TableQuiz";
import Accordion from "react-bootstrap/Accordion";
import QuizQA from "./QuizQA";
import AssignQuiz from "./AssignQuiz";
import { useTranslation, Trans } from "react-i18next";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

const options = [
  { value: "EASY", label: "EASY" },
  { value: "MEDIUM", label: "MEDIUM" },
  { value: "HARD", label: "HARD" },
];

const ManageQuiz = () => {
  const { t } = useTranslation();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [image, setImage] = useState(null);
  const handleChangeEvent = (event) => {
    if (event.target && event.target.files && event.target.files[0]) {
      setImage(event.target.files[0]);
    }
  };

  const handleSubmitQuiz = async () => {
    if (!name || !description) {
      toast.error("Name/Description is requierd");
      return;
    }

    let res = await postCreateNewQuiz(description, name, type?.value, image);
    if (res && res.EC === 0) {
      toast.success(res.EM);
      setName("");
      setDescription("");
      setType("");
    }
    if (res && res.EC !== 0) {
      toast.error(res.EM);
    }
  };

  return (
    <div className="quiz-conatiner">
      <Tabs
        defaultActiveKey="profile"
        id="uncontrolled-tab-example"
        className="mb-3"
        justify
      >
        <Tab
          className="p-3 pt-0"
          eventKey="Manage_Quiz"
          title={t("ManageQuiz.managequiz")}
        >
          <div className="add-new">
            <fieldset className="border rounded-3 p-3">
              <legend className="float-none w-auto px-3">
                {t("ManageQuiz.Title")}
              </legend>
              <div className="form-floating mb-4">
                <input
                  type="text"
                  className="form-control"
                  placeholder="name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                />
                <label>{t("ManageQuiz.Name")}</label>
              </div>
              <div className="form-floating">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Description"
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                />
                <label>{t("ManageQuiz.Description")}</label>
              </div>
              <div className="my-3">
                <Select
                  defaultValue={type}
                  onChange={setType}
                  options={options}
                  placeholder={t("ManageQuiz.QuizType")}
                />
              </div>

              <div className="more-actions form-group">
                <label className="mb-1">{t("ManageQuiz.UpLoad")}</label>
                <input
                  type="file"
                  className="form-control"
                  onClick={(event) => handleChangeEvent(event)}
                />
              </div>
              <div>
                <button
                  className="btn btn-primary mt-3"
                  onClick={() => handleSubmitQuiz()}
                >
                  {t("ManageQuiz.Save")}
                </button>
              </div>
            </fieldset>
          </div>
          <div className="list-detail">
            <TableQuiz />
          </div>
        </Tab>
        <Tab
          className="p-3 pt-0"
          eventKey="Update_Quiz"
          title={t("ManageQuiz.UpdateQA")}
        >
          <QuizQA />
        </Tab>
        <Tab
          className="p-3 pt-0"
          eventKey="Assign"
          title={t("ManageQuiz.Assign")}
        >
          <AssignQuiz />
        </Tab>
      </Tabs>
    </div>
  );
};

export default ManageQuiz;
