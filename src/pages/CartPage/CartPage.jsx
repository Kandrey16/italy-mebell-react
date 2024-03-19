import React, { useContext, useEffect, useState } from "react";
import { observer } from "mobx-react";
import { toJS } from "mobx";
import { Context } from "@/main";
import { Button, Card } from "@material-tailwind/react";
import deleteIcon from "@/assets/delete.svg";
import CartItem from "./CartItem";

const CartPage = observer(() => {
  const { product, user } = useContext(Context);
  const cart = toJS(product.cart);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    product.getCart(user.user.email_user);
  }, [cart]);

  useEffect(() => {
    let items = 0;
    let price = 0;

    cart.forEach((item) => {
      items += item.count_cart_product;
      price += item.product.price_product * item.count_cart_product;
    });

    setTotalItems(items);
    setTotalPrice(price);
  }, [cart]);

  if (cart.length === 0) {
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
        <div className="grid grid-cols-3 gap-10">
          <Card className="col-span-2">
            <div className="table w-full py-3">
              <div className="table-header-group">
                <div className="grid grid-cols-[40%_20%_20%_15%_5%]">
                  <span className="text-lg font-medium">Название</span>
                  <span className="text-lg font-medium">Цена</span>
                  <span className="text-lg font-medium">Количество</span>
                  <span className="text-lg font-medium">Сумма</span>
                </div>
              </div>
              <hr />
              <div className="">
                {cart.map((item) => (
                  <CartItem key={item.id_cart_product} item={item} />
                ))}
              </div>
            </div>
          </Card>

          <Card className="col-span-1 p-4 flex flex-col justify-between">
            <div>
              <h1 className="text-3xl font-bold text-black py-2">Ваша корзина</h1>
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
              <Button color="green">Перейти к оформлению</Button>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
});

export default CartPage;
