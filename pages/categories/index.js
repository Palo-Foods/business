import React, { useState } from 'react'
import { MdClose } from 'react-icons/md';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import { useCrud } from '../../hooks/useCrud';

function Categories() {
    const {loading, error, message, handleCrud, handlefetchData, data} = useCrud("/api//v1.1.1/products/categories")

    const [inputs, setinputs] = useState({name: ""})

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setinputs(values => ({...values, [name]: value}))
    }

    const handleAddCategory = async(e) => {
        e.preventDefault()
        const url = "/api/v1.1.1/products/categories/create";
        await handleCrud("POST", url, inputs);
        await handlefetchData()
    }

    const handleDelete = async (id) => {
        e.preventDefault()
        const url = "/api/v1.1.1/products/categories/" + id
        await handleCrud("DELETE", url);
        await handlefetchData()
    }

return (
<DashboardLayout>
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
                                    <input name="fullName" type="text" value={inputs.name} onChange={handleChange} className="form-control" placeholder="Name" />
                                </div>
                                <button type="submit" className='btn btn-primary mt-4' disabled={loading || !inputs?.name}>Add</button>
                            </div>
                        </form>
                    </div>
                </div>
              </div>
          </div>
            </div>
    </DashboardLayout>
  )
}

export default Categories