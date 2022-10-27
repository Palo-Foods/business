import React from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import Link from "next/link";
import { MdOutlineStore, MdRefresh } from "react-icons/md";
import { useGet } from "../../hooks/useGet";
import TableRow from "../../components/products/TableRow";
import LoadingStatus from "../../components/LoadingStatus";

function ProductsPage() {
  const { data, getItems, status }: any = useGet("/api/v1.1.1/products")
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

      <LoadingStatus status={status} getItems={getItems} />

      {data?.length == 0 &&
        <div className="text-center">
           <div className="my-4">
              <MdOutlineStore size={100} color="grey" />
            </div>
          <p>There are no products</p>
        </div>
      }

      {data?.length > 0 && (
        <div className="card my-2">
          <div className="card-body p-4">
            <div className="table-responsive">
              <table className="table">
              <thead>
                  <tr className="text-start ps-0">
                    <th>#</th>
                     <th className="">Product name</th>
                  <th className="">Price</th>
                    <th></th>
                </tr>
              </thead>
              <tbody>
                <TableRow data={data} /> 
              </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}

export default ProductsPage;
