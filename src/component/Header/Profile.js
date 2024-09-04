import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import UserInFor from "./UserInFor";
import Password from "./Password";
import History from "./History";
import { useTranslation } from "react-i18next";

function Profile(props) {
  const { t } = useTranslation();
  const { show, setShow } = props;

  const handleClose = () => setShow(false);

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        size="xl"
        backdrop="static"
        className="modal-profile"
      >
        <Modal.Header closeButton>
          <Modal.Title>{t("Profile.title")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Tabs
            defaultActiveKey="profile"
            id="uncontrolled-tab-example"
            className="mb-3"
          >
            <Tab eventKey="profile" title={t("Profile.user_info")}>
              <UserInFor />
            </Tab>
            <Tab eventKey="password" title={t("Profile.changepass")}>
              <Password />
            </Tab>
            <Tab eventKey="History" title={t("Profile.history")}>
              <History />
            </Tab>
          </Tabs>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Profile;
