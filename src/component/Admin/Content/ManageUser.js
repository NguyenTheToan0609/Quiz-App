import ModalCreateUser from "./ModalCreateUser";
import "./ManageUser.scss";

const ManagerUser = (props) => {
  return (
    <div className="manage-user-container">
      <div className="title">Manage User</div>

      <div className="users-content">
        <div className="btn-add-new">
          <button>Add new users</button>
        </div>

        <div className="table-users-container">table user</div>
        <ModalCreateUser />
      </div>
    </div>
  );
};

export default ManagerUser;
