import React, { useEffect, useState } from "react";
import Link from "next/link";
import DashboardLayout from "../../../components/layouts/DashboardLayout";
import { useStates } from "../../../hooks/useStates";
import OrderDetail from "../../../components/orders/OrderDetail";
import { useCrud } from "../../../hooks/useCrud";

function EditRiderPage() {
    const {router} = useStates()
    const [url, setUrl] = useState("")
  //get rider in store
    const {data, status, getItems} = useCrud(url);
    
    useEffect(() => {
        if (router?.isReady) { 
            setUrl("/api/v1.1.1/riders/" + router.query.id);
        }
    }, [router])
    

  return (
    <DashboardLayout>
       <nav className="breadcrumb">
         <Link href="/riders">
          <a className="breadcrumb-item text-decoration-none">
           Riders
          </a>
        </Link>
        <span className="breadcrumb-item active"> Edit rider</span>
      </nav>

      {data &&
        <>
        <div className="card mt-2">
          <div className="card-body my-3">
            <OrderDetail order={data} url={url} />
          </div>
        </div>
        </>}
    </DashboardLayout>
  );
}

export default EditRiderPage;
