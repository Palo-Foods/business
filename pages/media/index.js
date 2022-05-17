import React from "react";
import { MdDelete, MdDangerous } from "react-icons/md";
import { useStates } from "../../hooks/useStates";
import DeleteModal from "../../components/modals/DeleteModal";
import FilesInMedia from "../../components/media/FilesInMedia";
import { useSelector } from "react-redux";
import { selectFile } from "../../slices/navSlice";
import { useFetch } from "../../hooks/crud/useFetch";
import FileUploadPicker from "../../components/media/FileUploadPicker";
import UploadMediaModal from "../../components/modals/UploadMediaModal";
import Spinner from "../../components/ui/Spinner";

function AddFilePage() {
  const url = "/api/v1.1.1/media";

  const { image, setImage } = useStates();

  const file = useSelector(selectFile);

  const { data, loading, error, fetchData } = useFetch(url);

  return (
    <>
      <h5>Media</h5>
      <div className="my-3 vh-50">
        <div className="card vh-50">
          <div className="card-header d-flex justify-content-between align-items-center w-100">
            <h6 className="text-decoration-none mb-0 py-3">Files</h6>
            <div>
              {loading && <Spinner />}

              {error && (
                <div className="">
                  <MdDangerous size={20} className="text-danger" />
                  <a
                    type="button"
                    className="ms-2 text-black text-decoration-none"
                    onClick={fetchData}>
                    Reload
                  </a>
                </div>
              )}
            </div>
          </div>

          <div
            className="card-body p-3 d-flex justify-content-start"
            style={{ height: "30rem" }}>
            {data && (
              <FilesInMedia
                image={image}
                setImage={setImage}
                files={data}
              />
            )}
            <FileUploadPicker
              image={image}
              setImage={setImage}
              type="photo"
              width={100}
              height={100}
            />
          </div>
          <UploadMediaModal image={image} setImage={setImage} />
          <div className="card-footer text-muted d-flex justify-content-end">
            <button
              type="button"
              disabled={!image?.url}
              className="btn btn-danger me-3 my-2"
              data-bs-toggle="modal"
              data-bs-target="#deleteModal">
              <MdDelete size={18} className="mb-1" />
              <span className="ms-2">Delete</span>
            </button>
          </div>
        </div>
      </div>
      <DeleteModal
        type="media"
        item={image}
        setItem={setImage}
        url="/api/v1.1.1/media/deleteFromMedia"
      />
    </>
  );
}

export default AddFilePage;
