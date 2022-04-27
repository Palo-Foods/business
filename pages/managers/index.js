import React, { useEffect, useState } from "react";
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
import { read } from "../../functions/crud/FETCH";
import { useFilter } from "../../hooks/useFilter";

const ManagerTableRow = ({ manager, handleEditManager }) => {
  return (
    <tr>
      <td scope="row">{manager?.fullName}</td>
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

function ManagersPage() {
  const url = "/api/v1.0.0/managers";

  const managers = useSelector(selectMangers);

  const { loading, setLoading, error, region, setRegion, setError } =
    useStates();

  const { filteredData } = useFilter(managers, region);

  const [keyword, setKeyword] = useState("");

  const router = useRouter();

  const dispatch = useDispatch();

  const [item, setItem] = useState("");

  const fetchData = async () => {
    setLoading(true);
    const response = await read(url);
    setLoading(false);
    if (response.status !== 200) {
      setError(response.statusText);
    } else {
      if (response.data) {
        dispatch(setManagers(response.data));
      } else {
        setError(response.statusText);
      }
    }
  };

  //fetch data
  useEffect(() => {
    //fetch data
    const getData = async () => {
      await fetchData();
    };

    if (managers.length === 0) {
      getData();
    }
  }, []);

  //2. handle edit of data
  const handleEditManager = (manager) => {
    //set product to store
    dispatch(setManager(manager));

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
      {loading && !error && (
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

      {managers && managers?.length > 0 && (
        <>
          <div className="card">
            <div className="card-body justify-content-start overflow-auto">
              <div className="d-md-flex justify-content-md-between my-md-2 mb-md-4">
                <Search
                  items={managers}
                  keyword={keyword}
                  setKeyword={setKeyword}
                />
                <div>
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
                  {filteredData && filteredData
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

export default ManagersPage;
