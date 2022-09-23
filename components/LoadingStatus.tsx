import React from 'react'
import Spinner from './ui/Spinner'

enum Status {
  Loading = "loading", Info = "info", Succes = "success", Error = "error", 
}

type StatusProps = {
  status: string;
  getItems: Function
}

const Reload = ({getItems}) => {
    return (
         
          <div className="text-center my-5">
            <p>There was an error</p>
            <button className="btn btn-primary" onClick={getItems}>
              Reload
            </button>
          </div>
    )
}

function LoadingStatus(props: StatusProps) {
  let message
  if (props.status == "loading") {
    message = <Spinner />
  } else if (props.status == "error") { 
    message = <Reload getItems={props.getItems} />
  } else if (props.status == "info") {
    message = "There is no data available"
  } else {
    message = ""
  }

  return (
  <div className="d-flex justify-content-center align-items-center h-100">
      {message}
  </div>
  )
}

export default LoadingStatus