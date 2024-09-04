import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

const ModalResult = (props) => {
  const { t } = useTranslation();
  const { show, setShow, dataModalResult } = props;

  const handleClose = () => setShow(false);

  return (
    <>
      <Modal show={show} onHide={handleClose} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>{t("ModalResult.title")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            {t("ModalResult.totalQ")}: <b>{dataModalResult.countTotal}</b>
          </div>
          <div>
            {t("ModalResult.totalC")}: <b>{dataModalResult.countCorrect}</b>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              handleClose();
              props.handleShowAnswer();
            }}
          >
            {t("ModalResult.showA")}
          </Button>
          <Button variant="primary" onClick={handleClose}>
            {t("ModalResult.close")}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalResult;
