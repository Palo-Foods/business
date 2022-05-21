import React from "react";
import Link from "next/link";
import { useStates } from "../../hooks/useStates";
import TextArea from "../ui/Description";
import Select from "../ui/Select";
import TextInput from "../ui/TextInput";
import FilePicker from "../media/FilePicker";
import MediaModal from "../modals/MediaModal";
import { usePost } from "../../hooks/crud/usePost";

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
    image,
    setImage,
  } = useStates(product);

  //get sign up hook
  const { loading, statusCode, message, postData } = usePost();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      name,
      category,
      price,
      discount,
      description,
      itemImage: image,
    };

    const url = "/api/v1.1.1/products/add-product";

    //provide url, email, password, custom args
    await postData(url, data);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="row">
        <div className="col-md-7">
          <div className="col-md-12 mb-4 form-group">
            <TextInput
              type="text"
              text={name}
              setInput={setInput}
              setText={setName}
              classes="py-2"
              id="itemName"
              placeholder="Item Name"
            />
          </div>
          <div className="col-12 form-group mb-4">
            <TextArea
              text={description}
              setInput={setInput}
              setText={setDescription}
              classes=""
              id="description"
              placeholder="Item Description"
              rows="4"
            />
          </div>

          <div className="row d-sm-flex align-items-sm-center mb-3">
            <div className="col-md-6 mb-3 form-group">
              <TextInput
                type="number"
                text={price}
                setInput={setInput}
                setText={setPrice}
                classes="py-2"
                id="price"
                placeholder="Price"
              />
            </div>

            <div className="col-md-6 mb-3 form-group">
              <TextInput
                type="number"
                text={discount}
                setInput={setInput}
                setText={setDiscount}
                classes="py-2"
                id="discount"
                placeholder="Discounted price (optional)"
              />
            </div>
          </div>

          <div className="col-md-12 form-group mb-5">
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
              classes="py-2"
              id="category"
            />
          </div>

          {statusCode && (
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
          <div className="mt-4 d-flex justify-content-between">
            {!product ? (
              <button
                type="submit"
                className="btn btn-primary px-5"
                disabled={!name || !price || !category || !description}>
                {loading && <Spinner className="ms-2" />}
                {!loading && <span>Add item</span>}
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
        <div className="col-md-5 col-lg-5 mx-auto">
          <FilePicker
            image={image}
            setImage={setImage}
            type="photo"
            width={250}
            height={200}
          />
        </div>
      </form>
    </div>
  );
}

export default AddProductForm;
