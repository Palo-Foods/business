import React from "react";
import { useMedia } from "../../hooks/useMedia";
import Spinner from "../ui/Spinner";

const DeleteButton = ({ id }) => {
  const { media, uploadLoading, message, medias } = useMedia("medias");

  const deleteMedia = async () => {
    console.log(id);
    await media.deleteMedia(id);
    if (message.includes("media")) {
      medias?.filter((media) => media._id !== id);
    }
  };

  return (
    <button
      className="btn btn-danger ms-3 rounded-pill px-3 px-md-4"
      type="button"
      disabled={!id}
      onClick={deleteMedia}>
      {uploadLoading ? (
        <Spinner className="ms-2" />
      ) : (
        <span className="">delete</span>
      )}
    </button>
  );
};

export default DeleteButton;
