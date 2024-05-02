import {
  fetchCollections,
  fetchProducts,
  fetchProductsByCollection,
} from "@/API/ProductAPI";
import ProductCard from "@/components/UI/ProductCard/ProductCard";
import { useEffect, useState } from "react";
import styles from "../SameProductSection/SameSection.module.scss";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";

const SameCollectionSection = ({ id_collection, currentProductId }) => {
  const [sameCollectionProducts, setSameCollectionProducts] = useState([]);
  const [collectionName, setCollectionName] = useState("");

  useEffect(() => {
    async function loadData() {
      try {
        const data = await fetchProductsByCollection(id_collection, 1);
        const collectionsData = await fetchCollections();

        if (data && data.rows) {
          const filteredProducts = data.rows.filter(
            (product) => product.id_product !== parseInt(currentProductId)
          );

          const currentCollection = collectionsData.find(
            (collection) => collection.id_collection === parseInt(id_collection)
          );
          if (currentCollection) {
            setCollectionName(currentCollection.name_collection);
          }
          setSameCollectionProducts(filteredProducts);
        } else {
          console.log("Отсутствуют данные 'rows' в ответе от API.");
        }
      } catch (error) {
        console.error("Ошибка при запросе к API:", error);
      }
    }

    if (id_collection) {
      loadData();
    }
  }, [id_collection, currentProductId]);

  if (sameCollectionProducts.length === 0) {
    return null;
  }

  return (
    <div className={styles.same_section}>
      <div className={styles.center}>
        <h2>Этот товар входит в коллекцию {collectionName}</h2>
        <Swiper
          spaceBetween={1}
          slidesPerView={4}
          onSlideChange={() => console.log("slide change")}
          onSwiper={(swiper) => console.log(swiper)}
          data-swiper-autoplay="2000"
        >
          {sameCollectionProducts.map((product) => (
            <SwiperSlide key={product.id_product}>
              <ProductCard product={product} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default SameCollectionSection;
