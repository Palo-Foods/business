import React, { useEffect } from "react";
import Image from "next/image";
import Success from "../../public/images/icons/check-circle.svg";
import { useSelector, useDispatch } from "react-redux";
import { selectExtra, selectProduct, setExtras } from "../../slices/navSlice";
import { useState } from "react";
import Spinner from "../Spinner";
import { create } from "../../functions/POST";
import { update } from "../../functions/PUT";
import { nanoid } from "nanoid";

function AddExtraModal({ extras }) {
  const product = useSelector(selectProduct);
  const extra = useSelector(selectExtra);
  const dispatch = useDispatch();

  const [name, setName] = useState(extra?.name || "");
  const [price, setPrice] = useState(extra?.price || "");

  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!extra?.name) {
      setName("");
      setPrice("");
    }
  }, []);

  const handleExtraSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    setLoading(true);

    const data = {
      extraId: nanoid(6),
      name,
      price,
      productId: product?._id,
    };

    console.log(data);

    const response = await create("/api/v1.1.0/items/extras/add-extra", data);
    setLoading(false);
    if (response.msg === "extra added") {
      setShow(true);
      //update extras after adding on
      dispatch(setExtras([...extras, data]));
    } else {
      setError(true);
    }
  };

  const editExtra = async (e) => {
    e.preventDefault();
    setError(false);
    setLoading(true);

    const extraId = extra?.id;

    const data = { name, price, productId: product?._id };

    const response = await update(`/api/v1.1.0/items/extras/${extraId}`, data);

    if (response.msg === "extra edited") {
      setShow(true);

      //update extras after adding on
      const exist = extras?.find((x) => x.id === extraId);
      if (exist) {
        dispatch(
          setExtras(
            extras?.map((x) =>
              x.id === extraId ? { ...exist, extraId, name, price } : x
            )
          )
        );
      }
    } else {
      setError(true);
    }
  };

  //receive all input values and process them
  const setInput = (setter) => (e) => {
    setter(e.currentTarget.value);
  };

  return (
    <div
      className="modal fade"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      id="addExtraModal"
      tabIndex="-1"
      aria-labelledby="addExtraModalLabel"
      aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered modal-sm">
        <div className="modal-content">
          <div className="modal-header">
            <h5>{extra?.name ? "Edit Extra" : "Add Extra"}</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"></button>
          </div>
          <form onSubmit={extra?.name ? editExtra : handleExtraSubmit}>
            <div className="modal-body">
              {show && (
                <div className="my-4 text-center d-flex align-items-center">
                  <>
                    <Image
                      src={Success}
                      width={50}
                      alt="Success"
                      className="mb-3"
                    />
                    <p>Extra added</p>
                  </>
                </div>
              )}
              {!show && (
                <>
                  <div className="col-md-12 mb-3 form-group">
                    <label htmlFor="name" className="mb-1">
                      Item name
                    </label>
                    <input
                      value={name}
                      onChange={setInput(setName)}
                      type="text"
                      className="form-control"
                      name="name"
                      id="name"
                      aria-describedby="helpId"
                      placeholder=""
                    />
                  </div>
                  <div className="mb-3 form-group">
                    <label htmlFor="price" className="mb-1">
                      Price
                    </label>
                    <input
                      value={price}
                      onChange={setInput(setPrice)}
                      type="number"
                      className="form-control"
                      name="price"
                      id="price"
                      aria-describedby="helpId"
                      placeholder=""
                      maxLength="6"
                    />
                  </div>
                </>
              )}

              {loading && (
                <div className="text-center">
                  <Spinner />
                </div>
              )}
              {show && (
                <div className="text-center">
                  <h5>{name} has been added</h5>
                </div>
              )}
              {error && (
                <p className="text-danger text-center small">
                  There was an error adding extra
                </p>
              )}
            </div>
            <div className="modal-footer d-flex justify-content-between">
              <button
                type="button"
                className="btn btn-secondary px-4"
                data-bs-dismiss="modal"
                onClick={() => setError(false)}>
                {show ? "Close" : "Cancel"}
              </button>

              {!extra && (
                <button
                  disabled={loading}
                  type="submit"
                  className="btn btn-primary px-4">
                  Submit
                </button>
              )}
              {extra && (
                <button
                  disabled={loading}
                  type="submit"
                  className="btn btn-primary px-4 mx-3">
                  Edit Extra
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddExtraModal;
