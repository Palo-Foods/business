import React from 'react'
import { MdErrorOutline } from 'react-icons/md'

function Error({error, getData}) {
  return (
      <div className='d-flex justify-content-center align-items-center vh-80 py-1'>
          <div className='text-center py-5 my-5'>
              {error}
              <div className='my-3'>
                  <MdErrorOutline size={50} />
              </div>
              <div className='my-3'>
                  <button className='btn btn-primary' onClick={getData}>Reload</button>
              </div>
          </div>
      </div>
  )
}

export default Error