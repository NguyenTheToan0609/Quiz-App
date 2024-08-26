import Select from "react-select";
import { useState, useEffect } from "react";
import {
  getAllQuizForAdmin,
  getAllUser,
} from "../../../../services/apiServices";

const AssignQuiz = (props) => {
  const [listQuiz, setListQuiz] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState({});

  const [listUser, setListUser] = useState([]);
  const [selectedUser, setSelectedUser] = useState({});

  useEffect(() => {
    fetchQuiz();
    fetchUser();
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

  const fetchUser = async () => {
    let res = await getAllUser();
    if (res && res.EC === 0) {
      console.log("check res", res);
      let user = res.DT.map((item) => {
        return {
          value: item.id,
          label: `${item.id}-${item.username}-${item.email}`,
        };
      });
      setListUser(user);
    }
  };

  return (
    <div className="assign-container row">
      <div className="col-6 form-group ">
        <label className="mb-2">Select quiz:</label>
        <Select
          defaultValue={selectedQuiz}
          onChange={setSelectedQuiz}
          options={listQuiz}
        />
      </div>
      <div className="col-6 form-group ">
        <label className="mb-2">Select User:</label>
        <Select
          defaultValue={selectedUser}
          onChange={setSelectedUser}
          options={listUser}
        />
      </div>

      <div>
        <button className="btn btn-warning mt-3">Assign</button>
      </div>
    </div>
  );
};

export default AssignQuiz;
