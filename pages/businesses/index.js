import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import Spinner from "../../components/ui/Spinner";
import { useRouter } from "next/router";
import Link from "next/link";
import dynamic from "next/dynamic";
import { MdAdd } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
  selectBusinesses,
  setBusiness,
  setBusinesses,
} from "../../slices/navSlice";
import DeleteModal from "../../components/modals/DeleteModal";
import { useStates } from "../../hooks/useStates";
import Search from "../../components/ui/Search";
import { useFilter } from "../../hooks/useFilter";
import { useFetch } from "../../hooks/crud/useFetch";
const BusinessTableRow = dynamic(() =>
  import("../../components/BusinessTableRow")
);
const ShowModal = dynamic(() => import("../../components/modals/ShowModal"));
const BusinessModalContent = dynamic(() =>
  import("../../components/modals/BusinessModalContent")
);

const searched = (keyword) => (item) =>
  item?.name?.toLowerCase().includes(keyword);

function BusinessesPage() {
  const [edit, setEdit] = useState(false);
  const url = "api/v1.1.1/users/get-all/businesses";

  let businesses = useSelector(selectBusinesses);

  const { region, setRegion } = useStates();

  const { filteredData } = useFilter(businesses, region);

  const [keyword, setKeyword] = useState("");

  const router = useRouter();

  const dispatch = useDispatch();

  const [item, setItem] = useState("");

  const { loading, error, fetchData } = useFetch(
    url,
    businesses,
    setBusinesses
  );

  //match modal to route
  useEffect(() => {
    if (item) {
      //1. if item is set, route to
      router.replace("/businesses", `/businesses/${item?._id}`, {
        shallow: true,
      });
    }
  }, [item]);

  return (
    <DashboardLayout>
      <div className="d-flex justify-content-between align-items-center mt-2 mb-3">
        <h6 className="text-muted mb-0">Businesses</h6>
        <Link href="/businesses/add-business">
          <a
            className="btn btn-primary d-flex justify-content-between align-items-center"
            onClick={() => dispatch(setBusiness(""))}>
            <MdAdd size={18} />
            <span className="d-none d-md-block ms-2"> Add Business</span>
          </a>
        </Link>
      </div>
      {error && !loading && (
        <div className="d-flex justify-content-center align-items-center h-100">
          <div className="text-center my-5">
            <p>There was an error</p>
            <button className="btn btn-primary" onClick={fetchData}>
              Reload
            </button>
          </div>
        </div>
      )}
      {loading && !error && (
        <div className="d-flex justify-content-center align-items-center h-100 my-5">
          <Spinner />
        </div>
      )}
      {businesses && businesses.length > 1 && (
        <div className="card my-2">
          <div className="card-body justify-content-start overflow-auto p-4">
            <div className="d-md-flex justify-content-md-between my-md-2 mb-md-4">
              <Search
                items={businesses}
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
                    .map((business) => (
                      <BusinessTableRow
                        key={business?._id}
                        business={business}
                        setItem={setItem}
                      />
                    ))}
                {!filteredData &&
                  businesses
                    ?.filter(searched(keyword))
                    .map((business) => (
                      <BusinessTableRow
                        key={business?._id}
                        business={business}
                        setItem={setItem}
                      />
                    ))}
                {filteredData?.length === 0 && (
                  <tr>There are no Businesses from {region} region</tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
      {!loading && !error && businesses && businesses?.length === 0 && "There are no businesses"}
      <DeleteModal
        type="business"
        item={item}
        setItem={setItem}
        url="https://api.palooods.com/api/v1.1.1/users/manage/businesses"
        fetchData={fetchData}
        router={router}
      />
      <ShowModal
        type="businesses"
        item={item}
        setItem={setItem}
        edit={edit}
        setEdit={setEdit}
        router={router}
        content={
          <BusinessModalContent edit={edit} setEdit={setEdit} item={item} />
        }
      />
    </DashboardLayout>
  );
}

export default BusinessesPage;
