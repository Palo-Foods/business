import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import Spinner from "../../components/ui/Spinner";
import { useRouter } from "next/router";
import Link from "next/link";
import dynamic from "next/dynamic";
import { MdAdd, MdBikeScooter } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { selectRiders, setRiders, setRider } from "../../slices/navSlice";
import DeleteModal from "../../components/modals/DeleteModal";
import { useStates } from "../../hooks/useStates";
import Search from "../../components/ui/Search";
import { useFilter } from "../../hooks/useFilter";
import { useFetch } from "../../hooks/crud/useFetch";
const RidersTableRow = dynamic(() => import("../../components/RidersTableRow"));
const ShowModal = dynamic(() => import("../../components/modals/ShowModal"));
const RiderModalContent = dynamic(() =>
  import("../../components/modals/RiderModalContent")
);

const searched = (keyword) => (item) =>
  item?.name?.toLowerCase().includes(keyword);

function RidersPage() {
  const [edit, setEdit] = useState(false);
  const url = "/api/v1.1.1/users/get-all/riders";

  let riders = useSelector(selectRiders);

  const { region, setRegion } = useStates();

  const { filteredData } = useFilter(riders, region);

  const [keyword, setKeyword] = useState("");

  const router = useRouter();

  const dispatch = useDispatch();

  const [item, setItem] = useState("");

  const { loading, error, fetchData } = useFetch(url, riders, setRiders);

  //match modal to route
  useEffect(() => {
    if (item) {
      //1. if item is set, route to
      router.replace("/riders", `/riders/${item?._id}`, {
        shallow: true,
      });
    }
  }, [item]);

  return (
    <DashboardLayout>
      <div className="d-flex justify-content-between align-items-center mt-2 mb-3">
        <h6 className="text-muted mb-0">Riders</h6>
        <Link href="/riders/add-rider">
          <a
            className="btn btn-primary d-flex justify-content-between align-items-center"
            onClick={() => dispatch(setRider(""))}>
            <MdAdd size={18} />
            <span className="d-none d-md-block ms-2"> Add rider</span>
          </a>
        </Link>
      </div>
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
      {loading && (
        <div className="d-flex justify-content-center align-items-center h-100 my-5">
          <Spinner />
        </div>
      )}

      {riders && riders?.length > 0 && (
        <div className="card my-2">
          <div className="card-body justify-content-start overflow-auto p-4">
            <div className="d-md-flex justify-content-md-between my-md-2 mb-md-4">
              <Search
                items={riders}
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
                  <option value="Greater Accra">Greater Accra</option>
                </select>
              </div>
            </div>
            <table className="table mt-3 table-responsive">
              <thead>
                <tr className="text-start ps-0">
                  <th className="ps-0">Company name</th>
                  <th className="text-nowrap d-none d-md-table-cell">
                    Owner name
                  </th>
                  <th className="text-nowrap d-none d-md-table-cell">Phone</th>
                  <th className="text-nowrap d-none d-md-table-cell">Region</th>
                </tr>
              </thead>
              <tbody>
                {filteredData &&
                  filteredData
                    ?.filter(searched(keyword))
                    .map((rider) => (
                      <RidersTableRow
                        key={rider?._id}
                        rider={rider}
                        setItem={setItem}
                        handleEditRider={handleEditRider}
                      />
                    ))}
                {!filteredData &&
                  riders
                    ?.filter(searched(keyword))
                    .map((rider) => (
                      <RidersTableRow
                        key={rider?._id}
                        rider={rider}
                        setItem={setItem}
                      />
                    ))}
                {filteredData?.length === 0 && (
                  <tr>There are no riders from {region} region</tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
      {riders && !loading && !error && riders?.length === 0 && (
        <div className="text-center">
          <MdBikeScooter size={100} className="text-muted my-4" />
          <p>There are no riders</p>
        </div>
      )}
      <DeleteModal
        type="rider"
        item={item}
        setItem={setItem}
        url="/api/v1.1.1/users/manage/riders"
        fetchData={fetchData}
        router={router}
      />
      <ShowModal
        type="riders"
        item={item}
        setItem={setItem}
        edit={edit}
        setEdit={setEdit}
        router={router}
        content={
          <RiderModalContent edit={edit} setEdit={setEdit} item={item} />
        }
      />
    </DashboardLayout>
  );
}

export default RidersPage;
