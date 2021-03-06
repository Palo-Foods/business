import React, { useState } from "react";
import Spinner from "../../components/ui/Spinner";
import {
  MdShoppingBag,
  MdInfo,
  MdBikeScooter,
  MdDangerous,
} from "react-icons/md";
import { useFetch } from "../../hooks/crud/useFetch";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import {  setOrder } from "../../slices/navSlice";
import Search from "../../components/ui/Search";

const searched = (keyword) => (item) =>
  item?.id?.toLowerCase().includes(keyword);

function OrdersPage() {
  const url = "/api/v1.1.1/orders";

  const [keyword, setKeyword] = useState("");

  const router = useRouter();

  const dispatch = useDispatch();

  const { data, loading, error, fetchData } = useFetch(url);

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
    <>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h5 className="text-muted mb-0">Orders</h5>
        <div className="form-group">
          <select className="custom-select form-select px-3 py-1" name="" id="">
            <option value="1">Today</option>
            <option value="7">This week</option>
            <option value="30">This month</option>
          </select>
        </div>
      </div>

      <div className="col-6 col-sm-4 col-md-4 mb-3">
        <div className="card">
          <div className="card-body pt-3 pt-md-2 pe-2">
            <div className="text-end d-none d-md-block">
              <MdInfo size={18} className="text-muted" />
            </div>
            <div className="d-flex justify-content-start align-items-center">
              <div className="me-3 d-none d-sm-block">
                <span className="mx-1 bg-info p-2 p-md-3 rounded-circle">
                  <MdShoppingBag size={22} className="mb-2" />
                </span>
              </div>
              <div>
                <p className="text-muted mb-0">Orders pending</p>
                <h1 className="h2 mb-0">3</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-6 col-sm-4 col-md-4 mb-3">
        <div className="card">
          <div className="card-body pt-3 pt-md-2 pe-2">
            <div className="text-end d-none d-md-block">
              <MdInfo size={18} className="text-muted" />
            </div>
            <div className="d-flex justify-content-start align-items-center">
              <div className="me-3 d-none d-sm-block">
                <span className="mx-1 bg-warning p-2 p-md-3 rounded-circle">
                  <MdBikeScooter size={22} className="mb-1" />
                </span>
              </div>
              <div>
                <p className="text-muted mb-0">Delivered orders</p>
                <h1 className="h2 mb-0">30</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-6 col-sm-4 col-md-4 mb-3">
        <div className="card">
          <div className="card-body pt-3 pt-md-2 pe-2">
            <div className="text-end d-none d-md-block">
              <MdInfo size={18} className="text-muted" />
            </div>
            <div className="d-flex justify-content-start align-items-center">
              <div className="me-3 d-none d-sm-block">
                <span className="mx-1 bg-light p-2 p-md-3 rounded-circle">
                  <MdShoppingBag size={22} className="mb-1" />
                </span>
              </div>
              <div>
                <p className="text-muted mb-0">Total orders</p>
                <h1 className="h2 mb-0">50</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-12">
        <div className="bg-white p-3 mb-2 border rounded d-flex justify-content-between align-items-center">
          <h6 className="mb-0">Recent orders</h6>
          <div>
            {loading && <Spinner />}

            {error && (
              <>
                <MdDangerous size={20} className="text-danger" />
                <a
                  type="button"
                  className="ms-2 text-black text-decoration-none"
                  onClick={fetchData}>
                  Reload
                </a>
              </>
            )}
          </div>
        </div>
      </div>
      {data && data?.length > 0 && (
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
                {data?.filter(searched(keyword)).map((order) => (
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

      {data && data?.length === 0 && (
        <div className="text-center">
          <MdShoppingBag size={100} className="text-muted my-4" />
          <p>There are no orders</p>
        </div>
      )}
    </>
  );
}

export default OrdersPage;
