import React from 'react'

function NoData({icon, content}) {
  return (
    <div className="d-flex justify-content-center">
      <div className="text-center">
        <div className="my-4">
         {icon}
        </div>
        <p>{content}</p>
      </div>
    </div>
  )
}

export default NoData