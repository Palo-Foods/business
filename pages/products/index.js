import React, { useState } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import Spinner from "../../components/ui/Spinner";
import { useRouter } from "next/router";
import Link from "next/link";
import { MdAdd, MdDelete, MdModeEditOutline } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { selectMangers, setManager, setManagers } from "../../slices/navSlice";
import DeleteModal from "../../components/modals/DeleteModal";
import Search from "../../components/ui/Search";
import { useStates } from "../../hooks/useStates";
import { useFilter } from "../../hooks/useFilter";
import { useAuth } from "../../hooks/auth/useAuth";
import { useFetch } from "../../hooks/crud/useFetch";

const ManagerTableRow = ({ manager, handleEditManager }) => {
  return (
    <tr>
      <td scope="row" className="text-start ps-0 py-3">
        {manager?.fullName}
      </td>
      <td className="text-nowrap d-none d-md-table-cell">{manager?.region}</td>
      <td className="text-nowrap d-none d-md-table-cell">{manager?.phone}</td>
      <td className="text-nowrap d-none d-md-table-cell"></td>
      <td>
        <a
          type="button"
          onClick={() => handleEditManager(manager)}
          className="me-md-2">
          <MdModeEditOutline size={20} />
        </a>
        <a
          type="button"
          className="ms-3"
          onClick={() =>
            setItem({
              name: manager?.fullName,
              _id: manager?._id,
            })
          }
          data-bs-toggle="modal"
          data-bs-target="#deleteModal">
          <MdDelete className="text-danger" size={20} />
        </a>
      </td>
    </tr>
  );
};

const searched = (keyword) => (item) =>
  item?.fullName?.toLowerCase().includes(keyword);

function ProductsPage() {
  const { auth } = useAuth();
  const url = "/api/v1.1.1/products";

  const managers = useSelector(selectMangers);

  const { region, setRegion } = useStates();

  const { filteredData } = useFilter(managers, region);

  const [keyword, setKeyword] = useState("");

  const router = useRouter();

  const dispatch = useDispatch();

  const [item, setItem] = useState("");

  const { loading, error, fetchData } = useFetch(url, managers, setManagers);
  //2. handle edit of data
  const handleEditManager = (manager) => {
    //set product to store
    dispatch(setManager(manager));

    router.push("/managers/add-manager");
  };

  return (
    <DashboardLayout>
      <div className="d-flex justify-content-between align-items-center mt-2 px-0 mb-3">
        <h5 className="text-muted mb-0 h5">Managers</h5>
        <Link href="/managers/add-manager">
          <a className="btn btn-primary">
            <MdAdd size={18} className="fw-bold" /> <span> Add Manager</span>
          </a>
        </Link>
      </div>
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

      {managers && managers?.length > 0 && (
        <>
          <div className="card">
            <div className="card-body justify-content-start overflow-auto p-4">
              <div className="d-md-flex justify-content-md-between my-md-2 mb-md-4">
                <Search
                  items={managers}
                  keyword={keyword}
                  setKeyword={setKeyword}
                />
                <div className="mt-3 mt-md-0">
                  <select
                    className="custom-select form-select py-1"
                    name="regions"
                    id="regions"
                    value={region}
                    onChange={(e) => setRegion(e.target.value)}>
                    <option value="All">All</option>
                    <option value="Eastern">Eastern</option>
                    <option value="Western">Western</option>
                    <option value="Central">Central</option>
                  </select>
                </div>
              </div>
              <table className="table mt-3 table-responsive">
                <thead>
                  <tr className="text-start ps-0">
                    <th className="text-start ps-0">Manager name</th>
                    <th className="text-nowrap d-none d-md-table-cell">
                      Region
                    </th>
                    <th className="text-nowrap d-none d-md-table-cell">
                      Phone
                    </th>
                    <th className="text-nowrap d-none d-md-table-cell">
                      Location
                    </th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData &&
                    filteredData
                      ?.filter(searched(keyword))
                      .map((manager) => (
                        <ManagerTableRow
                          key={manager?._id}
                          manager={manager}
                          setItem={setItem}
                          handleEditManager={handleEditManager}
                        />
                      ))}
                  {!filteredData &&
                    managers
                      ?.filter(searched(keyword))
                      .map((manager) => (
                        <ManagerTableRow
                          key={manager?._id}
                          manager={manager}
                          setItem={setItem}
                          handleEditManager={handleEditManager}
                        />
                      ))}
                  {filteredData?.length === 0 && (
                    <tr>
                      There are no managers from <b>{region} region</b>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
          {!loading &&
            !error &&
            managers &&
            managers?.length === 0 &&
            "There are no managers"}
          <DeleteModal item={item} url="/api/v1.0.0/managers" />
        </>
      )}
    </DashboardLayout>
  );
}

export default ProductsPage;
