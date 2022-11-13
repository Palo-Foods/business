import React from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { MdFoodBank, MdRefresh } from "react-icons/md";
import OrderRow from "../../components/orders/OrderRow";
import Loader from "../../components/Loader";
import Error from "../../components/Error";
import NoData from "../../components/NoData";
import { useCrud } from "../../hooks/useCrud";

const Table = ({data}) => {
  return (
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
  )
}

function OrdersPage() {
  const { data, handlefetchData, error, loading }: any = useCrud("/api/v1.1.1/orders")
  let content;

  if (error) content = <Error error={error} getData={handlefetchData} />
  
  if (loading) content = <Loader />
  
   
  if (data?.length === 0) content = 
    (
    <NoData icon={<MdFoodBank size={100} color="grey" />} content={"There are no orders"} />
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
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h6 className="text-muted mb-0">Orders</h6>
        <div>
        <a type="button" onClick={handlefetchData} className="btn btn-light">
          <MdRefresh />
        </a>
        </div>
      </div>

      {content}
    </DashboardLayout>
  );
}

export default OrdersPage;
