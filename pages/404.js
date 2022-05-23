import React from "react"
import { MdErrorOutline } from "react-icons/md";
import { useStates } from "../hooks/useStates";

export default function NotFound(){
  const { router } = useStates();
  return (
    <div className="vh-100 d-flex justify-content-center align-items-center bg-white">
      <div className="text-center">
        <MdErrorOutline size={100} className="text-primary" />
        <h1 className="my-3">404 not found</h1>
        <button className="btn btn-primary my-3" onClick={() => router.reload()}>Reload</button>
      </div>
    </div>
  )
}