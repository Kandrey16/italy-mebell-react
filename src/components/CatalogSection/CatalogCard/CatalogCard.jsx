import styles from "./CatalogCard.module.scss";

export default function CatalogCard() {
  return (
    <>
      <div className={styles.card}>
        <img
          src="https://rcnetlabs.com/images/skillset/logos/react.png"
          alt=""
        />
      </div>
    </>
  );
}
