import React, { useState } from "react";
import { useRouter } from "next/router";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import Spinner from "../../components/ui/Spinner";
import { useFetch } from "../../hooks/crud/useFetch";
import { useDispatch, useSelector } from "react-redux";
import { selectPayments, setOrder } from "../../slices/navSlice";
import { useStates } from "../../hooks/useStates";
import Search from "../../components/ui/Search";

const searched = (keyword) => (item) =>
  item?.name?.toLowerCase().includes(keyword);

function OrdersPage() {
  const url = "/api/v1.0.0/payments";

  const payments = useSelector(selectPayments);

  const [keyword, setKeyword] = useState("");

  const { loading, error, fetchData } = useFetch(url, payments, selectPayments);

  const { router } = useStates();

  const dispatch = useDispatch();

  const handleNavigation = (business) => {
    //set product to store
    dispatch(setOrder(business));
    router.push(`/payments/${business?.id}`);
  };

  return (
    <DashboardLayout>
      <h4 className="text-muted px-0">Payments</h4>

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
        payments &&
        payments?.length === 0 &&
        "There are no payments"}
      {payments && payments?.length > 0 && (
        <div className="card my-2">
          <div className="card-body justify-content-start overflow-auto">
            <Search
              items={businesses}
              keyword={keyword}
              setKeyword={setKeyword}
            />
            <table className="table table-responsive mt-2">
              <thead>
                <tr>
                  <th className="text-nowrap">Payment ID</th>
                  <th className="text-nowrap d-none d-md-table-cell">
                    Business
                  </th>
                  <th className="text-nowrap d-none d-md-table-cell">Date</th>
                  <th className="text-nowrap">Status</th>
                </tr>
              </thead>
              <tbody>
                {payments?.filter(searched(keyword)).map((payment) => (
                  <tr
                    style={{ cursor: "pointer" }}
                    onClick={() => handleNavigation(payment)}>
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
