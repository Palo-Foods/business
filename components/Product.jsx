import React from "react";
//import RateProduct from "./RateProduct";
import Image from "next/image";
import AddToCart from "./ui/AddToCart";

function Product({ product }) {
  const { id, price, name, img } = product;
  return (
    <>
      <div className="card border-0 shadow py-md-3">
        <Image
          className="card-img-top text-center img-fluid"
          src={img}
          width={200}
          height={200}
          alt="food"
        />
        <div className="card-body text-center my-md-2">
          <h5 className="">{name}</h5>
          <h5 className="card-text text-primary fw-bold">Ghc {price}</h5>
        </div>
        <div className="text-center mb-md-2 px-md-3">
          <AddToCart product={{ id, price, name, img }} />
        </div>
      </div>
    </>
  );
}

export default Product;
