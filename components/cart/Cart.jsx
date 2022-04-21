import React from "react";
import Button from "./ui/Button";
import CartItem from "./CartItem";
import { useRouter } from "next/router";
import TotalInfo from "./TotalInfo";
import { useCart } from "../functions/hooks/useCart";

function Cart() {
  const { cart } = useCart();
  const router = useRouter();

  const goTo = () => {
    //2.navigate to checkout
    router.push("/checkout");
  };

  return (
    <>
      <h4 className="mb-4 fw-bold mt-2">Cart</h4>
      <div className="card border-0 shadow  p-2 mb-4">
        <div className="card-body">
          <h5 className="fw-bold">Products ({cart?.length})</h5>
          <div className="my-3 overflow-auto" id="cartContainer">
            {cart?.length > 0 ? (
              cart?.map((item) => <CartItem key={item?.id} item={item} />)
            ) : (
              <div className="text-center my-5">
                <span
                  className="material-icons text-black"
                  style={{ fontSize: 100 }}>
                  shopping_bag
                </span>
                <p>There are no item(s) in cart</p>
              </div>
            )}
          </div>
          <div>
            <TotalInfo />
          </div>
          <div className="d-grid">
            <Button color="primary" classes="w-100" onClick={goTo}>
              <p className="mb-0 fw-bold">Checkout</p>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Cart;
