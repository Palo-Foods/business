import * as React from 'react';
import { useEffect, useState } from 'react';
import Link from "next/link";
import DashboardLayout from "../../../components/layouts/DashboardLayout";
import AddProductForm from "../../../components/forms/AddProductForm";
import { useStates } from "../../../hooks/useStates";
import { useGet } from "../../../hooks/useGet";
import LoadingStatus from '../../../components/LoadingStatus';
import DeleteModal from '../../../components/modals/DeleteModal';
import { useUser } from '../../../hooks/useUser';
import AddextraForm from '../../../components/forms/AddExtraForm';

function EditProductPage() {
  const {user} = useUser("user")
    const {router} = useStates()
    const [url, setUrl] = useState("")
  //get business in store
  const { data, getItems, status }: any = useGet(url);
    
    useEffect(() => {
        if (router?.isReady) { 
            setUrl("/api/v1.1.1/products/" + router.query.id);
        }
    }, [router])
    

  return (
    <DashboardLayout>
      <nav className="breadcrumb">
         <Link href="/products">
          <a className="breadcrumb-item text-decoration-none">
           Product
          </a>
        </Link>
        <span className="breadcrumb-item active"> Edit Product</span>
      </nav>

      <LoadingStatus status={status} getItems={getItems} />

      {data?._id && status == "success" &&
        <>
      <div className="card mt-2">
        <div className="card-body my-3">
          <AddProductForm product={data} getItems={getItems} user={user} />
        </div>
        </div>
      
        <AddextraForm productId={data?._id}/>
      
      <DeleteModal name={data?.name} url={`/api/products/${data?._id}`} getItems={getItems} router={router} />
      </>}
      </DashboardLayout>
  );
}

export default EditProductPage;
