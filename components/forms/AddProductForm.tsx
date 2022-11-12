import React, { useEffect } from "react";
import TextInput from "./TextInput";
import { useStates } from "../../hooks/useStates";
import Uploader from "../media/Uploader";
import Spinner from "../ui/Spinner";
import { usePost } from "../../hooks/usePost";
import { usePut } from "../../hooks/usePut";
import Image from "next/image";
import { MdImage } from "react-icons/md";

function AddProductForm({ product, user, getItems, selectedCategory }) {
  
  const {
    name,
    setName,
    description,
    setDescription,
    amount,
    setAmount,
    image,
    setImage
  } = useStates();

  const { addItem, loading, error, message } = usePost("/api/v1.1.1/products/add-product")
  const { updateItem, isLoading, isError, isMessage } = usePut("/api/v1.1.1/products/" + product?.id)

  useEffect(() => {
    if (product?.id) {
      setName(product?.name)
      setAmount(product?.amount)
      setDescription(product?.description)
      setImage(product?.image)
    }
  }, [product])
  

  const handleAddproduct = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    const data = {
      name,
      amount: parseInt(amount),
      description,
      image,
      category: selectedCategory
    };
    !product?.id ? await addItem(data) : await updateItem(data)
  };

  let msg = message || isMessage
  let err = error || isError

  return (
  <>
      {msg && <p className="text-success">{msg}</p>}
      {err && <p className="text-danger">{err}</p>}
      <form className="row" onSubmit={handleAddproduct}>
        <div className="mb-3">
           <Uploader setImage={setImage}>
                        <div className="position-relative">
                          <div className="position-relative">
                            <Image
                              src={image?.url}
                              width={80}
                              height={80}
                              alt={user?.businessName}
                              className="rounded"
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
                            className="d-flex justify-content-center align-items-center rounded">
                            <MdImage size={25} color={image?.url ? "white" : ""}  />
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
          <label htmlFor="amount" className="mb-2">
            Enter product amount
          </label>
          <TextInput type="number" value={amount} setChange={setAmount} id="amount" placeholder={""} />
        </div>
      <div className="col-md-6 form-group mb-4">
        <label htmlFor="description" className="mb-2">
          Enter product description
        </label>
        <TextInput type="text" value={description} setChange={setDescription} id="phone" placeholder={""} />
      </div>
        <div className="text-end">
          {product?.id && <button type="button" className="btn btn-light" data-bs-toggle="modal" data-bs-target="#deleteModal">Delete</button>}
          <button
            type="submit"
            className="btn btn-primary ms-3"
            disabled={
              !name ||
              !amount ||
              !description ||
              !image?.url ||
              !selectedCategory ||
             (product?.id ? isLoading : loading)
            }>
            {loading ? <Spinner /> : "Submit"}
          </button>     
      </div>
    </form>
    </>
  );
}

export default AddProductForm;
