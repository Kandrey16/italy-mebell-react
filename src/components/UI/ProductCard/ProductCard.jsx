import styles from "./ProductCard.module.scss";
import arrow_logo from "@/assets/Arrow.svg";
import favourite_logo from "@/assets/favourite.svg";
import cart_logo from "@/assets/cart_2.svg";
import noProduct from "images/noPicture.jpg";
import { useNavigate } from "react-router-dom";
import { PRODUCT_ROUTE } from "@/routes/utils/consts";
import { useState, useContext } from "react";
import { Context } from "@/main";
import { observer } from "mobx-react";
import { Rating } from "@material-tailwind/react";

//Карточка товара 
const ProductCard = observer(({ product }) => {
  const navigate = useNavigate();

  const imageUrl = product.url_main_image_product
    ? `${import.meta.env.VITE_APP_API_URL}/${product.url_main_image_product}`
    : noProduct;

  const formattedPrice = new Intl.NumberFormat("ru-RU").format(
    product.price_product
  );

  const normalizedRating = product.rating ? Math.ceil(product.rating) : 0;

  return (
    <>
      <div
        className={styles.product_card}
        onClick={() => navigate(PRODUCT_ROUTE + "/" + product.id_product)}
      >
        <div className={styles.img_place}>
          <img src={imageUrl} alt="" />
        </div>
        <div className={styles.product_info}>
          <h2 className={styles.product_name}>{product.name_product}</h2>
          <p className={styles.product_price}>{formattedPrice}₽</p>

          <Rating value={normalizedRating} readonly />

          <div className={styles.product_options}>
            <div className={styles.product_link}>
              <a>Подробнее</a>
              <img src={arrow_logo}></img>
            </div>
          </div>
        </div>
      </div>
    </>
  );
});

export default ProductCard;
