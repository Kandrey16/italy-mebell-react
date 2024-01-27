import styles from "./CatalogCard.module.scss";
// import { bedroom, chair, kitchen, table } from "../../../assets/images/";

export default function CatalogCard() {
  return (
    <>
      <div className={styles.card}>
        <img
          src="https://okmebell.ru/image/catalog/Stenki/29,01,2020/stenka-na-zakaz-MO-VO.jpg"
          alt=""
        />
        <p className={styles.title}>Кровать</p>
      </div>
    </>
  );
}
