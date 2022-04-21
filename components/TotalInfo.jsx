import React from 'react'
import { useCalculateTotalPrice } from '../functions/hooks/useCalculateTotalPrice';

function TotalInfo() {
  //get item payment info
  const { itemsPrice, taxPrice, shippingPrice, totalPrice } =
    useCalculateTotalPrice();
  return (
    <>
      <p className="d-flex justify-content-between border-top pt-2">
        <span className="fw-bold text-muted">Subtotal</span>
        <span className="fw-bold">{itemsPrice}</span>
      </p>
      <p className="d-flex justify-content-between">
        <span className="fw-bold text-muted">Shipping</span>
        <span className="fw-bold">{shippingPrice}</span>
      </p>
      <p className="d-flex justify-content-between">
        <span className="fw-bold text-muted">Tax</span>
        <span className="fw-bold">{taxPrice.toFixed(2)}</span>
      </p>
      <p className="d-flex justify-content-between border-top pt-2">
        <span className="fw-bold">Total</span>
        <span className="fw-bold">{totalPrice}</span>
      </p>
    </>
  );
}

export default TotalInfo