import * as React from 'react';
import { useEffect, useState } from 'react';
import Link from "next/link";
import DashboardLayout from "../../../components/layouts/DashboardLayout";
import AddProductForm from "../../../components/forms/AddProductForm";
import { useStates } from "../../../hooks/useStates";
import DeleteModal from '../../../components/modals/DeleteModal';
import AddextraForm from '../../../components/forms/AddExtraForm';
import { useCrud } from '../../../hooks/useCrud';

function EditProductPage() {
  const {router} = useStates()
  const [url, setUrl] = useState("")
  //get business in store
  const { data, handlefetchData, message, error }: any = useCrud(url);

    console.log(data)
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
           Products
          </a>
        </Link>
        <span className="breadcrumb-item active"> Edit Product</span>
      </nav>

      {data?.id &&
        <>
        <div className='row'>
          <div className="col-md-10 mb-3">
            <div className="card mt-2">
              <div className="card-body my-3">
                <AddProductForm product={data} getItems={handlefetchData} />
          </div>
        </div>
          </div>
        </div>
      
       {/*  <AddextraForm productId={data?.id}/> */}
      
      <DeleteModal name={data?.name} url={`/api/v1.1.1/products/${data?.id}`} getItems={handlefetchData} />
      </>}
      </DashboardLayout>
  );
}

export default EditProductPage;
