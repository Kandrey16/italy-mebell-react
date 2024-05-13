import { fetchProducts } from "@/API/ProductAPI";
import ProductCard from "@/components/UI/ProductCard/ProductCard";
import { useEffect, useState } from "react";
import styles from "../SameProductSection/SameSection.module.scss";

import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/scss";
import "swiper/scss/pagination";

const SameProductSection = ({ id_category, currentProductId }) => {
  const [sameProduct, setSameProduct] = useState([]);

  useEffect(() => {
    if (id_category) {
      fetchProducts(id_category, 1)
        .then((data) => {
          const filteredProducts = data.rows.filter(
            (product) => product.id_product !== parseInt(currentProductId)
          );
          setSameProduct(filteredProducts);
        })
        .catch((error) => {
          console.error("Ошибка вывода похожий товаров", error);
        });
    }
  }, [id_category, currentProductId]);

  if (sameProduct.length === 0) {
    return null;
  }

  return (
    <div className={styles.same_section}>
      <div className={styles.center}>
        <h2>Похожие товары</h2>
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
          {sameProduct.map((product) => (
            <SwiperSlide key={product.id_product}>
              <ProductCard product={product} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default SameProductSection;
