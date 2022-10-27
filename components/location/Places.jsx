import React from 'react'
import { MdLocationPin } from 'react-icons/md'

const Places = ({type, locations, setLocation}) => {
  return (
    <ul className="dropdown-menu w-100 py-0">
        {locations?.map((location, index) => (
          <li key={index}><a className="dropdown-item text-truncate p-2" href="#" onClick={() => setLocation(location)}><MdLocationPin size={20} /> {location?.address}</a></li>
          )
        )}
        <li><a className="dropdown-item border-top text-truncate p-2" href="#" data-bs-toggle="modal" data-bs-target="#location">New {type} Location</a></li>
      </ul>
  )
}

export default Places