import React from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import Link from "next/link";
import { MdBusiness, MdOutlineStore, MdRefresh } from "react-icons/md";
import { useGet } from "../../hooks/useGet";
import TableRow from "../../components/products/TableRow";
import Error from "../../components/Error"
import Loader from "../../components/Loader";
import NoData from "../../components/NoData"

const Table = ({data}) => {
  return (
     <div className="table-responsive">
              <table className="table">
              <thead>
                  <tr className="text-start ps-0">
                    <th>#</th>
                     <th className="">Product name</th>
                    <th className="">Price</th>
                    <th className="">category</th>
                    <th></th>
                </tr>
              </thead>
              <tbody>
                <TableRow data={data} /> 
              </tbody>
              </table>
            </div>
  )
}

function ProductsPage() {
  const { data, getItems, error, loading }: any = useGet("/api/v1.1.1/products")

  let content;

  if (error) content = <Error error={error} getData={getItems} />
  
  if (loading) content = <Loader />
  
   
  if (data?.length === 0) content = 
    (
    <NoData icon={<MdOutlineStore size={100} color="grey" />} content={"There are no products"} />
    )
  
  if (data?.length > 0) content = (
    <div className="card my-2">
          <div className="card-body p-4">
           <Table data={data} />
          </div>
        </div>
  )

  return (
    <DashboardLayout>
      <div className="d-flex justify-content-between align-items-center mt-2 mb-3">
        <h6 className="text-muted mb-0">Products</h6>
        <div className="d-flex justify-content-start align-items-center">
        <Link href="/products/add-product">
          <a className="btn btn-primary btn-sm d-flex justify-content-between align-items-center me-2">
            <MdOutlineStore size={18} />
            <span className="d-none d-md-block ms-2"> Add Product</span>
          </a>
        </Link>
          <a type="button" onClick={getItems} className="btn btn-light btn-sm">
            <MdRefresh />
          </a>
        </div>
      </div>
    {content}
    </DashboardLayout>
  );
}

export default ProductsPage;
