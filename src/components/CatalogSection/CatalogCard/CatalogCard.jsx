import styles from "./CatalogCard.module.scss";
// import { image } from "../assets/images/bedroom.jpg";
export default function CatalogCard() {
  return (
    <>
      <div className={styles.card}>
        <img
          src="https://okmebell.ru/image/catalog/Stenki/29,01,2020/stenka-na-zakaz-MO-VO.jpg"
          alt=""
        />
      </div>
    </>
  );
}
