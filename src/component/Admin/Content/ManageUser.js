import ModalCreateUser from "./ModalCreateUser";

const ManagerUser = (props) => {
  return (
    <div classNameName="manage-user-container">
      <div classNameName="title">Manage User</div>
      <div classNameName="users-content">
        <button>Add new users</button>
      </div>
      <table classNameName="">
        table user
        <ModalCreateUser />
      </table>
    </div>
  );
};

export default ManagerUser;
