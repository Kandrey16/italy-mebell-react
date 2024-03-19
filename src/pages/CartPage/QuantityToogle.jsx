import React, { useContext } from "react";
import { Context } from "@/main";
import { Button } from "@material-tailwind/react";
import minusIcon from "@/assets/round-minus.svg";
import plusIcon from "@/assets/rounded-plus.svg";

const QuantityToggle = ({ item }) => {
  const { product } = useContext(Context);

  const handleDecrement = () => {
    product.updateCartQuantity(
      item.id_cart_product,
      item.count_cart_product - 1
    );
  };

  const handleIncrement = () => {
    product.updateCartQuantity(
      item.id_cart_product,
      item.count_cart_product + 1
    );
  };

  return (
    <div className="p-1 rounded-xl">
      <Button
        className="rounded-full bg-[#ebf7ff] hover:bg-[#d3e7ff]"
        color="white"
        size="sm"
        ripple={true}
        onClick={handleDecrement}
        disabled={item.count_cart_product === 1}
      >
        <img className="w-4 h-4" src={minusIcon} alt="" />
      </Button>
      <span className="mx-3 text-lg">{item.count_cart_product}</span>
      <Button
        className="rounded-full bg-[#ebf7ff] hover:bg-[#d3e7ff]"
        color="white"
        size="sm"
        ripple={true}
        onClick={handleIncrement}
        disabled={item.count_cart_product >= item.product.count_product}
      >
        <img className="w-4 h-4" src={plusIcon} alt="" />
      </Button>
    </div>
  );
};

export default QuantityToggle;
