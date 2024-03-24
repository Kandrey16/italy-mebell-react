import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card } from "@material-tailwind/react";
import { fetchOneProduct, fetchAttributes } from "@/API/ProductAPI";
import { Context } from "@/main";
import { observer } from "mobx-react";
import { CART_ROUTE } from "@/routes/utils/consts";
import ProductImage from "./ProductImage";
import ProductDetails from "./ProductDetails";
import ProductSpecification from "./ProductSpecification";
import styles from "./ProductPage.module.scss";
import cart_logo from "@/assets/cart_2.svg";

const ProductPage = observer(() => {
  const { product, user } = useContext(Context);
  const navigate = useNavigate();
  const { id } = useParams();
  const [productData, setProductData] = useState({
    selectedProduct: {},
    isProductInCart: false,
    specification: [],
    attributes: [],
  });

  useEffect(() => {
    fetchProductDetails(id);
    fetchAttributesData();
  }, [id]);

  useEffect(() => {
    const productInCart = checkProductInCart(id);
    setProductData((prevData) => ({
      ...prevData,
      isProductInCart: productInCart,
    }));
  }, [id, product.cart]);

  const fetchProductDetails = async (id) => {
    try {
      const data = await fetchOneProduct(id);
      setProductData((prevData) => ({
        ...prevData,
        selectedProduct: data,
        specification: data.specifications,
      }));
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  };

  const fetchAttributesData = async () => {
    try {
      const data = await fetchAttributes();
      setProductData((prevData) => ({ ...prevData, attributes: data }));
    } catch (error) {
      console.error("Error fetching attributes:", error);
    }
  };

  const checkProductInCart = (id) => {
    return product.cart.some((item) => item.id_product === parseInt(id));
  };

  const handleAddToCart = (productId, userEmail) => {
    if (user.isAuth) {
      const productInCart = checkProductInCart(productId);
      if (!productInCart) {
        product
          .addToCart(productId, userEmail)
          .then(() => {
            setProductData((prevData) => ({
              ...prevData,
              isProductInCart: true,
            }));
            product.getCart(userEmail);
          })
          .catch((error) =>
            console.log("Error adding product to cart:", error)
          );
      } else {
        navigate(CART_ROUTE);
      }
    } else {
      console.log("User is not auth");
    }
  };

  return (
    <div className="container grid grid-cols-2 w-full p-6">
      <ProductImage
        imageUrl={`${import.meta.env.VITE_APP_API_URL}/${productData.selectedProduct.url_main_image_product}`}
      />
      <Card className="col p-6">
        <ProductDetails
          name={productData.selectedProduct.name_product}
          article={productData.selectedProduct.article_product}
          price={productData.selectedProduct.price_product}
        />
        <ProductSpecification
          specification={productData.specification}
          attributes={productData.attributes}
        />
        <div className="flex justify-end">
          <button
            className={styles.product_button}
            onClick={() => handleAddToCart(id, user.user.email_user)}
          >
            <img src={cart_logo} alt="Cart Logo" />
            <p>{productData.isProductInCart ? "Перейти" : "В корзину"}</p>
          </button>
        </div>
      </Card>
    </div>
  );
});

export default ProductPage;
