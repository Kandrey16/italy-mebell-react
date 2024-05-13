import {
  fetchCollections,
  fetchProducts,
  fetchProductsByCollection,
} from "@/API/ProductAPI";
import ProductCard from "@/components/UI/ProductCard/ProductCard";
import { useEffect, useState } from "react";
import styles from "../SameProductSection/SameSection.module.scss";

import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/scss/pagination";

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
          modules={[Pagination]}
          spaceBetween={1}
          pagination={{
            clickable: true,
          }}
          data-swiper-autoplay="2000"
          breakpoints={{
            // при ширине экрана 320px будет показан 1 слайд
            320: {
              slidesPerView: 1,
            },
            // при ширине экрана 640px будет показано 2 слайда
            640: {
              slidesPerView: 2,
            },
            // при ширине экрана 768px будет показано 3 слайда
            768: {
              slidesPerView: 3,
            },
            // при ширине экрана 1024px будет показано 4 слайда
            1024: {
              slidesPerView: 4,
            },
          }}
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
