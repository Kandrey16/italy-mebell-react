//хук для многократного использования данных в приложении
import { useEffect, useState } from "react";
import { getProducts, getProductImages } from "@/API/requests";
import noProduct from "images/noPicture.jpg";

export const useProductData = () => {
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

  return [products, error];
};
