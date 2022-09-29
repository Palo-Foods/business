import React, { useEffect } from "react";
import TextInput from "./TextInput";
import { useStates } from "../../hooks/useStates";
import Uploader from "../Media/Uploader";
import Spinner from "../ui/Spinner";
import { usePost } from "../../hooks/usePost";
import { usePut } from "../../hooks/usePut";
import Image from "next/image";
import { MdImage } from "react-icons/md";

function AddProductForm({ product, getItems, user }) {
  const {
    name,
    setName,
    description,
    setDescription,
    price,
    setPrice,
    image,
    setImage
  } = useStates();

  const { addItem, loading, error, message } = usePost("/api/v1.1.1/products")
  const { updateItem, isLoading, isError, isMessage } = usePut("/api/v1.1.1/products/" + product?._id)

  useEffect(() => {
    if (product?._id) {
      setName(product?.name)
      setPrice(product?.email)
      setDescription(product?.phone)
      setImage(product?.image)
    }
  }, [product])
  

  const handleAddproduct = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    const data = {
      name,
      price,
      description,
      image
    };

    !product?._id ? addItem(data) : updateItem(data)
    getItems()
  };

  let msg = message || isMessage
  let err = error || isError

  return (
  <>
      {msg && <p className="text-success">{msg}</p>}
      {err && <p className="text-danger">{err}</p>}
      <form className="row" onSubmit={handleAddproduct}>
        <div>
           <Uploader setImage={setImage}>
                        <div className="position-relative">
                          <div className="position-relative">
                            <Image
                              src={image?.url || product?.image.url}
                              width={70}
                              height={70}
                              alt={user?.businessName}
                              className="rounded-circle"
                            />
                          </div>
                          <div
                            style={{
                              width: 80,
                              height: 80,
                              border: "1px dashed grey",
                              position: "absolute",
                              top: 0,
                              bottom: 0,
                            }}
                            className="d-flex justify-content-center align-items-center rounded-circle">
                            <MdImage size={25} color={user?.avatar?.url ? "white" : ""}  />
                          </div>
                        </div>
                      </Uploader>
        </div>
        <div className="col-md-6 form-group mb-4">
          <label htmlFor="name" className="mb-2">
            Enter product name
          </label>
          <TextInput type="text" value={name} setChange={setName} id="name" placeholder={""} />
        </div>
        <div className="col-md-6 form-group mb-4">
          <label htmlFor="price" className="mb-2">
            Enter product price
          </label>
          <TextInput type="number" value={price} setChange={setPrice} id="price" placeholder={""} />
        </div>
      <div className="col-md-6 form-group mb-4">
        <label htmlFor="description" className="mb-2">
          Enter product phone
        </label>
        <TextInput type="text" value={description} setChange={setDescription} id="phone" placeholder={""} />
      </div>
        <div className="text-end">
          {product?._id && <button type="button" className="btn btn-light" data-bs-toggle="modal" data-bs-target="#deleteModal">Delete</button>}
          <button
            type="submit"
            className="btn btn-primary ms-3"
            disabled={
              !name ||
              !price ||
              !description ||
              !image?.url ||
             (product?._id ? isLoading : loading)
            }>
            {loading ? <Spinner /> : "Submit"}
          </button>     
      </div>
    </form>
    </>
  );
}

export default AddProductForm;