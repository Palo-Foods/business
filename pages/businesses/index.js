import React, { useState } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import Spinner from "../../components/ui/Spinner";
import { useFetch } from "../../hooks/crud/useFetch";
import { useRouter } from "next/router";
import Link from "next/link";
import { MdAdd, MdDelete, MdModeEditOutline } from "react-icons/md";
import { useDispatch } from "react-redux";
import { setProduct } from "../../slices/navSlice";
import DeleteModal from "../../components/modals/DeleteModal";
import { useStates } from "../../hooks/useStates";

function BusinessesPage() {
  const url = "/api/v1.0.0/businesses";
  const { items, error, loading } = useFetch(url);
  const { router } = useStates();
  const [item, setItem] = useState("");
  const dispatch = useDispatch();

  const handleEditProduct = (product) => {
    //set product to store
    dispatch(setProduct(product));
    router.push("/businesses/add-business");
  };

  return (
    <DashboardLayout>
      {loading && (
        <div className="d-flex justify-content-center align-items-center h-100 my-5">
          <Spinner />
        </div>
      )}
      {error && (
        <div className="d-flex justify-content-center align-items-center h-100">
          <div className="text-center my-5">
            <p>There was an error</p>
            <button className="btn btn-primary">Reload</button>
          </div>
        </div>
      )}

      <div className="d-flex justify-content-between mt-2">
        <h4 className="text-muted">Businesses</h4>
        <Link href="/businesses/add-business">
          <a className="btn btn-primary">
            <MdAdd size={18} /> <span> Add Business</span>
          </a>
        </Link>
      </div>
      <div class="card my-2">
        <div class="card-body justify-content-start overflow-auto">
          <table className="table mt-2 table-responsive">
            <thead>
              <tr>
                <th>Business name</th>
                <th className="text-nowrap d-none d-md-table-cell">
                  Owner name
                </th>
                <th className="text-nowrap d-none d-md-table-cell">Phone</th>
                <th className="text-nowrap d-none d-md-table-cell">Location</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td scope="row"></td>
                <td className="text-nowrap d-none d-md-table-cell"></td>
                <td className="text-nowrap d-none d-md-table-cell"></td>
                <td className="text-nowrap d-none d-md-table-cell"></td>
                <td>
                  <a
                    type="button"
                    onClick={handleEditProduct}
                    className="me-md-2">
                    <MdModeEditOutline size={20} />
                  </a>
                  <a
                    type="button"
                    className="ms-3"
                    onClick={() => setItem({ _id: "2993", name: "Alex shop" })}
                    data-bs-toggle="modal"
                    data-bs-target="#deleteModal">
                    <MdDelete className="text-danger" size={20} />
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <DeleteModal item={item} url="/api/v1.0.0/businesses" />
    </DashboardLayout>
  );
}

export default BusinessesPage;
