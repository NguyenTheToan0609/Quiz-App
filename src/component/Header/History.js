import { useEffect, useState } from "react";
import { getHistory } from "../../services/apiServices";
import moment from "moment";
import { useTranslation } from "react-i18next";

const History = () => {
  const { t } = useTranslation();
  const [listHistory, setListHistory] = useState([]);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    let res = await getHistory();
    if (res && res.EC === 0) {
      let newData = res?.DT?.data?.map((item) => {
        return {
          total_correct: item.total_correct,
          total_questions: item.total_questions,
          name: item.quizHistory?.name ?? "",
          id: item.id,
          date: moment(item.createdAt).utc().format("DD/MM/YYYY hh:mm:ss A"),
        };
      });
      if (newData.length > 7) {
        newData = newData.slice(newData.length - 7, newData.length);
      }
      setListHistory(newData);
    }
    console.log("check res", res);
  };

  return (
    <>
      <table className="table table-bordered table-hover">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">{t("History.quizName")}</th>
            <th scope="col">{t("History.totalQ")}</th>
            <th scope="col">{t("History.totalC")}</th>
            <th scope="col">{t("History.date")}</th>
          </tr>
        </thead>
        <tbody>
          {listHistory &&
            listHistory.length > 0 &&
            listHistory.map((item, index) => {
              return (
                <tr key={`table-history${index}`}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.total_questions}</td>
                  <td>{item.total_correct}</td>
                  <td>{item.date}</td>
                </tr>
              );
            })}

          {listHistory && listHistory.length === 0 && (
            <tr>
              <td colSpan={"4"}>Not found History</td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
};

export default History;
