import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { deleteUser } from "../../../../services/apiServices";
import { toast } from "react-toastify";
import { useTranslation, Trans } from "react-i18next";

const ModalDeleteUser = (props) => {
  const { t } = useTranslation();

  const { show, setShow, dataDelete } = props;

  const handleClose = () => setShow(false);

  const handleSubmitDelete = async () => {
    let data = await deleteUser(dataDelete.id);
    console.log(data);

    if (data && data.EC === 0) {
      toast.success(data.EM);
      handleClose();
      // await props.fetchListUser();
      props.setCurrentPage(1);
      await props.fetchListUserWithPaginate(1);
    }
    if (data && data.EC !== 0) {
      toast.error(data.EM);
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>{t("ModalDeleteUser.title-delete")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {t("ModalDeleteUser.title2-delete")} email={" "}
          <b>{dataDelete && dataDelete.email ? dataDelete.email : ""}</b>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            {t("ModalDeleteUser.Cancel-delete")}
          </Button>
          <Button variant="primary" onClick={() => handleSubmitDelete()}>
            {t("ModalDeleteUser.Confirm-delete")}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalDeleteUser;
