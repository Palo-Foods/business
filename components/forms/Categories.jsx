import React, { useState } from 'react'
import { MdClose } from 'react-icons/md';
import { useDelete } from '../../hooks/useDelete';
import { useGet } from '../../hooks/useGet';
import { usePost } from '../../hooks/usePost';
import TextInput from './TextInput';

function Categories({setSelectedCategory, selectedCategory}) {
    const { data, getItems } = useGet("/api//v1.1.1/products/categories");
    const { addItem, loading, error } = usePost("/api/v1.1.1/products/categories/create")

    const [id, setId] = useState("")
    const {deleteItem} = useDelete("/api/v1.1.1/products/categories/" + id)
    const [category, setCategory] = useState("")

    const handleAddCategory = async(e) => {
        e.preventDefault()
        await addItem(category)
        await getItems()
    }

    const handleDelete = async(id) => {
        if (!id) { return }
        setId(id)
        await deleteItem()
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
                                <input className="form-check-input" type="radio" name="category" id={item?.id} value={item?.name || selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} />
                                <label className="form-check-label d-flex justify-content-between" htmlFor={item?.id}>
                                  <span>{item?.name}</span> <a onClick={() => handleDelete(item?.id)}><MdClose color="red" /></a>
                                </label>
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