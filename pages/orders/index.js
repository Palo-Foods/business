import React from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import Spinner from "../../components/ui/Spinner";
import { useFetch } from "../../hooks/crud/useFetch";
import { useDispatch, useSelector } from "react-redux";
import { selectOrders, setOrder, setOrders } from "../../slices/navSlice";
import { useStates } from "../../hooks/useStates";

function OrdersPage() {
  const url = "/api/v1.0.0/orders";
  const orders = useSelector(selectOrders);

  const { loading, error, fetchData } = useFetch(url, orders, setOrders);

  const { router } = useStates();

  const dispatch = useDispatch();

  const handleNavigation = (order) => {
    //set product to store
    dispatch(setOrder(order));
    router.push(`/orders/${product?.id}`);
  };

  return (
    <DashboardLayout>
      <div className="d-flex justify-content-between mt-2">
        <h4 className="text-muted">Orders</h4>
      </div>
      {loading && (
        <div className="d-flex justify-content-center align-items-center h-100">
          <Spinner />
        </div>
      )}
      {error && (
        <div className="d-flex justify-content-center align-items-center h-100">
          <div className="text-center">
            <p>There was an error</p>
            <button className="btn btn-primary" onClick={fetchData}>
              Reload
            </button>
          </div>
        </div>
      )}
      {!loading &&
        !error &&
        orders &&
        orders?.length === 0 &&
        "There are no orders"}
      {orders && orders?.length > 0 && (
        <div class="card my-2">
          <div class="card-body justify-content-start overflow-auto">
            <table className="table table-responsive mt-2">
              <thead>
                <tr>
                  <th className="text-nowrap">Order ID</th>
                  <th className="text-nowrap d-none d-md-table-cell">Items</th>
                  <th className="text-nowrap d-none d-md-table-cell">Phone</th>
                  <th className="text-nowrap">Order status</th>
                </tr>
              </thead>
              <tbody>
                {orders?.map((order) => (
                  <tr
                    key={order?._id}
                    style={{ cursor: "pointer" }}
                    onClick={() => handleNavigation(order)}>
                    <td scope="row"></td>
                    <td className="d-none d-md-table-cell"></td>
                    <td className="d-none d-md-table-cell"></td>
                    <td>
                      <span className="badge bg-info text-white">Pending</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}

export default OrdersPage;
