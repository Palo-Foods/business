import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import Spinner from "../../components/ui/Spinner";
import { useFetch } from "../../hooks/crud/useFetch";
import { useRouter } from "next/router";
import Link from "next/link";
import { MdAdd, MdDelete, MdModeEditOutline } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { selectMangers, setManager, setManagers } from "../../slices/navSlice";
import DeleteModal from "../../components/modals/DeleteModal";

function ManagersPage() {
  const url = "/api/v1.0.0/managers";

  const managers = useSelector(selectMangers);

  const { loading, error, fetchData } = useFetch(url, managers, setManagers);

  const router = useRouter();

  const dispatch = useDispatch();

  const [item, setItem] = useState("");

  //2. handle edit of data
  const handleEditManager = (manager) => {
    //set product to store
    dispatch(setManager(manager));
    console.log(manager);
    router.push("/managers/add-manager");
  };

  return (
    <DashboardLayout>
      <div className="d-flex justify-content-between mt-2 px-0 mb-3">
        <h4 className="text-muted">Managers</h4>
        <Link href="/managers/add-manager">
          <a className="btn btn-primary">
            <MdAdd size={18} /> <span> Add Manager</span>
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
        managers &&
        managers?.length === 0 &&
        "There are no managers"}
      {managers && managers?.length > 0 && (
        <>
          <div className="card">
            <div className="card-body justify-content-start overflow-auto">
              <table className="table mt-2 table-responsive">
                <thead>
                  <tr>
                    <th>Manager name</th>
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
                  {managers?.map((manager) => (
                    <tr key={manager?._id}>
                      <td scope="row">{manager?.fullName}</td>
                      <td className="text-nowrap d-none d-md-table-cell">
                        {manager?.region}
                      </td>
                      <td className="text-nowrap d-none d-md-table-cell">
                        {manager?.phone}
                      </td>
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
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <DeleteModal item={item} url="/api/v1.0.0/managers" />
        </>
      )}
    </DashboardLayout>
  );
}

export default ManagersPage;
