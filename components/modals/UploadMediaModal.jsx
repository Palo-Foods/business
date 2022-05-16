import React from "react";
import { MdClear, MdUpload } from "react-icons/md";
import { useDispatch } from "react-redux";
import { usePost } from "../../hooks/crud/usePost";
import { useStates } from "../../hooks/useStates";
import Uploader from "../media/Uploader";
import Spinner from "../ui/Spinner";

const UploadMediaModal = ({ image, setImage }) => {
  const { loading, statusCode, message, postData } = usePost();

  const { router } = useStates();

  const dispatch = useDispatch();

  const handleSubmit = async () => {
    console.log(image);
    const data = {
      imgUrl: image,
    };

    const url = `/api/v1.1.1/media/uploadToCloudinary`;

    //provide url, email, password, custom args
    await postData(url, data);

    //if there is an update
    statusCode === 200 && router.reload();
  };
  //if there is an update
  statusCode === 200 && router.reload();

  return (
    <div
      className="modal fade"
      id="uploadMediaModal"
      tabIndex="-1"
      role="dialog"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      aria-labelledby="modelTitleId"
      aria-hidden="true"
      style={{ paddingRight: 0 }}>
      <div
        className="modal-dialog modal-dialog-centered modal-dialog-fullScreen modal-xl modal-dialog-scrollable modal-fullscreen-md-down"
        role="document">
        <div className="modal-content">
          <div className="modal-header py-2 d-flex align-items-center pe-0">
            <div className="d-flex justify-content-start">
              <h6 type="button" className="mb-0 text-decoration-none">
                Upload media
              </h6>
            </div>
            <button
              type="button"
              className="btn btn-default"
              data-bs-dismiss="modal"
              onClick={() => setImage("")}>
              <span className="bg-light rounded-circle p-2">
                <MdClear size={20} className="" />
              </span>
            </button>
          </div>

          <div className="modal-body">
            <Uploader setImage={setImage} />
          </div>
          {image && (
            <div className="modal-footer text-muted d-md-flex justify-content-md-end">
              {message && statusCode === 200 && (
                <p className="text-primary me-3">{message}</p>
              )}
              {message && statusCode !== 200 && (
                <p className="text-danger me-3">{message}</p>
              )}
              <button
                type="button"
                className="btn btn-info me-3"
                disabled={!image || loading}
                onClick={handleSubmit}>
                {loading && <Spinner />} <MdUpload size={20} /> Upload
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UploadMediaModal;
