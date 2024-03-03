import { useContext, useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "@/components/UI/ProductCard/ProductCard";
import { Context } from "@/main";
import { observer } from "mobx-react";

const ProductSection = observer(() => {
  const { product } = useContext(Context);
  // const [error, setError] = useState(null);
  // const [products, setProducts] = useState(null);

  // useEffect(() => {
  //   getProductsAndImages()
  //     .then((productsWithImages) => {
  //       setProducts(productsWithImages);
  //     })
  //     .catch((err) => {
  //       setError(err);
  //     });
  // }, []);

  // if (!product) {
  //   return <div>Загрузка...</div>;
  // }

  // if (error) {
  //   return <div>Ошибка: {error.message}</div>;
  // }

  return (
    <>
      <div
        className="w-full h-full grid grid-cols-3 gap-4 p-4
          bg-white rounded-xl shadow-xl shadow-blue-gray-900/5"
      >
        {product.products.map((product) => {
            return (
              <div className="col" key={product.id_product}>
                <ProductCard product={product} />
              </div>
            );
          })}
      </div>
    </>
  );
});

export default ProductSection;
