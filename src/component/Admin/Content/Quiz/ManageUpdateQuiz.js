import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FcPlus } from "react-icons/fc";
import { toast } from "react-toastify";
import _ from "lodash";
import { putUpdateQuizForAdmin } from "../../../../services/apiServices";

const ManageUpdateQuiz = (props) => {
  const { show, setShow, dataUpdate, setDataUpdate, fetchQuiz } = props;

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [image, setImage] = useState("");
  const [previewImage, setPreviewimage] = useState("");

  // const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
    setName("");
    setDescription("");
    setType("");
    setImage("");
    setPreviewimage("");
    setDataUpdate();
  };

  useEffect(() => {
    if (!_.isEmpty(dataUpdate)) {
      setName(dataUpdate.name);
      setDescription(dataUpdate.description);
      setType(dataUpdate.type);
      if (dataUpdate.image) {
        setPreviewimage(`data:image/jpeg;base64,${dataUpdate.image}`);
      }
    }
  }, [dataUpdate]);

  const handleSubmitUpdateQuiz = async () => {
    if (!name || !description) {
      toast.error("Name/Description Invalid");
      return;
    }
    let res = await putUpdateQuizForAdmin(
      dataUpdate.id,
      name,
      description,
      type,
      image
    );
    if (res && res.EC === 0) {
      await fetchQuiz();
      toast.success(res.EM);
      handleClose();
    }
  };

  const handleUploadIamge = (event) => {
    if (event.target && event.target.files && event.target.files[0]) {
      setPreviewimage(URL.createObjectURL(event.target.files[0]));
      setImage(event.target.files[0]);
    }
  };

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
          <Modal.Title>Update a Quiz</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Name</label>
              <input
                type="email"
                className="form-control"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Description</label>
              <input
                type="text"
                className="form-control"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
              />
            </div>

            <div className="col-md-4">
              <label className="form-label">Type</label>
              <select
                className="form-select"
                onChange={(event) => setType(event.target.value)}
              >
                <option value="USER">EASY</option>
                <option value="MEDIUM">MEDIUM</option>
                <option value="HARD">HARD</option>
              </select>
            </div>
            <div className="col-md-12">
              <label className="form-label label-upload" htmlFor="labelUpload">
                <FcPlus />
                Upload File Image
              </label>
              <input
                type="File"
                id="labelUpload"
                hidden
                onChange={(event) => handleUploadIamge(event)}
              />
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
            Close
          </Button>
          <Button variant="primary" onClick={() => handleSubmitUpdateQuiz()}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ManageUpdateQuiz;
