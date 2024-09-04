import "./DashBoard.scss";
import {
  ResponsiveContainer,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
} from "recharts";
import { getOverView } from "../../../services/apiServices";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const DashBoard = (props) => {
  const { t } = useTranslation();

  const [dataOverView, setDataOverView] = useState([]);
  const [dataChart, setDataChart] = useState([]);

  useEffect(() => {
    fetchDataOverView();
  }, []);

  const fetchDataOverView = async () => {
    let res = await getOverView();
    let Qz = 0,
      Q = 0,
      As = 0;
    Qz = res?.DT?.others?.countQuiz ?? 0;
    Q = res?.DT?.others?.countQuestions ?? 0;
    As = res?.DT?.others?.countAnswers ?? 0;
    if (res && res.EC === 0) {
      setDataOverView(res.DT);
      const data = [
        {
          name: "Quizzes",
          Qz: Qz,
        },
        {
          name: "Questions",
          Q: Q,
        },
        {
          name: "Answers",
          As: As,
        },
      ];
      setDataChart(data);
    }
  };

  return (
    <div className="dashboard-container">
      <div className="title"> {t("DashBoard.title")}</div>
      <div className="content">
        <div className="c-left">
          <div className="child">
            <span className="text-1">{t("DashBoard.total_user")}</span>
            <span className="text-2">
              {dataOverView &&
              dataOverView.users &&
              dataOverView.users.total ? (
                <>{dataOverView.users.total}</>
              ) : (
                <>0</>
              )}
            </span>
          </div>
          <div className="child">
            <span className="text-1">{t("DashBoard.total_quiz")}</span>
            <span className="text-2">
              {dataOverView &&
              dataOverView.others &&
              dataOverView.others.countQuiz ? (
                <>{dataOverView.others.countQuiz}</>
              ) : (
                <>0</>
              )}
            </span>
          </div>
          <div className="child">
            <span className="text-1">{t("DashBoard.total_queston")}</span>
            <span className="text-2">
              {dataOverView &&
              dataOverView.others &&
              dataOverView.others.countQuestions ? (
                <>{dataOverView.others.countQuestions}</>
              ) : (
                <>0</>
              )}
            </span>
          </div>
          <div className="child">
            <span className="text-1">{t("DashBoard.total_answer")}</span>
            <span className="text-2">
              {" "}
              {dataOverView &&
              dataOverView.others &&
              dataOverView.others.countAnswers ? (
                <>{dataOverView.others.countAnswers}</>
              ) : (
                <>0</>
              )}
            </span>
          </div>
        </div>
        <div className="c-right">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={dataChart}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Qz" fill="#8884d8" />
              <Bar dataKey="Q" fill="#82ca9d" />
              <Bar dataKey="As" fill="#fcb12a" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
