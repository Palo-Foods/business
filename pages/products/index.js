import React, { useState } from "react";
import Spinner from "../../components/ui/Spinner";
import Link from "next/link";
import { MdAdd, MdDangerous, MdShoppingBasket } from "react-icons/md";
import DeleteModal from "../../components/modals/DeleteModal";
import Search from "../../components/ui/Search";
import { useStates } from "../../hooks/useStates";
import { useFetch } from "../../hooks/crud/useFetch";
import Select from "../../components/ui/Select";
import ProductTableRow from "../../components/ProductTableRow";
import { useCategoryFilter } from "../../hooks/useCategoryFilter";

const searched = (keyword) => (item) =>
  item?.name?.toLowerCase().includes(keyword);

function ProductsPage() {
  const url = "/api/v1.1.1/products";

  const { type, setType, setInput, router } = useStates();

  const [keyword, setKeyword] = useState("");

  const [item, setItem] = useState("");

  const { data, loading, error, fetchData } = useFetch(url);
  console.log("data", data?.products);

  const { filteredData } = useCategoryFilter(data?.products, type);

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
        <div className="card">
          <div className="card-body d-flex justify-content-between">
            <div className="d-flex justify-content-start align-items-center">
              <h6 className="mb-0 me-2">Products</h6>
              {data?.products && (
                <Search
                  items={data?.products}
                  keyword={keyword}
                  setKeyword={setKeyword}
                  className="ms-3"
                />
              )}
            </div>
            <div>
              {data?.products && (
                <Select
                  text={type}
                  setInput={setInput}
                  setText={setType}
                  options={[
                    "All",
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
              )}
            </div>
          </div>
        </div>
      </div>

      {loading && (
        <div className="d-flex justify-content-center align-items-center h-100 my-5">
          <Spinner />
        </div>
      )}

      {error && (
        <div className="d-flex justify-content-center align-items-center h-100 my-5">
          <MdDangerous size={20} className="text-danger" />
          <a
            type="button"
            className="ms-2 text-black text-decoration-none"
            onClick={fetchData}>
            Reload
          </a>
        </div>
      )}

      {data && data?.products?.length > 0 && (
        <div className="">
          <table className="table mt-2 table-responsive">
            <thead>
              <tr className="text-start ps-0">
                <th className="text-start">Product name</th>
                <th className="text-nowrap d-none d-md-table-cell">Price</th>
                <th className="text-nowrap d-none d-md-table-cell">
                  Discounted price
                </th>
                <th className="text-nowrap d-none d-md-table-cell">Category</th>
              </tr>
            </thead>
            <tbody>
              {filteredData &&
                filteredData
                  ?.filter(searched(keyword))
                  .map((product) => (
                    <ProductTableRow
                      key={product?.id}
                      product={product}
                      setItem={setItem}
                      router={router}
                    />
                  ))}
              {!filteredData &&
                data?.products
                  ?.filter(searched(keyword))
                  .map((product) => (
                    <ProductTableRow
                      key={product?.id}
                      product={product}
                      setItem={setItem}
                      router={router}
                    />
                  ))}
            </tbody>
          </table>
          {filteredData?.length === 0 && (
            <div>
              There are no products from <b>{type} category</b>
            </div>
          )}

          <DeleteModal
            type="product"
            item={item}
            setItem={setItem}
            url="/api/v1.1.1/products"
            fetchData={fetchData}
            router={router}
          />
        </div>
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
