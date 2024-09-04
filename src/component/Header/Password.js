import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { postChangePassWord } from "../../services/apiServices";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

const Password = (props) => {
  const { t } = useTranslation();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");

  const handleClickChangePass = async () => {
    let res = await postChangePassWord(currentPassword, newPassword);
    if (res && res.EC === 0) {
      if (newPassword === confirmPassword) {
        setCurrentPassword(res.DT);
        toast.success(res.EM);
      }
    } else {
      toast.error(res.EM);
    }
    console.log("check", res);
  };

  return (
    <>
      <Modal.Body>
        <form className="row g-3">
          <div className="col-md-5">
            <label className="form-label"> {t("Password.currentPass")}</label>
            <input
              type="password"
              className="form-control"
              value={currentPassword}
              onChange={(event) => setCurrentPassword(event.target.value)}
            />
          </div>
          <div className="col-md-5">
            <label className="form-label">{t("Password.newPass")}</label>
            <input
              type="password"
              className="form-control"
              value={newPassword}
              onChange={(event) => setNewPassword(event.target.value)}
            />
          </div>
          <div className="col-md-5">
            <label className="form-label">{t("Password.confirmPass")}</label>
            <input
              type="password"
              className="form-control"
              value={confirmPassword}
              onChange={(event) => setconfirmPassword(event.target.value)}
            />
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="warning" onClick={() => handleClickChangePass()}>
          Update
        </Button>
      </Modal.Footer>
    </>
  );
};

export default Password;
