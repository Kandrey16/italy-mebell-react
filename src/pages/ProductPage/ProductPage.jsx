import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Card,
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import { fetchOneProduct, fetchAttributes } from "@/API/ProductAPI";
import { Context } from "@/main";
import { observer } from "mobx-react";
import { CART_ROUTE } from "@/routes/utils/consts";
import ProductImage from "./ProductImage";
import ProductDetails from "./ProductDetails";
import ProductSpecification from "./ProductSpecification";
import styles from "./ProductPage.module.scss";
import cart_logo from "@/assets/cart_2.svg";
import SameProductSection from "@/modules/ClientModules/SameProductSection/SameProductSection";
import CommentSection from "@/modules/ClientModules/CommentSection/CommentSection";
import { fetchProductComments } from "@/API/ProductCommentAPI";
import SameCollectionSection from "@/modules/ClientModules/SameCollectionSection/SameCollectionSection";
import { toJS } from "mobx";

const ProductPage = observer(() => {
  const { product, user, cart } = useContext(Context);
  const navigate = useNavigate();
  const { id } = useParams();
  const [productData, setProductData] = useState({
    selectedProduct: {},
    isProductInCart: false,
    specification: [],
    attributes: [],
  });
  const [comments, setComments] = useState([]);

  // console.log(productData.selectedProduct.product_images);
  // console.log(productData.selectedProduct.url_main_image_product);

  useEffect(() => {
    const fetchData = async () => {
      try {
        product.setIsLoading(true);
        await fetchProductDetails(id);
        await fetchAttributesData();
        await fetchComments();
        product.setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        product.setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    const productInCart = checkProductInCart(id);
    setProductData((prevData) => ({
      ...prevData,
      isProductInCart: productInCart,
    }));
  }, [id, cart.cart]);

  const fetchProductDetails = async (id) => {
    try {
      const data = await fetchOneProduct(id);
      setProductData((prevData) => ({
        ...prevData,
        selectedProduct: data,
        specification: data.specifications,
        attributes: data.attributes,
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

  const fetchComments = async () => {
    try {
      const commentsData = await fetchProductComments();
      const currentProductComments = commentsData.filter(
        (comment) => comment.id_product === parseInt(id)
      );
      setComments(currentProductComments);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const checkProductInCart = (id) => {
    return cart.cart.some((item) => item.id_product === parseInt(id));
  };

  const handleAddToCart = (productId, userEmail) => {
    if (user.isAuth) {
      const productInCart = checkProductInCart(productId);
      if (!productInCart) {
        cart
          .addToCart(productId, userEmail)
          .then(() => {
            setProductData((prevData) => ({
              ...prevData,
              isProductInCart: true,
            }));
            cart.getCart(userEmail);
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
    <div className="">
      <div className="container grid grid-cols-2 w-full gap-4 p-6">
        <ProductImage
          mainImageUrl={`${import.meta.env.VITE_APP_API_URL}/${productData.selectedProduct.url_main_image_product}`}
          // additionalImages={`${import.meta.env.VITE_APP_API_URL}/${productData.selectedProduct.product_images}`}
          additionalImages={productData.selectedProduct.product_images || []}
        />
        <Card className="col p-6 flex flex-col justify-between">
          <div>
            <ProductDetails
              name={productData.selectedProduct.name_product}
              article={productData.selectedProduct.article_product}
              price={productData.selectedProduct.price_product}
              rating={productData.selectedProduct.rating}
            />
            <Tabs value="specification">
              <TabsHeader
                className="rounded-none border-b border-blue-gray-50 bg-transparent p-0"
                indicatorProps={{
                  className:
                    "bg-transparent border-b-2 border-gray-900 shadow-none rounded-none",
                }}
              >
                <Tab className="text-xl font-semibold" value="specification">
                  Характеристики
                </Tab>
                <Tab className="text-xl font-semibold" value="description">
                  Описание
                </Tab>
              </TabsHeader>
              <TabsBody>
                <TabPanel value="specification">
                  <ProductSpecification
                    specification={productData.specification}
                    attributes={productData.attributes}
                  />
                </TabPanel>
                <TabPanel value="description">
                  <p>{productData.selectedProduct.description_product}</p>
                </TabPanel>
              </TabsBody>
            </Tabs>
          </div>
          <div className="flex justify-end">
            <button
              className={`${styles.product_button} ${productData.isProductInCart ? styles.product_in_cart : styles.product_add}`}
              onClick={() => handleAddToCart(id, user.user.email_user)}
            >
              <img src={cart_logo} alt="Cart Logo" />
              <p>{productData.isProductInCart ? "Перейти" : "В корзину"}</p>
            </button>
          </div>
        </Card>
      </div>
      <SameProductSection
        id_category={productData.selectedProduct.id_category}
        currentProductId={id}
      />
      <SameCollectionSection
        id_collection={productData.selectedProduct.id_collection}
        currentProductId={id}
      />
      <CommentSection comments={comments} id={id} />
    </div>
  );
});

export default ProductPage;
