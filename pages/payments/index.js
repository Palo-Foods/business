import React from "react";
import { useRouter } from "next/router";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import Spinner from "../../components/ui/Spinner";
import { useFetch } from "../../hooks/crud/useFetch";
import { useDispatch } from "react-redux";
import { setOrder } from "../../slices/navSlice";
import { useStates } from "../../hooks/useStates";

function OrdersPage() {
  const url = "/api/v1.0.0/payments";
  const { items, error, loading } = useFetch(url);
  const { router } = useStates();

  const dispatch = useDispatch();

  const handleNavigation = (business) => {
    //set product to store
    dispatch(setOrder(business));
    router.push(`/payments/${business?.id}`);
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
        <h4 className="text-muted">Payments</h4>
      </div>
      <div class="card my-2">
        <div class="card-body justify-content-start overflow-auto">
          <table className="table table-responsive mt-2">
            <thead>
              <tr>
                <th className="text-nowrap">Payment ID</th>
                <th className="text-nowrap d-none d-md-table-cell">Business</th>
                <th className="text-nowrap d-none d-md-table-cell">Date</th>
                <th className="text-nowrap">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr
                style={{ cursor: "pointer" }}
                onClick={() => handleNavigation("business")}>
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
