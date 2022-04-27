import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import Spinner from "../../components/ui/Spinner";
import { useFetch } from "../../hooks/crud/useFetch";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { selectOrders, setOrder, setOrders } from "../../slices/navSlice";
import { useStates } from "../../hooks/useStates";
import Search from "../../components/ui/Search";
import { read } from "../../functions/crud/FETCH";

const searched = (keyword) => (item) =>
  item?.orderId?.toLowerCase().includes(keyword);

function OrdersPage() {
  const url = "/api/v1.0.0/orders";

  const orders = useSelector(selectOrders);

  const [keyword, setKeyword] = useState("");

  const { loading, setLoading, error, setError } = useStates();

  const router = useRouter();

  const dispatch = useDispatch();

  const fetchData = async () => {
    setLoading(true);
    const response = await read(url);
    setLoading(false);
    if (response.status !== 200) {
      setError(response.statusText);
    } else {
      if (response.data > 0 || response.data === 0) {
        dispatch(setOrders(response.data));
      }
    }
  };

  //fetch data
  useEffect(() => {
    //fetch data
    const getData = async () => {
      await fetchData();
    };

    if (orders.length === 0) {
      getData();
    }
  }, []);

  const handleNavigation = (order) => {
    //set product to store
    dispatch(setOrder(order));
    router.push(`/orders/${order?.id}`);
  };

  return (
    <DashboardLayout>
      <h5 className="text-muted px-0 mb-3">Orders</h5>
      {loading && !error && (
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
