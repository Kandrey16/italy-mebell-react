import React, { useContext, useEffect, useState } from "react";
import { useParams, NavLink } from "react-router-dom";
import { Card, Button } from "@material-tailwind/react";
import { fetchOneProduct } from "@/API/ProductAPI";
import { Context } from "@/main";
import { observer } from "mobx-react";
import { CART_ROUTE } from "@/routes/utils/consts";
import ProductImage from "./ProductImage";
import ProductDetails from "./ProductDetails";

const ProductPage = observer(() => {
  const { product, user } = useContext(Context);
  const [selectedProduct, setSelectedProduct] = useState({});
  const [isProductInCart, setIsProductInCart] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    fetchProductDetails(id);
  }, [id]);

  useEffect(() => {
    const productInCart = checkProductInCart(id);
    setIsProductInCart(productInCart);
  }, [id, product.cart]);

  const handleAddToCart = (productId, userEmail) => {
    if (user.isAuth) {
      product
        .addToCart(productId, userEmail)
        .then(() => {
          setIsProductInCart(true);
          product.getCart(userEmail);
        })
        .catch((error) => console.log("Error adding product to cart:", error));
    } else {
      console.log("User is not auth");
    }
  };

  const checkProductInCart = (id) => {
    return product.cart.some((item) => item.id_product === parseInt(id));
  };

  const fetchProductDetails = async (id) => {
    const data = await fetchOneProduct(id);
    setSelectedProduct(data);
  };

  return (
    <div className="container grid grid-cols-2 w-full p-6">
      <ProductImage
        imageUrl={`${import.meta.env.VITE_APP_API_URL}/${selectedProduct.url_main_image_product}`}
      />
      <Card className="col p-6">
        <ProductDetails
          name={selectedProduct.name_product}
          article={selectedProduct.article_product}
          price={selectedProduct.price_product}
        />
        <div className="flex justify-end">
          <NavLink to={isProductInCart ? CART_ROUTE : "#"}>
            <Button
              className="h-10 bg-colorPrimary"
              onClick={(e) => {
                e.stopPropagation();
                if (!isProductInCart && user.user && user.user.email_user) {
                  handleAddToCart(id, user.user.email_user);
                }
              }}
            >
              {isProductInCart ? "В корзине" : "Добавить в корзину"}
            </Button>
          </NavLink>
        </div>
      </Card>
    </div>
  );
});

export default ProductPage;
