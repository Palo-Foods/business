import React, { useState, useEffect } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import Spinner from "../../components/ui/Spinner";
import { useRouter } from "next/router";
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
import { read } from "../../functions/crud/FETCH";
import { useFilter } from "../../hooks/useFilter";
import Select from "../../components/ui/Select";

const BusinessTableRow = ({ business, handleEditBusiness, setItem }) => {
  console.log(business);
  return (
    <tr>
      <td scope="row" className="ps-0">
        {business?.name}
      </td>
      <td className="text-nowrap d-none d-md-table-cell">
        {business?.fullName}
      </td>
      <td className="text-nowrap d-none d-md-table-cell">{business?.phone}</td>
      <td className="text-nowrap d-none d-md-table-cell">{business?.region}</td>
      <td className="text-nowrap d-none d-md-table-cell">
        {business?.location}
      </td>
      <td>
        <a
          type="button"
          onClick={() => handleEditBusiness(business)}
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
  );
};

const searched = (keyword) => (item) =>
  item?.name?.toLowerCase().includes(keyword);

function BusinessesPage() {
  const url = "/api/v1.0.0/businesses";

  let businesses = useSelector(selectBusinesses);

  const { loading, setLoading, error, region, setRegion, setError, setInput } =
    useStates();

  const { filteredData } = useFilter(businesses, region);

  const [keyword, setKeyword] = useState("");

  const router = useRouter();

  const dispatch = useDispatch();

  const [item, setItem] = useState("");

  const fetchData = async () => {
    //when an item is deleted and its successfull and data is been fetched again, we
    //set businesses as empty array
    businesses = [];
    setLoading(true);
    const response = await read(url);
    setLoading(false);
    if (response.status !== 200) {
      setError(response.statusText);
    } else {
      if (response.data) {
        dispatch(setBusinesses(response.data));
      } else {
        setError(response.statusText);
      }
      console.log(response?.data);
    }
  };

  //fetch data
  useEffect(() => {
    //fetch data
    const getData = async () => {
      await fetchData();
    };

    if (businesses.length === 0) {
      getData();
    }
  }, []);

  const handleEditBusiness = (business) => {
    //set product to store
    dispatch(setBusiness(business));
    router.push(`/businesses/add-business`);
  };

  return (
    <DashboardLayout>
      <div className="d-flex justify-content-between align-items-center mt-2 mb-3">
        <h5 className="text-muted mb-0">Businesses</h5>
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

      {businesses && businesses?.length > 0 && (
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
                  <th className="ps-0">Business name</th>
                  <th className="text-nowrap d-none d-md-table-cell">
                    Owner name
                  </th>
                  <th className="text-nowrap d-none d-md-table-cell">Phone</th>
                  <th className="text-nowrap d-none d-md-table-cell">Region</th>
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
                    .map((business) => (
                      <BusinessTableRow
                        key={business?._id}
                        business={business}
                        setItem={setItem}
                        handleEditBusiness={handleEditBusiness}
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
                        handleEditBusiness={handleEditBusiness}
                      />
                    ))}
                {filteredData?.length === 0 && (
                  <tr>
                    There are no business from <b>{region} region</b>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
      {!loading &&
        !error &&
        businesses?.length === 0 &&
        "There are no businesses"}
      <DeleteModal
        item={item}
        setItem={setItem}
        url="/api/v1.0.0/businesses"
        fetchData={fetchData}
      />
    </DashboardLayout>
  );
}

export default BusinessesPage;
