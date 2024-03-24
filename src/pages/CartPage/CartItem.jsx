import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react";
import { Context } from "@/main";
import QuantityToggle from "./QuantityToogle";
import { PRODUCT_ROUTE } from "@/routes/utils/consts";
import deleteIcon from "@/assets/delete.svg";

const CartItem = observer(({ item }) => {
  const { product } = useContext(Context);
  const navigate = useNavigate();

  const image = `${import.meta.env.VITE_APP_API_URL}/${item.product.url_main_image_product}`;

  const handleRemoveFromCart = () => {
    product.removeFromCart(item.id_cart_product);
  };

  return (
    <div
      key={item.id_cart_product}
      className="grid grid-cols-[40%_20%_20%_15%_5%] py-3 items-center"
    >
      <div>
        <div
          className="flex items-center cursor-pointer"
          onClick={() =>
            navigate(PRODUCT_ROUTE + "/" + item.product.id_product)
          }
        >
          <img
            className="w-11 h-11 mx-4"
            src={image}
            alt={item.product.name_product}
          />
          <div className="flex flex-col">
            <strong>{item.product.name_product}</strong>
            <span>{item.product.article_product}</span>
          </div>
        </div>
      </div>
      <div>
        <span>{item.product.price_product}</span>
      </div>
      <div className="flex items-center justify-start rounded-full w-full">
        <QuantityToggle item={item} />
      </div>
      <div>
        <span>{item.product.price_product * item.count_cart_product}</span>
      </div>
      <div>
        <img
          className="w-6 h-6"
          src={deleteIcon}
          onClick={handleRemoveFromCart}
        />
      </div>
    </div>
  );
});

export default CartItem;
