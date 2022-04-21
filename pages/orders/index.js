import React from "react";
import { useRouter } from "next/router";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import Spinner from "../../components/ui/Spinner";
import { useFetch } from "../../hooks/crud/useFetch";
import { useDispatch } from "react-redux";
import { setOrder } from "../../slices/navSlice";

function OrdersPage() {
  const url = "/api/v1.0.0/orders";
  const { items, error, loading } = useFetch(url);
  const dispatch = useDispatch();

  const router = useRouter();
  console.log(router);

  const handleNavigation = (product) => {
    //set product to store
    dispatch(setOrder(product));
    router.push(`/orders/${product?.id}`);
  };
  return (
    <DashboardLayout>
      {loading && (
        <div className="d-flex justify-content-center align-items-center h-100">
          <Spinner />
        </div>
      )}
      {error && (
        <div className="d-flex justify-content-center align-items-center h-100">
          <div className="text-center">
            <p>There was an error</p>
            <button className="btn btn-primary">Reload</button>
          </div>
        </div>
      )}
      <div className="d-flex justify-content-between mt-2">
        <h4 className="text-muted">Orders</h4>
      </div>
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
              <tr
                style={{ cursor: "pointer" }}
                onClick={() => handleNavigation("product")}>
                <td scope="row"></td>
                <td className="d-none d-md-table-cell"></td>
                <td className="d-none d-md-table-cell"></td>
                <td>
                  <span className="badge bg-info text-white">Pending</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default OrdersPage;
