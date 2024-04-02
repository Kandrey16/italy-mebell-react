import { Context } from "@/main";
import { observer } from "mobx-react";
import { useContext, useState } from "react";
import { MAIN_ROUTE } from "@/routes/utils/consts";
import OrderComplete from "./OrderComplete";
import OrderForm from "./OrderForm";
import OrderSummary from "./OrderSummary";

const OrderPage = observer(() => {
  const { cart, order, user } = useContext(Context);
  const [completeOrder, setCompleteOrder] = useState(false);

  const [orderNumber, setOrderNumber] = useState(null);

  const cartItems = cart.cart;
  const user_data = user.user.email_user;

  const [address, setAddress] = useState("");
  const [entry, setEntry] = useState("");
  const [floor, setFloor] = useState("");
  const [code, setCode] = useState("");

  const totalItems = cart.totalItems;
  const totalPrice = cart.totalPrice;

  // функция для генерации номера заказа
  const generateOrderNumber = () => {
    return Math.floor(Math.random() * 1000000);
  };

  const submitOrder = async (e) => {
    e.preventDefault();

    const orderData = {
      order: {
        number_order: generateOrderNumber(),
        price_order: totalPrice.toFixed(2),
      },
      address: {
        address_order: address,
        entrance_order: parseInt(entry, 10),
        floor_order: parseInt(floor, 10),
        home_code_order: code,
        email_user: user_data,
      },
      products: cart.cart.map((item) => ({
        count_order_product: item.count_cart_product,
        id_cart_product: item.id_cart_product,
      })),
    };

    try {
      console.log("Отправляемые данные заказа:", orderData);
      const newOrder = await order.createOrder(orderData);
      console.log("Заказ успешно оформлен:", newOrder);
      if (newOrder && newOrder.order) {
        setOrderNumber(newOrder.order.number_order);
        setCompleteOrder(true);
      }
    } catch (error) {
      console.error("Ошибка при оформлении заказа:", error);
    }
  };

  return (
    <div className="container mx-auto my-10 p-5">
      {completeOrder ? (
        <OrderComplete orderNumber={orderNumber} route={MAIN_ROUTE} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <OrderForm
            address={address}
            setAddress={setAddress}
            entry={entry}
            setEntry={setEntry}
            floor={floor}
            setFloor={setFloor}
            code={code}
            setCode={setCode}
            submitOrder={submitOrder}
          />
          <OrderSummary
            cartItems={cartItems}
            totalItems={totalItems}
            totalPrice={totalPrice}
          />
        </div>
      )}
    </div>
  );
});

export default OrderPage;