import React from 'react'
import Spinner from './ui/Spinner'

function Loader() {
  return (
      <div className='vh-100 d-flex justify-content-center'>
           <Spinner />
    </div>
  )
}

export default Loader