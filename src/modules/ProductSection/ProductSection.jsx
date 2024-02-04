import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "@/components/UI/ProductCard/ProductCard";
import { getProducts, getProductImages } from "@/API/requests";
import { dataProduct } from "@/data/dataProduct";
import noProduct from "images/noPicture.jpg";

export default function ProductSection() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    Promise.all([getProducts, getProductImages])
      .then((res) => {
        const [productsData, imagesData] = res;
        const productsWithImages = productsData.data.map((product) => {
          const productImage = imagesData.data.find(
            (image) => image.id_product === product.id
          );
          if (!productImage) {
            console.log("No image found for product:", product);
          }
          return {
            ...product,
            image: productImage ? productImage.url_image : noProduct,
          };
        });
        setProducts(productsWithImages);
      })
      .catch((err) => {
        console.error(err);
        setError(err);
      });
  }, []);

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
