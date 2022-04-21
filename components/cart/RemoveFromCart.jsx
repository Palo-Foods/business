import React from "react";

function RemoveFromCart() {
  const removeFromCart = (product) => {
    const exist = cart?.find((x) => x.id === product.id);
    if (exist.qty === 1) {
      dispatch(setCart(cart?.filter((x) => x.id !== product.id)));
    } else {
      dispatch(
        setCart(
          cart?.map((x) =>
            x.id === product.id ? { ...exist, qty: exist.qty - 1 } : x
          )
        )
      );
    }
  };
  return <div>RemoveFromCart</div>;
}

export default RemoveFromCart;
