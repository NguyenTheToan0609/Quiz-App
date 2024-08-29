import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FcPlus } from "react-icons/fc";
import _ from "lodash";
import { useTranslation, Trans } from "react-i18next";

const ModalUpdateUser = (props) => {
  const { t } = useTranslation();

  const { show, setShow, dataView, resetViewData } = props;

  // const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
    setEmail("");
    setPassword("");
    setUsername("");
    setRole("USER");
    setImage("");
    setPreviewimage("");
    resetViewData();
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("USER");
  const [image, setImage] = useState("");
  const [previewImage, setPreviewimage] = useState("");

  useEffect(() => {
    if (!_.isEmpty(dataView)) {
      setEmail(dataView.email);
      setEmail(dataView.password);
      setUsername(dataView.username);
      setRole(dataView.role);
      setRole(dataView.image);
      if (dataView.image) {
        setPreviewimage(`data:image/jpeg;base64,${dataView.image}`);
      }
    }
  }, [dataView]);

  return (
    <>
      <Modal
        show={show}
        onHide={setShow}
        size="xl"
        backdrop="static"
        className="modal-add-user"
      >
        <Modal.Header closeButton>
          <Modal.Title>{t("ModalViewUser.title-view")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Email</label>
              <input
                disabled
                type="email"
                className="form-control"
                value={dataView.email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">
                {t("ModalViewUser.Password-view")}
              </label>
              <input
                disabled
                type="password"
                className="form-control"
                value={dataView.password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">
                {t("ModalViewUser.Username-view")}
              </label>
              <input
                disabled
                type="text"
                className="form-control"
                value={dataView.username}
                onChange={(event) => setUsername(event.target.value)}
              />
            </div>
            <div className="col-md-4">
              <label className="form-label">
                {t("ModalViewUser.Role-view")}
              </label>
              <select
                disabled
                className="form-select"
                value={dataView.role}
                onChange={(event) => setRole(event.target.value)}
              >
                <option value="USER">USER</option>
                <option value="ADMIN">ADMIN</option>
              </select>
            </div>
            <div className="col-md-12">
              <label className="form-label label-upload" htmlFor="labelUpload">
                <FcPlus />
                {t("ModalViewUser.UpLoad-view")}
              </label>
              <input disabled type="File" id="labelUpload" hidden />
            </div>
            <div className="col-md-12 img-preview">
              {previewImage ? (
                <img src={previewImage} />
              ) : (
                <span>Preview Image</span>
              )}
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            {t("ModalViewUser.Close-view")}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalUpdateUser;
