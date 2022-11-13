import React, { useState } from "react";
import Spinner from "../ui/Spinner";
import { MdDeleteForever, MdEdit } from "react-icons/md";
import { useCrud } from "../../hooks/useCrud";

function AddextraForm({ productId, extra }) {
  const [inputs, setinputs] = useState({name: extra?.name, price: extra?.price || 0})
    
  const { data, handlefetchData, handleCrud, loading, message, error }: any = useCrud("/api/v1.1.1/products/extras");
  
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setinputs(values => ({...values, [name]: value}))
  }

  const handleAddextra = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    const data = {
      productId,
      id: extra?.id,
      name: extra?.name,
      price: extra?.price
    };

    const url = extra?.id ? "/api/v1.1.1/products/extras/" + extra?.id : "/api/v1.1.1/products/extras"

    await handleCrud("POST", url, data);
    await handlefetchData()
  };
  
  
  const handleDelete = async(id) => {
    await handleCrud("DELETE", "/api/v1.1.1/products/extras/" + id)
    await handlefetchData()
  }

  return (
      <>
    <div className="card mt-2">
      <div className="card-body my-3">
            <div className="my-4 border-bottom">
              <ol>
                {data?.length > 0 && data?.map((extra, index) => (
                  <li key={index}>{extra?.name} <span className="ms-4">{extra?.price}</span> <a className="ms-3 text-decoration-none" onClick={() => handleDelete(extra?.id)}><MdEdit /></a>
                      <a type="button" className="btn btn-light" data-bs-toggle="modal" data-bs-target="#deleteModal"><MdDeleteForever className="ms-3" /></a>
                  </li> 
                  )
                )}   
              </ol>
            </div>
            {error && <p className="text-danger">{error}</p>}
            {message && <p className="text-success">{message}</p>}
            <form className="row" onSubmit={handleAddextra}>
                  <div className="col-md-6 form-group mb-4">
                    <label htmlFor="name" className="mb-2">
                      Enter extra name
                    </label>
                    <input name="name" type="text" value={inputs.name} onChange={handleChange} className="form-control" placeholder="Name" />
                  </div>
                  <div className="col-md-6 form-group mb-4">
                    <label htmlFor="price" className="mb-2">
                      Enter extra price
                    </label>
                    <input name="name" type="text" value={inputs.price} onChange={handleChange} className="form-control" placeholder="Name" />
                  </div>
                  <div className="text-end">
                    <button
                      type="submit"
                      className="btn btn-primary ms-3"
                      disabled={
                      !inputs?.name ||
                      !inputs?.price ||
                      loading
                      }
                    >
                    {loading ? <Spinner /> : "Submit"}
                    </button>     
                  </div>
            </form>
      </div>
    </div>
  </>
  );
}

export default AddextraForm;
