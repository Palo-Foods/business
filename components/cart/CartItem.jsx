import React from "react";
import Image from "next/image";
import ReduceItemInCart from "./ui/ReduceItemInCart";
import IncreaseItemInCart from "./ui/IncreaseItemInCart";
import RemoveItemFromCart from "./ui/RemoveItemFromCart";

function CartItem({ item }) {
  //destructure item
  const { id, img, name, qty, price } = item;

  return (
    <div className="d-flex my-3">
      <div className="flex-shrink-0">
        <div className="d-none d-md-block">
          <Image
            className="cart-item-img"
            src={item?.img}
            width={40}
            height={40}
            alt="food"
          />
        </div>
        <div className="d-md-none">
          <Image
            className="cart-item-img"
            src={item?.img}
            width={60}
            height={60}
            alt="food"
          />
        </div>
      </div>
      <div className="flex-grow-1 ms-3">
        <div className="d-flex justify-content-between">
          <div>
            <p className="fw-bold mb-0">{name}</p>
            <p className="fw-bold text-muted mb-0 d-flex justify-content-between align-items-center my-2">
              <ReduceItemInCart product={item} />
              <span className="mx-3">Qty: {qty} </span>
              <IncreaseItemInCart product={item} />
            </p>
            <p className="my-2">
              <RemoveItemFromCart product={item} />
            </p>
          </div>
          <div>
            <p className="fw-bold">Ghc {price}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
