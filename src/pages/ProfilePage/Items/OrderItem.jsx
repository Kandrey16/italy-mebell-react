import React, { useContext, useEffect, useState } from "react";
import { observer } from "mobx-react";
import { Context } from "@/main";
import { useNavigate } from "react-router-dom";
import { PRODUCT_ROUTE } from "@/routes/utils/consts";
import { fetchOneProduct } from "@/API/ProductAPI";

const OrderItem = observer(({ item }) => {
  const [productData, setProductData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchOneProduct(item.id_product).then(setProductData);
  }, [item]);

  if (!productData) {
    return <div>Загрузка данных о продукте...</div>;
  }

  const image = `${import.meta.env.VITE_APP_API_URL}/${productData.url_main_image_product}`;

  return (
    <div
      key={item.id_order_product}
      className="grid grid-cols-[40%_20%_20%_15%_5%] py-3 items-center"
    >
      <div
        className="flex items-center cursor-pointer"
        onClick={() => navigate(PRODUCT_ROUTE + "/" + productData.id_product)}
      >
        <img
          className="w-11 h-11 mx-4"
          src={image}
          alt={productData.name_product}
        />
        <div className="flex flex-col">
          <strong>{productData.name_product}</strong>
          <span>{productData.article_product}</span>
        </div>
      </div>
      <div>
        <span>{productData.price_product} руб.</span>
      </div>
    </div>
  );
});

export default OrderItem;
