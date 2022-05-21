import React, { useState } from "react";
import { useStates } from "../../hooks/useStates";
import { MdDelete } from "react-icons/md";
import DeleteModal from "../modals/DeleteModal"
import TextArea from "../ui/Description";
import Select from "../ui/Select";
import TextInput from "../ui/TextInput";
import FilePicker from "../media/FilePicker";
import Spinner from "../ui/Spinner";
import Alert from "../ui/Alert";
import { usePut } from "../../hooks/crud/usePut";

function EditProductForm({ productData }) {
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
    router,
  } = useStates(productData);

  const [item, setItem] = useState()

  //get sign up hook
  const { loading, statusCode, message, putData } = usePut();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      name,
      category: type,
      price,
      discount,
      description,
      itemImage: image,
    };

    const { product } = productData;
    const url = `/api/v1.1.1/products/${product?.id}`;
    console.log(url, data);

    //provide url, email, password, custom args
    await putData(url, data);
  };

  return (
    <>
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
            <Alert
              type={
                statusCode === 200
                  ? "success"
                  : statusCode === 500
                  ? "danger"
                  : "info"
              }
              message={message}
            />
          )}
          <div className="mt-4">
            <button
              type="submit"
              className="btn btn-primary px-5"
              disabled={!name || !price || !category || !description}>
              {loading && <Spinner className="ms-2" />}
              {!loading && <span>Edit item</span>}
            </button>
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
      <div className="mt-4">
        <button
          data-bs-toggle="modal"
          data-bs-target="#deleteModal"
          onClick={() => setItem(productData)}
          type="button"
          className="btn btn-default btn-sm"
          disabled={!name || !price || !category || !description}>
          <span>
            <MdDelete size={16} /> Delete Item
          </span>
        </button>
      </div>
      <DeleteModal
        type="product"
        item={item?.product}
        setItem={setItem}
        url="/api/v1.1.1/products"
        router={router}
      />
    </>
  );
}

export default EditProductForm;
