import styles from "./ProductCard.module.scss";
import image from "images/chair.jpg";
import arrow_logo from "@/assets/Arrow.svg";
import favourite_logo from "@/assets/favourite.svg";
import cart_logo from "@/assets/cart_2.svg";
import noProduct from "images/noPicture.jpg";

export default function ProductCard({ product }) {
  return (
    <>
      <div className={styles.product_card}>
        <div className={styles.img_place}>
          <img src={product.image ? product.image : noProduct} alt="" />
        </div>
        <div className={styles.product_info}>
          <h2 className={styles.product_name}>{product.name_product}</h2>
          <p className={styles.product_price}>{product.price_product}$</p>
          <div className={styles.product_options}>
            <div className={styles.product_link}>
              <a>Подробнее</a>
              <img src={arrow_logo}></img>
            </div>
            <button>
              <img src={favourite_logo}></img>
            </button>
          </div>
          <button className={styles.product_button}>
            <img src={cart_logo}></img>
            <p>В корзину</p>
          </button>
        </div>
      </div>
    </>
  );
}
