import React from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { MdBikeScooter, MdRefresh } from "react-icons/md";
import { useGet } from "../../hooks/useGet";
import LoadingStatus from "../../components/LoadingStatus";
import OrderRow from "../../components/orders/OrderRow";

function OrdersPage() {
 const {data, getItems, status}: any = useGet("/api/v1.1.1/orders")
  return (
    <DashboardLayout>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h6 className="text-muted mb-0">Orders</h6>
        <div>
        <a type="button" onClick={getItems} className="btn btn-light">
          <MdRefresh />
        </a>
        </div>
      </div>

      <LoadingStatus status={status} getItems={getItems} />
      
      {data?.length == 0 &&
        <div className="text-center">
            <div className="my-4">
              <MdBikeScooter size={100} color="grey" />
            </div>
          <p>There are no orders</p>
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
                  <th className="">Shop</th>
                  <th className="">Status</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <OrderRow data={data} /> 
              </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}

export default OrdersPage;
