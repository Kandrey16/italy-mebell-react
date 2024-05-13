import React, { useContext, useEffect, useState } from "react";
import { observer } from "mobx-react";
import { toJS } from "mobx";
import { Context } from "@/main";
import { Button, Card } from "@material-tailwind/react";
import deleteIcon from "@/assets/delete.svg";
import CartItem from "./CartItem";
import { useNavigate } from "react-router-dom";
import { ORDER_ROUTE } from "@/routes/utils/consts";

const CartPage = observer(() => {
  const { product, user, cart } = useContext(Context);
  const navigate = useNavigate();
  // const cart = toJS(product.cart);

  const [totalItems, setTotalItems] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    cart.getCart(user.user.email_user);
  }, []);

  useEffect(() => {
    let items = 0;
    let price = 0;

    cart.cart.forEach((item) => {
      items += item.count_cart_product;
      price += item.product.price_product * item.count_cart_product;
    });

    setTotalItems(items);
    setTotalPrice(price);
  }, [cart.cart]);

  if (cart.cart.length === 0) {
    return (
      <div className="container py-10">
        <h1 className="text-4xl">Корзина</h1>
        <div className="text-lg font-medium py-3">Ваша корзина пуста</div>
      </div>
    );
  }

  return (
    <>
      <div className="container py-10">
        <h1 className="text-4xl">Корзина</h1>
        <div className="flex flex-col lg:flex-row gap-10">
          <Card className="w-full lg:w-2/3">
            <div className="py-3">
              <div className="md:grid md:grid-cols-2 lg:grid-cols-5 table-header-group">
                <span className="text-lg font-medium">Название</span>
                <span className="md:col-span-2 lg:col-span-1 text-lg font-medium">
                  Цена
                </span>
                <span className="text-lg font-medium">Количество</span>
                <span className="text-lg font-medium">Сумма</span>
              </div>
              <hr />
              {cart.cart.map((item) => (
                <CartItem
                  key={item.id_cart_product}
                  item={item}
                  canChangeQuantity={true}
                  canRemove={true}
                />
              ))}
            </div>
          </Card>

          <Card className="w-full lg:w-1/3 p-4 flex flex-col justify-between h-56">
            <div>
              <h1 className="text-3xl font-bold text-black py-2">
                Ваша корзина
              </h1>
              <div className="flex items-center mb-2">
                <span className="text-base font-medium mr-2">Количество:</span>
                <p className="text-base text-black">{totalItems} шт.</p>
              </div>
              <div className="flex items-center mb-2">
                <span className="text-base font-medium mr-2">Общая сумма:</span>
                <p className="text-base text-black">{totalPrice} руб.</p>
              </div>
            </div>
            <div className="mt-auto">
              <Button onClick={() => navigate(ORDER_ROUTE)} color="green">
                Перейти к оформлению
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
});

export default CartPage;
