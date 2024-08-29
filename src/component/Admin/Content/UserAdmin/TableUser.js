import { useTranslation, Trans } from "react-i18next";

const TableUser = (props) => {
  const { t } = useTranslation();

  const {
    listUsers,
    handleClickBtnUpdate,
    handleClickBtnView,
    handleClickBtnDelete,
  } = props;

  return (
    <>
      <table className="table table-bordered table-hover">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">{t("TableUser.Username-tb")}</th>
            <th scope="col">Email</th>
            <th scope="col">{t("TableUser.Role-tb")}</th>
            <th scope="col">{t("TableUser.Action")}</th>
          </tr>
        </thead>
        <tbody>
          {listUsers &&
            listUsers.length > 0 &&
            listUsers.map((item, index) => {
              return (
                <tr key={`table-user-${index}`}>
                  <td>{item.id}</td>
                  <td>{item.username}</td>
                  <td>{item.email}</td>
                  <td>{item.role}</td>
                  <td
                    style={{
                      display: "flex",
                      gap: 10,
                      justifyContent: "center",
                    }}
                  >
                    <button
                      className="btn btn-secondary"
                      onClick={() => handleClickBtnView(item)}
                    >
                      {t("TableUser.View")}
                    </button>
                    <button
                      className="btn btn-warning mx-3"
                      onClick={() => handleClickBtnUpdate(item)}
                    >
                      {t("TableUser.Update")}
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleClickBtnDelete(item)}
                    >
                      {t("TableUser.Delete")}
                    </button>
                  </td>
                </tr>
              );
            })}

          {listUsers && listUsers.length === 0 && (
            <tr>
              <td colSpan={"4"}>Not found user</td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
};

export default TableUser;
