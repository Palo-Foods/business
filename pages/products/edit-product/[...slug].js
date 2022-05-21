import { ObjectID } from "bson";
import React from "react";
import Link from "next/link";
import EditProductForm from "../../../components/forms/EditProduct";
import DashboardLayout from "../../../components/layouts/DashboardLayout";
import { useStates } from "../../../hooks/useStates";
import { connectToDatabase } from "../../../lib/mongodb";

function Product(product) {
  const { setImage, image } = useStates();
  console.log(product);
  return (
    <DashboardLayout>
      <div className="px-3 mt-3 d-flex justify-content-start align-items-center">
        <Link href="/[route]/[page]" as="/dashboard/products">
          <a className="me-2 text-decoration-none">
            <h6 className="mt-2">Products</h6>
          </a>
        </Link>
        <h6 className="mt-2 text-muted">/ Edit Product</h6>
      </div>
      <div className="p-3">
        <EditProductForm productData={product} />
      </div>
    </DashboardLayout>
  );
}

const removeUndefinedForNextJsSerializing = (props) =>
  Object.fromEntries(
    Object.entries(props).filter(([, value]) => value !== undefined)
  );

export const getServerSideProps = async (context) => {
  const { db } = await connectToDatabase();
  const response = await db.collection("products").findOne({
    _id: ObjectID(context?.params?.slug[0]),
  });

  if (!response) {
    return {
      notFound: true,
    };
  }

  const product = response?.products?.find(
    (product) => product.id === context.params.slug[1]
  );

  return {
    props: removeUndefinedForNextJsSerializing({ product }),
  };
};

export default Product;
