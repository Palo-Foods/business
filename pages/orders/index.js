import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import Spinner from "../../components/ui/Spinner";
import { useFetch } from "../../hooks/crud/useFetch";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { selectOrders, setOrder, setOrders } from "../../slices/navSlice";
import Search from "../../components/ui/Search";

const searched = (keyword) => (item) =>
  item?.orderId?.toLowerCase().includes(keyword);

function OrdersPage() {
  const url = "https://api.palooods.com/api/v1.1.1/orders";

  const orders = useSelector(selectOrders);

  const [keyword, setKeyword] = useState("");

  const router = useRouter();

  const dispatch = useDispatch();

  const { loading, error, fetchData } = useFetch(url, orders, setOrders);

  /* const [item, setItem] = useState("");

  //match modal to route
  useEffect(() => {
    if (item) {
      //1. if item is set, route to
      router.replace("/riders", `/riders/${item?._id}`, {
        shallow: true,
      });
    }
  }, [item]); */

  const handleNavigation = (order) => {
    //set product to store
    dispatch(setOrder(order));
    router.push(`/orders/${order?._id}`);
  };

  return (
    <DashboardLayout>
      <h5 className="text-muted px-0 mb-3">Orders</h5>
      {loading && (
        <div className="d-flex justify-content-center align-items-center h-100">
          <Spinner />
        </div>
      )}
      {error && !loading && (
        <div className="d-flex justify-content-center align-items-center h-100">
          <div className="text-center">
            <p>There was an error</p>
            <button className="btn btn-primary" onClick={fetchData}>
              Reload
            </button>
          </div>
        </div>
      )}

      {orders && orders?.length > 0 && (
        <div className="card">
          <div className="card-body justify-content-start overflow-auto p-4">
            <Search
              items={businesses}
              keyword={keyword}
              setKeyword={setKeyword}
            />
            <table className="table table-responsive mt-2">
              <thead>
                <tr className="text-start ps-0">
                  <th className="text-nowrap">Order ID</th>
                  <th className="text-nowrap d-none d-md-table-cell">Items</th>
                  <th className="text-nowrap d-none d-md-table-cell">Phone</th>
                  <th className="text-nowrap">Order status</th>
                </tr>
              </thead>
              <tbody>
                {orders?.filter(searched(keyword)).map((order) => (
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

      {!loading &&
        !error &&
        orders &&
        orders?.length === 0 &&
        "There are no orders"}
    </DashboardLayout>
  );
}

export default OrdersPage;
