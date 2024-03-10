import { Card, Button } from "@material-tailwind/react";
import image from "@/assets/images/chair.jpg";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchOneProduct } from "@/API/ProductAPI";
import { Context } from "@/main";
import { observer } from "mobx-react";
import { toJS } from "mobx";

const ProductPage = observer(() => {
  const { product, user } = useContext(Context);
  const [selectedProduct, setSelectedProduct] = useState({});
  const { id } = useParams();

  useEffect(() => {
    fetchOneProduct(id).then((data) => setSelectedProduct(data));
  }, []);

  return (
    <div className="container grid grid-cols-2 w-full p-6">
      <div className="col flex justify-center items-center">
        <img
          src={`${import.meta.env.VITE_APP_API_URL}/${selectedProduct.url_main_image_product}`}
          className="w-3/4 object-cover object-center rounded-xl "
        />
      </div>
      <Card className="col p-6">
        <h2 className="text-2xl font-semibold text-black uppercase ">
          {selectedProduct.name_product}
        </h2>
        <p className="text-base font-semibold text-colorGray uppercase">
          {selectedProduct.article_product}
        </p>
        <hr />
        <p className="text-3xl font-semibold text-black py-3">
          {selectedProduct.price_product}₽
        </p>
        <hr />
        <p className="text-2xl font-semibold text-black py-3">Характеристики</p>
        <div className="grid grid-cols-2 my-4">
          <div className="col ">
            <p className="text-2xl text-black">Размер</p>
            <p className="text-2xl text-black">Цвет</p>
            <p className="text-2xl text-black">Страна</p>
          </div>
          <div className="col justify-end">
            <p className="text-2xl text-gray-600">54/32</p>
            <p className="text-2xl text-gray-600">Черный</p>
            <p className="text-2xl text-gray-600">Россия</p>
          </div>
        </div>
        <div className="flex justify-end">
          <Button
            className="w-2/4 h-10"
            onClick={(e) => {
              e.stopPropagation();
              if (user.user && user.user.email_user) {
                product
                  .addToCart(id, user.user.email_user) // передайте user.user, а не user
                  .then(() => console.log("Product added to cart"))
                  .catch((error) =>
                    console.log("Error adding product to cart:", error)
                  );
              } else {
                console.log("User or user email is not defined");
              }
            }}
          >
            Добавить в корзину
          </Button>
        </div>
      </Card>
    </div>
  );
});

export default ProductPage;
