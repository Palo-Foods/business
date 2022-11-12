import React, { useState } from 'react'
import { crud } from '../../../functions/crud';

function AddProduct({product}) {
   const [inputs, setInputs] = useState({} || product);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.price;
    setInputs(values => ({...values, [name]: value}))
  }

  const handleSubmit = async(event) => {
    event.preventDefault();
    alert(inputs);
    
    //1. check if authToken
    const token = sessionStorage.getItem("user");

    const { response, error } = await crud("POST", url, inputs, token?.authToken);

    setLoading(false);

    if (response.statusText != "Ok") {
      setError(result?.msg || error);
    } else {
      const result = await response.json();
      setMessage(result?.msg);
      return
    }
  }

  return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <input value={inputs.name} onChange={handleChange} className="form-control" />
        <input value={inputs.price} onChange={handleChange} className="form-control" />
        <textarea rows="" cols="" value={inputs.description} onChange={handleChange} className="form-control"></textarea>
    </form>
  )
}

export default AddProduct