import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FcPlus } from "react-icons/fc";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { postUpdateProfile } from "../../services/apiServices";
import { useTranslation } from "react-i18next";
import _, { set } from "lodash";
import "./Share.scss";

const UserInFor = (props) => {
  const { t } = useTranslation();
  const account = useSelector((state) => state.user.account);
  const [isPreViewImage, setIsPreViewImage] = useState(false);

  const [email, setEmail] = useState("");
  const [username, setUserName] = useState("");
  const [role, setRole] = useState("USER");
  const [image, setImage] = useState("");
  const [preViewImage, setPreViewImage] = useState("");

  useEffect(() => {
    if (account && !_.isEmpty(account)) {
      setEmail(account.email);
      setUserName(account.username);
      setRole(account.role);
      setImage("");
      if (account.image) {
        setPreViewImage(`data:image/jpeg;base64,${account.image}`);
      }
    }
  }, [account]);

  const handleUploadIamge = (event) => {
    if (event.target && event.target.files && event.target.files[0]) {
      setPreViewImage(URL.createObjectURL(event.target.files[0]));
      setImage(event.target.files[0]);
    }
  };

  const handleUpdateInFor = async () => {
    let res = await postUpdateProfile(username, image);
    if (res && res.EC === 0) {
      toast.success(res.EM);
    } else {
      toast.error(res.EM);
    }
    console.log("check res", res);
  };

  return (
    <>
      <Modal.Body>
        <form className="row g-3">
          <div className="col-md-4">
            <label className="form-label">{t("UserInFor.username")}</label>
            <input
              type="text"
              className="form-control"
              value={username}
              onChange={(event) => setUserName(event.target.value)}
            />
          </div>
          <div className="col-md-4">
            <label className="form-label">Email</label>
            <input
              disabled
              type="email"
              className="form-control"
              value={email}
            />
          </div>
          <div className="col-md-4">
            <label className="form-label">{t("UserInFor.role")}</label>
            <select disabled className="form-select" value={role}>
              <option value="USER">USER</option>
              <option value="ADMIN">ADMIN</option>
            </select>
          </div>
          <div className="col-md-12">
            <label className="form-label label-upload" htmlFor="labelUpload">
              <FcPlus />
              {t("UserInFor.upLoad")}
            </label>
            <input
              type="File"
              id="labelUpload"
              hidden
              onChange={(event) => handleUploadIamge(event)}
            />
          </div>
          <div className="col-md-12 img-preview">
            {preViewImage ? (
              <img src={preViewImage} />
            ) : (
              <span>Preview Image</span>
            )}
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="warning" onClick={() => handleUpdateInFor()}>
          Update
        </Button>
      </Modal.Footer>
    </>
  );
};

export default UserInFor;
