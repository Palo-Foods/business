import React, { useState } from "react";
import Spinner from "../../components/ui/Spinner";
import Link from "next/link";
import { MdAdd, MdDangerous, MdShoppingBasket } from "react-icons/md";
import DeleteModal from "../../components/modals/DeleteModal";
import Search from "../../components/ui/Search";
import { useStates } from "../../hooks/useStates";
import { useFilter } from "../../hooks/useFilter";
import { useFetch } from "../../hooks/crud/useFetch";
import ShowModal from "../../components/modals/ShowModal";

const searched = (keyword) => (item) =>
  item?.fullName?.toLowerCase().includes(keyword);

function ProductsPage() {
  const url = "/api/v1.1.1/products";

  const { type, setType } = useStates();

  const [keyword, setKeyword] = useState("");

  const [item, setItem] = useState("");

  const { data, loading, error, fetchData } = useFetch(url);

  const { filteredData } = useFilter(data, type);

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mt-2 mb-3">
        <h5 className="text-muted mb-0">All your products</h5>
        <Link href="/[route]/[page]" as="/dashboard/add-to-products">
          <a className="btn btn-outline-primary d-flex justify-content-start align-items-center">
            <MdAdd size={18} className="me-md-2" />{" "}
            <span className="d-none d-md-block"> Add Product</span>
          </a>
        </Link>
      </div>

      <div>
        <div className="bg-white p-3 mb-2 border rounded d-flex justify-content-between align-items-center">
          <h6 className="mb-0">Products</h6>
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
      </div>
      {data && data?.length > 0 && (
        <>
          <div className="card">
            <div className="card-body justify-content-start overflow-auto p-4">
              <div className="d-md-flex justify-content-md-between my-md-2 mb-md-4">
                <Search
                  items={data}
                  keyword={keyword}
                  setKeyword={setKeyword}
                />

                <div className="mt-3 mt-md-0">
                  <Select
                    text={type}
                    setInput={setInput}
                    setText={setType}
                    options={[
                      "Rice dishes",
                      "Local dishes",
                      "Pizza",
                      "Sandwich",
                      "Salad",
                      "Beverage",
                      "Soup",
                    ]}
                    classes="py-1"
                    id="category"
                  />
                </div>
              </div>
              <table className="table mt-3 table-responsive">
                <thead>
                  <tr className="text-start ps-0">
                    <th className="text-start ps-0">Product name</th>
                    <th className="text-nowrap d-none d-md-table-cell">
                      Price
                    </th>
                    <th className="text-nowrap d-none d-md-table-cell">
                      Category
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData &&
                    filteredData
                      ?.filter(searched(keyword))
                      .map((product) => (
                        <ProductTableRow
                          key={product?._id}
                          product={product}
                          setItem={setItem}
                        />
                      ))}
                  {!filteredData &&
                    data
                      ?.filter(searched(keyword))
                      .map((product) => (
                        <ProductTableRow
                          key={product?._id}
                          product={product}
                          setItem={setItem}
                        />
                      ))}
                  {filteredData?.length === 0 && (
                    <tr>
                      There are no products from <b>{type} category</b>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
          <DeleteModal
            type="product"
            item={item}
            setItem={setItem}
            url="/api/v1.1.1/products"
            fetchData={fetchData}
            router={router}
          />
          <ShowModal
            type="products"
            item={item}
            setItem={setItem}
            edit={edit}
            setEdit={setEdit}
            router={router}
            content={
              <RiderModalContent edit={edit} setEdit={setEdit} item={item} />
            }
          />
        </>
      )}
      {data && data?.length === 0 && (
        <div className="text-center">
          <MdShoppingBasket size={100} className="text-muted my-4" />
          <p>There are no products</p>
        </div>
      )}
    </>
  );
}

export default ProductsPage;
