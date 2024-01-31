import styles from "./ProductCard.module.scss";
import image from "images/chair.jpg";

export default function ProductCard() {
  return (
    <>
      <div className={styles.product_card}>
        <div className={styles.img_place}>
          <img src={image} alt="" />
        </div>
        <div className={styles.product_info}>
          <h2 className={styles.product_name}>Стул Marokko</h2>
          <p className={styles.product_price}>5000$</p>
          <div>{/* Здесь должны быть цветовые варианты */}</div>
          <a className={styles.product_link}>Подробнее</a>
        </div>
      </div>
    </>
  );
}
