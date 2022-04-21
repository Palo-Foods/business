import React from "react";
import Image from "next/image";
import RemoveItemFromCart from "./ui/RemoveItemFromCart";
import ReduceItemInCart from "./ui/ReduceItemInCart";
import IncreaseItemInCart from "./ui/IncreaseItemInCart";

function CheckoutItem({ item }) {
  return (
    <div className="d-flex align-items-center my-3">
      <div className="flex-shrink-0">
        <Image
          className="cart-item-img"
          src={item?.img}
          width={100}
          height={100}
          alt="food"
        />
      </div>
      <div className="flex-grow-1 ms-3">
        <div className="d-flex justify-content-between">
          <div>
            <h6 className="fw-bold mb-0">{item?.name}</h6>
            <h6 className="fw-bold text-muted mb-0 d-flex justify-content-between align-items-center my-3">
              <ReduceItemInCart product={item} />
              <span className="mx-3">Qty: {item?.qty} </span>
              <IncreaseItemInCart product={item} />
            </h6>
            <p className="my-3">
              <RemoveItemFromCart product={item} />
            </p>
          </div>
          <div>
            <h6 className="fw-bold">Ghc {item?.price}</h6>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutItem;
