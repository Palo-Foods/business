import React, { useState } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import Spinner from "../../components/ui/Spinner";
import { useFetch } from "../../hooks/crud/useFetch";
import Link from "next/link";
import { MdAdd, MdDelete, MdModeEditOutline } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
  selectBusinesses,
  setBusiness,
  setBusinesses,
} from "../../slices/navSlice";
import DeleteModal from "../../components/modals/DeleteModal";
import { useStates } from "../../hooks/useStates";
import Search from "../../components/ui/Search";

const searched = (keyword) => (item) =>
  item?.businessName?.toLowerCase().includes(keyword);

function BusinessesPage() {
  const url = "/api/v1.0.0/businesses";
  const businesses = useSelector(selectBusinesses);
  const [keyword, setKeyword] = useState("");

  const { loading, error, fetchData } = useFetch(
    url,
    businesses,
    setBusinesses
  );

  const { router } = useStates();

  const [item, setItem] = useState("");

  const dispatch = useDispatch();

  const handleEditProduct = (business) => {
    //set product to store
    dispatch(setBusiness(business));
    router.push(`/businesses/add-business`);
  };

  return (
    <DashboardLayout>
      <div className="d-flex justify-content-between mt-2">
        <h5 className="text-muted">Businesses</h5>
        <Link href="/businesses/add-business">
          <a
            className="btn btn-primary"
            onClick={() => dispatch(setBusiness(""))}>
            <MdAdd size={18} /> <span> Add Business</span>
          </a>
        </Link>
      </div>
      {loading && (
        <div className="d-flex justify-content-center align-items-center h-100 my-5">
          <Spinner />
        </div>
      )}
      {error && (
        <div className="d-flex justify-content-center align-items-center h-100">
          <div className="text-center my-5">
            <p>There was an error</p>
            <button className="btn btn-primary" onClick={fetchData}>
              Reload
            </button>
          </div>
        </div>
      )}
      {!loading &&
        !error &&
        businesses?.length === 0 &&
        "There are no businesses"}
      {businesses && businesses?.length > 0 && (
        <div className="card my-2">
          <div className="card-body justify-content-start overflow-auto">
            <div className="d-flex justify-content-between my-2 mb-4">
              <Search
                items={businesses}
                keyword={keyword}
                setKeyword={setKeyword}
              />
              <div>
                <select
                  className="custom-select form-select py-1"
                  name="regions"
                  id="regions">
                  <option value="7">Eastern</option>
                  <option value="30">Western</option>
                </select>
              </div>
            </div>
            <table className="table mt-2 table-responsive">
              <thead>
                <tr>
                  <th>Business name</th>
                  <th className="text-nowrap d-none d-md-table-cell">
                    Owner name
                  </th>
                  <th className="text-nowrap d-none d-md-table-cell">Phone</th>
                  <th className="text-nowrap d-none d-md-table-cell">
                    Location
                  </th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {businesses.filter(searched(keyword)).map((business) => (
                  <tr>
                    <td scope="row">{business?.businessName}</td>
                    <td className="text-nowrap d-none d-md-table-cell">
                      {business?.fullName}
                    </td>
                    <td className="text-nowrap d-none d-md-table-cell">
                      {business?.phone}
                    </td>
                    <td className="text-nowrap d-none d-md-table-cell"></td>
                    <td>
                      <a
                        type="button"
                        onClick={() => handleEditProduct(business)}
                        className="me-md-2">
                        <MdModeEditOutline size={20} />
                      </a>
                      <a
                        type="button"
                        className="ms-3"
                        onClick={() => setItem(business)}
                        data-bs-toggle="modal"
                        data-bs-target="#deleteModal">
                        <MdDelete className="text-danger" size={20} />
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      <DeleteModal item={item} url="/api/v1.0.0/businesses" />
    </DashboardLayout>
  );
}

export default BusinessesPage;
