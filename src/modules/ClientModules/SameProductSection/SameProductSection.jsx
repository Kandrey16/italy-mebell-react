import { fetchProducts } from "@/API/ProductAPI";
import ProductCard from "@/components/UI/ProductCard/ProductCard";
import { useEffect, useState } from "react";
import styles from "../SameProductSection/SameSection.module.scss";

import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/scss";
import "swiper/scss/navigation";

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
        modules={[Navigation]}
          spaceBetween={1}
          slidesPerView={4}
          onSlideChange={() => console.log("slide change")}
          onSwiper={(swiper) => console.log(swiper)}
          data-swiper-autoplay="2000"
          navigation
        >
          {sameProduct.map((product) => (
            <SwiperSlide key={product.id_product}>
              <ProductCard  product={product} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default SameProductSection;
