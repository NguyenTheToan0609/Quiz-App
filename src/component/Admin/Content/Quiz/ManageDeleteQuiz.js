import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { deleteQuizForAdmin } from "../../../../services/apiServices";
import { toast } from "react-toastify";
import { useTranslation, Trans } from "react-i18next";

const ManageDeleteQuiz = (props) => {
  const { t } = useTranslation();

  const { show, setShow, dataDelete, fetchQuiz } = props;

  const handleClose = () => setShow(false);

  const handleSubmitDeleteQuiz = async () => {
    let data = await deleteQuizForAdmin(dataDelete.id);

    if (data && data.EC === 0) {
      toast.success(data.EM);
      handleClose();
      await fetchQuiz();
    }
    if (data && data.EC !== 0) {
      toast.error(data.EM);
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>{t("ManageDeleteQuiz.title")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {t("ManageDeleteQuiz.title2")} id =
          <b>{dataDelete && dataDelete.id ? dataDelete.id : ""}</b>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            {t("ManageDeleteQuiz.Cancel")}
          </Button>
          <Button variant="primary" onClick={() => handleSubmitDeleteQuiz()}>
            {t("ManageDeleteQuiz.Confirm")}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ManageDeleteQuiz;
