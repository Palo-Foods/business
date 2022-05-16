import React from "react";
import Link from "next/link";
import { useStates } from "../../hooks/useStates";
import TextArea from "../ui/Description";
import Select from "../ui/Select";
import TextInput from "../ui/TextInput";
import FilePicker from "../media/FilePicker";
import MediaModal from "../modals/MediaModal";
import { usePut } from "../../hooks/crud/usePut";

function AddProductForm({ product }) {
  //get rider in store
  const {
    setName,
    name,
    type,
    setType,
    price,
    setPrice,
    discount,
    setDiscount,
    description,
    setDescription,
    setInput,
    itemImage,
    setItemImage,
  } = useStates(product);

  //get sign up hook
  const { loading, statusCode, message, putData } = usePut();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      name,
      category,
      price,
      discount,
      description,
      itemImage,
    };

    const url = `/api/v1.1.1/products/${product?._id}`;

    //provide url, email, password, custom args
    await putData(url, data);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="row">
        <div className="col-md-6">
          <div className="col-md-12 mb-3 form-group">
            <label htmlFor="itemName" className="mb-1">
              Item name
            </label>
            <TextInput
              type="text"
              text={name}
              setInput={setInput}
              setText={setName}
              classes=""
              id="itemName"
            />
          </div>
          <div className="col-12 form-group mb-3">
            <label htmlFor="description" className="mb-1">
              Description
            </label>
            <TextArea
              text={description}
              setInput={setInput}
              setText={setDescription}
              classes=""
              id="description"
            />
          </div>

          <div className="row d-sm-flex align-items-sm-center mb-3">
            <div className="col-md-6 mb-3 form-group">
              <label htmlFor="price" className="mb-1">
                Price
              </label>
              <TextInput
                type="number"
                text={price}
                setInput={setInput}
                setText={setPrice}
                classes=""
                id="price"
              />
            </div>

            <div className="col-md-6 mb-3 form-group">
              <label htmlFor="discount" className="mb-1">
                Discount(optional)
              </label>
              <TextInput
                type="number"
                text={discount}
                setInput={setInput}
                setText={setDiscount}
                classes=""
                id="discount"
              />
            </div>
          </div>

          {message && (
            <div className="px-3">
              <Alert
                type={
                  statusCode === 201
                    ? "success"
                    : statusCode === 500
                    ? "danger"
                    : "info"
                }
                message={message}
              />
            </div>
          )}
        </div>
        <div className="col-md-6 col-lg-5 mx-auto">
          <div className="col-md-12 form-group mb-4">
            <label htmlFor="category" className="mb-1">
              Select Category
            </label>
            <Select
              text={type}
              setInput={setInput}
              setText={setType}
              options={[
                "Rice dishes",
                "Local dishes",
                "Pizza",
                "Sandwich",
                "Salad",
                "Beverage",
                "Soup",
              ]}
              classes=""
              id="type"
            />
          </div>
          <p className="mb-1">Add product image</p>
          <FilePicker
            image={itemImage}
            setImage={setItemImage}
            type="photo"
            typeOfUpload="product"
          />
          <div className="mt-4 d-flex justify-content-between">
            <Link href="/[route]/[page]" as="/dashboard/products">
              <a className="btn btn-outline-primary me-2 w-100">Cancel</a>
            </Link>
            {!product ? (
              <button
                type="submit"
                className="btn btn-primary px-5 w-100"
                disabled={!name || !price || !category || !description}>
                {loading && <SmallSpinner />} Add item
              </button>
            ) : (
              <button
                type="submit"
                className="btn btn-primary px-5"
                disabled={!name || !price || !category || !description}>
                {loading && <SmallSpinner />} Edit Item
              </button>
            )}
          </div>
        </div>
      </form>
      <MediaModal setImage={setImage} image={image} />
    </div>
  );
}

export default AddProductForm;
