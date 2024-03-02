import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "@/components/UI/ProductCard/ProductCard";
import { getProductsAndImages } from "@/API/requests";
import { useFetch } from "@/hooks/useFetch";

export default function ProductSection() {
  // const [products, error] = useProductData();
  // const [products, error] = useFetch("http://localhost:5000/api/product");

  const [products, setProducts] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    getProductsAndImages()
      .then((productsWithImages) => {
        setProducts(productsWithImages);
      })
      .catch((err) => {
        setError(err);
      });
  }, []);

  if (!products) {
    return <div>Загрузка...</div>;
  }

  if (error) {
    return <div>Ошибка: {error.message}</div>;
  }

  return (
    <>
      <div
        className="w-full h-full grid grid-cols-3 gap-4 p-4
          bg-white rounded-xl shadow-xl shadow-blue-gray-900/5"
      >
        {products.map((product, index) => {
          return (
            <div className="col" key={index}>
              <ProductCard product={product} />
            </div>
          );
        })}
      </div>
    </>
  );
}
