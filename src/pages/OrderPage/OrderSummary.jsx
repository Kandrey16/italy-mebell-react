import { Card, CardBody } from "@material-tailwind/react";
import CartItem from "../CartPage/CartItem";

export default function OrderSummary({ cartItems, totalItems, totalPrice }) {
  return (
    <Card>
      <CardBody>
        <h2 className="text-2xl py-5 font-medium">Ваш заказ</h2>
        {cartItems && cartItems.length > 0 ? (
          cartItems.map((item) => (
            <CartItem
              key={item.id_cart_product}
              item={item}
              canChangeQuantity={false}
              canRemove={false}
            />
          ))
        ) : (
          <p>Корзина пуста</p>
        )}
        <hr className="my-4" />
        <div className="flex justify-between">
          <span className="font-medium text-lg">Общее количество:</span>
          <span className="font-medium text-lg">{totalItems} шт.</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium text-lg">Общая сумма:</span>
          <span className="font-medium text-lg">
            {totalPrice.toFixed(2)} руб.
          </span>
        </div>
      </CardBody>
    </Card>
  );
}
