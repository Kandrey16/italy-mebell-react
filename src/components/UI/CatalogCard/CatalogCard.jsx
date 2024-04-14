import { useNavigate } from "react-router-dom";
import styles from "./CatalogCard.module.scss";
import { Context } from "@/main";
import { useContext } from "react";
import { CATALOG_ROUTE } from "@/routes/utils/consts";
import { observer } from "mobx-react";
import noProduct from "images/noPicture.jpg";

const CatalogCard = observer(({ category }) => {
  const {product} = useContext(Context)
  const navigate = useNavigate();

  function handleCatalogNavigate() {
    product.setSelectedCategory(category)
    navigate(`${CATALOG_ROUTE}?id_category=${category.id_category}`);
  }

  const imageUrl = category.img_category
    ? `${import.meta.env.VITE_APP_API_URL}/category_photo/${category.img_category}`
    : noProduct;

  return (
    <>
      <div className={styles.card} onClick={handleCatalogNavigate}>
        <img src={imageUrl} alt={category.name_category} />
        <p className={styles.title}>{category.name_category}</p>
      </div>
    </>
  );
});

export default CatalogCard;
