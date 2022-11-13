import React, { useEffect } from "react";
import { selectProduct } from "../../slices/navSlice";
import { useState } from "react";
import Spinner from "../Spinner";
import { nanoid } from "nanoid";
import { useCrud } from "../../hooks/useCrud";
import { MdCheckCircle } from "react-icons/md";

function AddExtraModal({ extra }) {
  const {loading, error, message, handleCrud} = useCrud()
  const product = useSelector(selectProduct);

  const [inputs, setinputs] = useState({ name: extra?.name, price: extra?.price || 0})

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setinputs(values => ({...values, [name]: value}))
  }

  useEffect(() => {
    if (!extra?.name) {
      setName("");
      setPrice("");
    }
  }, []);

  const handleExtraSubmit = async (e) => {
    e.preventDefault();
    const data = {
      extraId: nanoid(6),
      ...inputs,
      productId: product?._id,
    };

    const url = product?._id ? `/api/v1.1.0/items/extras/${extraId}` : "/api/v1.1.0/items/extras/add-extra"

    await handleCrud(product?._id ? "PUT" : "POST", url, data)
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
              {error && <p className="text-danger">{error}</p>}
              {message && (
                <div className="my-4 text-center d-flex align-items-center">
                  <>
                    <MdCheckCircle className="mb-3" size={50} />
                    <p>Extra added</p>
                  </>
                </div>
              )}
              {!message && (
                <>
                  <div className="col-md-12 mb-3 form-group">
                    <label htmlFor="name" className="mb-1">
                      Item name
                    </label>
                    <input name="name" type="text" value={inputs.name} onChange={handleChange} className="form-control" placeholder="Name" />
                  </div>
                  <div className="mb-3 form-group">
                    <label htmlFor="price" className="mb-1">
                      Price
                    </label>
                    <input name="price" type="text" value={inputs.price} onChange={handleChange} className="form-control" placeholder="Price" />
                  </div>
                </>
              )}
            </div>
            <div className="modal-footer d-flex justify-content-between">
              <button
                type="button"
                className="btn btn-secondary px-4"
                data-bs-dismiss="modal"
                onClick={() => setError(false)}>
                {message ? "Close" : "Cancel"}
              </button>
                <button
                  disabled={loading || !inputs?.name || !inputs?.price}
                  type="submit"
                  className="btn btn-primary px-4">
                 {loading ? <Spinner /> : "Submit"}
                </button>
              
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddExtraModal;
