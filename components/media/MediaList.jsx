import React from "react";
import { MdInsertDriveFile } from "react-icons/md";
import { useMedia } from "../../hooks/useMedia";
import Spinner from "../ui/Spinner";
import Image from "next/image";

function MediaList({ setSelectedImage }) {
  let { loading, error, media, medias } = useMedia("medias");

  return (
    <div className="row mb-2 mb-md-5">
      {loading && !error && (
        <div className="d-flex justify-content-center align-items-center">
          <Spinner />
        </div>
      )}
      {error && !loading && (
        <div className="d-flex justify-content-center align-items-center">
          <div className="text-center">
            <h6 className="text-muted">There was an error loading media</h6>
            <button
              className="btn btn-primary my-3"
              onClick={() => media.getMedias()}>
              Reload
            </button>
          </div>
        </div>
      )}
      {medias?.length == 0 && (
        <div className="d-flex justify-content-center align-items-center">
          There are no media
        </div>
      )}
      {medias?.length > 0 &&
        medias?.map((media) => (
          <div className="col-6 col-lg-4 col-xl-3 mb-3" key={media?.url}>
            <input
              className="form-check-input"
              type="radio"
              name="media"
              id={media?.name}
              value={media}
              hidden
            />
            <label
              className="card d-flex justify-content-center align-items-center pt-2"
              style={{ cursor: "pointer" }}
              htmlFor={media?.name}
              onClick={() => setSelectedImage(media)}>
              {media?.type == "document" ? (
                <>
                  <MdInsertDriveFile size={150} />
                  <div className="d-none d-md-block pt-2 text-center">
                    <h5 className="mb-0 text-truncate small mb-0">
                      {media?.name?.length > 15
                        ? media?.name.slice(0, 20)
                        : media?.name}
                    </h5>
                  </div>
                </>
              ) : (
                <>
                  <div style={{ width: 150, height: 150 }}>
                    <Image layout="fill" src={media?.url} alt={media?.name} />
                  </div>

                  <div className="pt-2 text-center">
                    <h5 className="mb-0 text-truncate small mb-0">
                      {media?.name?.length > 15
                        ? media?.name.slice(0, 20)
                        : media?.name}
                    </h5>
                    <h6 className="mb-0 small">
                      {media?.width} X {media?.width}
                    </h6>
                  </div>
                </>
              )}
            </label>
          </div>
        ))}
    </div>
  );
}

export default MediaList;
