import { useEffect, useState } from "react";
import { getAllQuizForAdmin } from "../../../../services/apiServices";
import ManageUpdateQuiz from "./ManageUpdateQuiz";
import ManageDeleteQuiz from "./ManageDeleteQuiz";
import { useTranslation, Trans } from "react-i18next";

const TableQuiz = (props) => {
  const { t } = useTranslation();

  const [listQuiz, setListQuiz] = useState([]);
  const [isShowModalUpdate, setIsShowModalUpdate] = useState(false);
  const [isShowModalDelete, setIsShowModalDelete] = useState(false);
  const [dataUpdate, setDataUpdate] = useState({});
  const [dataDelete, setDataDelete] = useState({});

  useEffect(() => {
    fetchQuiz();
  }, []);

  const fetchQuiz = async () => {
    setDataUpdate({});
    let res = await getAllQuizForAdmin();
    if (res && res.EC === 0) {
      setListQuiz(res.DT);
    }
  };

  const handleUpdate = (quiz) => {
    setDataUpdate(quiz);
    setIsShowModalUpdate(true);
  };

  const handleDelete = (quiz) => {
    setDataDelete(quiz);
    setIsShowModalDelete(true);
  };

  return (
    <>
      <div>List Quizs</div>
      <table class="table table-bordered table-hover mt-2">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">{t("TableQuiz.Name")}</th>
            <th scope="col">{t("TableQuiz.Description")}</th>
            <th scope="col">{t("TableQuiz.QuizType")}</th>
            <th scope="col">{t("TableQuiz.Action")}</th>
          </tr>
        </thead>
        <tbody>
          {listQuiz &&
            listQuiz.length > 0 &&
            listQuiz.map((item, index) => {
              return (
                <tr key={`quiz-${index}`}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.description}</td>
                  <td>{item.difficulty}</td>
                  <td
                    style={{
                      display: "flex",
                      gap: 10,
                      justifyContent: "center",
                    }}
                  >
                    <button
                      className="btn btn-warning"
                      onClick={() => handleUpdate(item)}
                    >
                      {t("TableQuiz.Edit")}
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(item)}
                    >
                      {t("TableQuiz.Delete")}
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>

      <ManageUpdateQuiz
        show={isShowModalUpdate}
        setShow={setIsShowModalUpdate}
        dataUpdate={dataUpdate}
        setDataUpdate={setDataUpdate}
        fetchQuiz={fetchQuiz}
      />

      <ManageDeleteQuiz
        show={isShowModalDelete}
        setShow={setIsShowModalDelete}
        dataDelete={dataDelete}
        fetchQuiz={fetchQuiz}
      />
    </>
  );
};

export default TableQuiz;
