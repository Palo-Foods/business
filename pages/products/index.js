import React, { useState } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import Spinner from "../../components/ui/Spinner";
import Link from "next/link";
import { MdAdd, MdDangerous } from "react-icons/md";
import { useSelector } from "react-redux";
import { selectProducts, setProducts } from "../../slices/navSlice";
import DeleteModal from "../../components/modals/DeleteModal";
import Search from "../../components/ui/Search";
import { useStates } from "../../hooks/useStates";
import { useFilter } from "../../hooks/useFilter";
import { useAuth } from "../../hooks/auth/useAuth";
import { useFetch } from "../../hooks/crud/useFetch";
import ShowModal from "../../components/modals/ShowModal";

const searched = (keyword) => (item) =>
  item?.fullName?.toLowerCase().includes(keyword);

function ProductsPage() {
  const { auth } = useAuth();
  const url = "/api/v1.1.1/products";

  const products = useSelector(selectProducts);

  const { type, setType } = useStates();

  const { filteredData } = useFilter(products, type);

  const [keyword, setKeyword] = useState("");

  const [item, setItem] = useState("");

  const { loading, error, fetchData } = useFetch(url, products, setProducts);

  return (
    <DashboardLayout>
      <div className="d-flex justify-content-between align-items-center mt-2 px-0 mb-3">
        <h5 className="text-muted mb-0 h5">All your products</h5>
        <Link href="/products/add-product">
          <a className="btn btn-outline-primary d-flex justify-content-start align-items-center">
            <MdAdd size={18} className="fw-bold me-md-2" /> <span className="d-none d-md-block"> Add Product</span>
          </a>
        </Link>
      </div>

      <div className="bg-white p-3 mb-2 border rounded d-flex justify-content-between align-items-center">
        <h6 className="mb-0">Products</h6>
        <div>
          {loading && !error && (
            <div className="d-flex justify-content-center align-items-center h-100">
              <Spinner />
            </div>
          )}

          {error && !loading && (
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

      {products && products?.length > 0 && (
        <>
          <div className="card">
            <div className="card-body justify-content-start overflow-auto p-4">
              <div className="d-md-flex justify-content-md-between my-md-2 mb-md-4">
                <Search
                  items={products}
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
                          products={product}
                          setItem={setItem}
                        />
                      ))}
                  {!filteredData &&
                    products
                      ?.filter(searched(keyword))
                      .map((products) => (
                        <ProductTableRow
                          key={products?._id}
                          products={products}
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
          {!loading && !error && products && products?.length === 0 && (
            <div className="text-center">
              <MdBikeScooter size={100} className="text-muted my-4" />
              <p>There are no products</p>
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
    </DashboardLayout>
  );
}

export default ProductsPage;
