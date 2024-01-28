import styles from "./CatalogCard.module.scss";

export default function CatalogCard({ imageUrl, title }) {
  return (
    <>
      <div className={styles.card}>
        <img src={imageUrl} alt={title} />
        <p className={styles.title}>{title}</p>
      </div>
    </>
  );
}
