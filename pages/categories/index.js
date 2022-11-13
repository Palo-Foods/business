import React, { useState } from 'react'
import { MdClose } from 'react-icons/md';
import { useCrud } from '../../hooks/useCrud';
import { useGet } from '../../hooks/useGet';
import TextInput from './TextInput';

function Categories() {
    const {loading, error, message, handleCrud} = useCrud()
    const { data, getItems } = useGet("/api//v1.1.1/products/categories");

    const [category, setCategory] = useState("")

    const handleAddCategory = async(e) => {
        e.preventDefault()
        const url = "/api/v1.1.1/products/categories/create";
        await handleCrud("POST", url, {category});
        await getItems()
    }

    const handleDelete = async (id) => {
        e.preventDefault()
        const url = "/api/v1.1.1/products/categories/" + id
        await handleCrud("DELETE", url, {category});
        await getItems()
    }

  return (
      <div className='mt-2'>
          <h5>Categories</h5>
          <div className='my-3'>
              <div className="card">
                  <div className="card-body">
                      <div className='my-3'>
                        {data?.length > 0 ? data?.map((item, index) => (
                            <div key={index} className="form-check mb-3">
                                <p>{item?.name}</p>
                                <a onClick={() => handleDelete(item?.id)}><MdClose color="red" /></a>
                            </div>
                        )) : <p>There are no categories</p>}
                      </div>
                      <div className='border-top py-3'>
                          <form onSubmit={handleAddCategory}>
                            {error && <p className='text-danger'>{error}</p>}
                            <div className='d-flex justify-content-between align-items-center'>
                                <div className="form-group me-2 w-100">
                                    <label htmlFor="category" className='mb-2 fw-bold'>Add new</label>
                                    <TextInput type="text" value={category} setChange={setCategory} id="category" placeholder="Add category" />
                                </div>
                                <button type="submit" className='btn btn-primary mt-4' disabled={loading || !category}>Add</button>
                              </div>
                          </form>
                    </div>
                </div>
              </div>
          </div>
    </div>
  )
}

export default Categories