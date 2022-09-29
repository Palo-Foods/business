import React, { useEffect, useState } from "react";
import TextInput from "./TextInput";
import { useStates } from "../../hooks/useStates";
import Spinner from "../ui/Spinner";
import { usePut } from "../../hooks/usePut";
import { useGet } from "../../hooks/useGet";
import { MdDeleteForever, MdEdit } from "react-icons/md";
import { usePost } from "../../hooks/usePost";

function AddextraForm({ productId }) {
    const {
    id, setId,
    name,
    setName,
    price,
    setPrice,
    } = useStates();

  const [extra, setExtra] = useState({id: "", name: "", price: 0})
    
  const { data, getItems }: any = useGet("/api/v1.1.1/products/extras");
  const { updateItem, isLoading, isError, isMessage } = usePut("/api/v1.1.1/products/extras/" + extra?.id)
  const {addItem, loading, error, message} = usePost("/api/v1.1.1/products/extras/add-extra")
    
  useEffect(() => {
    if (extra?.name) {
        setId(extra?.id)
        setName(extra?.name)
        setPrice(extra?.price)
    }
  }, [extra])
  

  const handleAddextra = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    const data = {
      productId,
      name,
      price
    };
      
    const update = {
      id: extra?.id,
      name: extra?.name,
      price: extra?.price
    };

    extra?.name ? updateItem(update) : addItem(data);
    getItems()
    };
    
    const load = loading || isLoading
    const msg = message || isMessage
    const err = error || isError

  return (
      <>
          {err && <p className="text-danger">{err}</p>}
          {msg && <p className="text-success">{msg}</p>}
    <div className="card mt-2">
              <div className="card-body my-3">
                  <div className="my-4 border-bottom">
                      <ol>
                          {data?.length > 0 && data?.map((extra, index) => (
                              <li key={index}>{extra?.name} <span className="ms-4">{extra?.price}</span> <a className="ms-3 text-decoration-none" onClick={() => setExtra(extra)}><MdEdit /></a>
                                <a type="button" className="btn btn-light" data-bs-toggle="modal" data-bs-target="#deleteModal"><MdDeleteForever className="ms-3" /></a>
                              </li> 
                          )
                          )}
                         
                      </ol>
                  </div>
      {isMessage && <p className="text-success">{isMessage}</p>}
      {isError && <p className="text-danger">{isError}</p>}
      <form className="row" onSubmit={handleAddextra}>
        <div className="col-md-6 form-group mb-4">
          <label htmlFor="name" className="mb-2">
            Enter extra name
          </label>
          <TextInput type="text" value={name} setChange={setName} id="name" placeholder={""} />
        </div>
        <div className="col-md-6 form-group mb-4">
          <label htmlFor="price" className="mb-2">
            Enter extra price
          </label>
          <TextInput type="number" value={price} setChange={setPrice} id="price" placeholder={""} />
        </div>
        <div className="text-end">
          <button
            type="submit"
            className="btn btn-primary ms-3"
            disabled={
              !name ||
              !price ||
             load
            }>
            {load ? <Spinner /> : "Submit"}
          </button>     
      </div>
                  </form>
              </div>
              </div>
    </>
  );
}

export default AddextraForm;
