import React from "react";
import dynamic from "next/dynamic";
const FilesInMedia = dynamic(() => import("../media/FilesInMedia"));
import { MdClear, MdDangerous, MdPhotoAlbum } from "react-icons/md";
import { useFetch } from "../../hooks/crud/useFetch";
import Spinner from "../ui/Spinner";

const MediaModal = ({ image, setImage }) => {
  const url = "/api/v1.1.1/media";

  const { data, loading, error, fetchData } = useFetch(url);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div
      className="modal fade"
      id="mediaModal"
      tabIndex="-1"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      role="dialog"
      aria-labelledby="modelTitleId"
      aria-hidden="true"
      style={{ paddingRight: 0 }}>
      <div
        className="modal-dialog modal-dialog-scrollable modal-dialog-centered modal-dialog-fullScreen modal-lg"
        role="document">
        <div className="modal-content">
          <div className="modal-header border-0 py-2 d-flex align-items-center pe-0">
            <h6 className="mb-0 text-decoration-none">Media</h6>
            <button
              type="button"
              className="btn btn-default"
              data-bs-dismiss="modal">
              <span className="bg-light rounded-circle p-2">
                <MdClear size={20} className="" />
              </span>
            </button>
          </div>

          <div className="modal-body">
            {loading && (
              <div className="w-100 d-flex justify-content-center align-items-center h-100">
                <Spinner />
              </div>
            )}
            {error && (
              <div className="w-100 d-flex justify-content-center align-items-center h-100">
                <MdDangerous size={20} className="text-danger" />
                <a
                  type="button"
                  className="ms-2 text-black text-decoration-none"
                  onClick={fetchData}>
                  Reload
                </a>
              </div>
            )}

            {data && (
              <FilesInMedia files={data} image={image} setImage={setImage} />
            )}
            {data && data?.length === 0 && (
              <div className="text-center">
                <MdPhotoAlbum size={100} className="text-muted my-4" />
                <p>There are no files</p>
              </div>
            )}
          </div>
          <div className="modal-footer border-0 text-muted d-md-flex justify-content-md-end">
            <a
              type="submit"
              className="btn btn-danger me-3"
              data-bs-dismiss="modal">
              Close
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MediaModal;
