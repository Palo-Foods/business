import React, { useState } from "react";
import { useRouter } from "next/router";
import { MdOutlinePayment, MdDangerous } from "react-icons/md";
import Spinner from "../../components/ui/Spinner";
import { useFetch } from "../../hooks/crud/useFetch";
import { useDispatch } from "react-redux";
import { setOrder } from "../../slices/navSlice";
import Search from "../../components/ui/Search";

const searched = (keyword) => (item) =>
  item?.id?.toLowerCase().includes(keyword);

function PaymentsPage() {
  const url = "/api/v1.1.1/payments";

  const [keyword, setKeyword] = useState("");

  const router = useRouter();

  const dispatch = useDispatch();

  const { data, loading, error, fetchData } = useFetch(url);

  const handleNavigation = (payments) => {
    //set product to store
    dispatch(setOrder(payments));
    router.push(`/payments/${payments?._id}`);
  };

  return (
    <>
      <h5 className="text-muted px-0 mb-4">Payments</h5>

      <div className="bg-white p-3 mb-2 border rounded d-flex justify-content-between align-items-center">
        <h6 className="mb-0 me-2">Payments</h6>
        <div>
          {loading && (
            <div className="d-flex justify-content-center align-items-center h-100">
              <Spinner />
            </div>
          )}

          {error && (
            <div className="">
              <MdDangerous size={20} className="text-danger" />
              <a
                type="button"
                className="ms-2 text-black text-decoration-none"
                onClick={fetchData}>
                Reload
              </a>
            </div>
          )}
        </div>
      </div>
      {data && data?.length > 0 && (
        <div className="card my-2">
          <div className="card-body justify-content-start overflow-auto p-4">
            <Search
              items={businesses}
              keyword={keyword}
              setKeyword={setKeyword}
            />
            <table className="table table-responsive mt-2">
              <thead>
                <tr className="text-start ps-0">
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
      {data && data?.length === 0 && (
        <div className="text-center">
          <MdOutlinePayment size={100} className="text-muted my-4" />
          <p>There are no payments</p>
        </div>
      )}
    </>
  );
}

export default PaymentsPage;
