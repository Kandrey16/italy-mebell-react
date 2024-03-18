import React from "react";
import { Button } from "@material-tailwind/react";

const CartItemQuantity = ({ item, product, updateQuantity, minusIcon, plusIcon }) => {
  return (
    <div className="p-1 rounded-xl">
      <Button
        className="rounded-full"
        color="white"
        variant="outline"
        size="sm"
        ripple={true}
        onClick={() => updateQuantity(item.id_cart_product, item.count_cart_product - 1)}
        disabled={item.count_cart_product === 1}
      >
        <img className="w-4 h-4" src={minusIcon} alt="" />
      </Button>
      <span className="mx-2 text-lg">{item.count_cart_product}</span>
      <Button
        className="rounded-full"
        color="white"
        variant="outline"
        size="sm"
        ripple={true}
        onClick={() => updateQuantity(item.id_cart_product, item.count_cart_product + 1)}
        disabled={item.count_cart_product >= item.product.count_product}
      >
        <img className="w-4 h-4" src={plusIcon} alt="" />
      </Button>
    </div>
  );
};

export default CartItemQuantity;
