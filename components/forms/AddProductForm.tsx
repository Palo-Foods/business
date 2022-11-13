import Image from 'next/image'
import React, { useState } from 'react'
import { MdImage } from 'react-icons/md'
import { useCrud } from '../../hooks/useCrud'
import { useUser } from '../../hooks/useUser'
import Uploader from '../media/Uploader'
import Spinner from '../ui/Spinner'

function AddProductForm({ product, getItems }) {
  const { loading, error, message, handleCrud, data } = useCrud("/api/v1.1.1/products/categories")
  
  const { user } = useUser("user")
  
  const [image, setImage] = useState({ url: product?.image?.url, public_id: product?.image?.public_id })
  
  const [inputs, setinputs] = useState({
    name: product?.name, price: product?.amount,
    description: product?.description, category: product?.category
  })

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setinputs(values => ({...values, [name]: value}))
  }

  const handleSubmit = async(e) => {
    e.preventDefault()

    const url = !product.id ? "/api/v1.1.1/products" : "/api/v1.1.1/products/" + product.id
  
    await handleCrud(!product.id ? "POST" : "PUT", url, { ...inputs, price: parseInt(inputs?.price), image});
  }

  return (
  <>
    {error && <p className='text-danger'>{error}</p>}
    {message && <p className='text-success'>{message}</p>}
    <form className="row" onSubmit={handleSubmit}>
                <div className="mb-4">
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
                <div className="col-md-6 mb-4">
                  <input name="name" type="text" value={inputs.name} onChange={handleChange} className="form-control" placeholder="Name" />
                </div>
                <div className="col-md-6 mb-4">
                  <input name="price" type="number" value={inputs.price} onChange={handleChange} className="form-control" placeholder="Price" />
                </div>
                <div className="col-md-6 mb-4">
                  <input name="description" type="text" value={inputs.description} onChange={handleChange} className="form-control" placeholder="Description" />
                </div>
                <div className="col-md-6 mb-4">
                  <select name="category" className="form-select" value={inputs.category} onChange={handleChange}>
                    <option>--Select category--</option>
                    {data && data.map(item => (<option key={item.name} value={item.name}>{item.name}</option>))}
                  </select>
                </div>
                <div>
                  <button type="submit" className="btn btn-primary"
                    disabled={loading || !inputs?.name || !inputs?.price ||
                      !inputs?.description || !inputs?.category || !image?.url}>{loading ? <Spinner /> : "Submit"}</button>
                </div>
      </form>
      </>
  )
}

export default AddProductForm