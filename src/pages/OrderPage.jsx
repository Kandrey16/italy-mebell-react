import { Context } from "@/main";
import {
  Card,
  CardBody,
  Input,
  Button,
} from "@material-tailwind/react";
import { observer } from "mobx-react";
import { useContext } from "react";
import CartItem from "./CartPage/CartItem";

const OrderPage = observer(() => {
  const { product, cart } = useContext(Context);
  const cartItems = cart.cart;

  const totalItems = cart.totalItems;
  const totalPrice = cart.totalPrice;

  return (
    <div className="container mx-auto my-10 p-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div>
          <Card>
            <CardBody>
              <h2 className="text-2xl py-5 font-medium">Ваши данные</h2>

              <form className="flex flex-col gap-4">
                <Input
                  size="md"
                  label="Имя"
                />
                <Input
                  size="md"
                  label="Фамилия"
                />
                <Input
                  size="md"
                  label="Номер телефона"
                />
                <h2 className="pt-6 pb-2 text-2xl font-medium">
                  Данные доставки
                </h2>
                <Input
                  size="md"
                  label="Адрес доставки"
                />
                <Input size="md" label="Подъезд" />
                <Input size="md" label="Этаж" />
                <Input size="md" label="Код" />
                <Button
                  color="blue"
                >
                  Оформить заказ
                </Button>
              </form>
            </CardBody>
          </Card>
        </div>

        <div>
          <Card>
            <CardBody>
              <h2 className="text-2xl py-5 font-medium">Ваша корзина</h2>
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
                <span className="font-medium text-lg">
                  {totalItems} шт.
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-lg">Общая сумма:</span>
                <span className="font-medium text-lg">
                  {totalPrice} руб.
                </span>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
});

export default OrderPage;
