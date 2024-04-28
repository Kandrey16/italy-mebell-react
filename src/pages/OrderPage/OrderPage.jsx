import { Context } from "@/main";
import { observer } from "mobx-react";
import { useContext, useEffect, useState } from "react";
import OrderComplete from "./OrderComplete";
import OrderForm from "./OrderForm";
import OrderSummary from "./OrderSummary";
import { fetchOrderDeliveries, fetchPaymentMethods } from "@/API/OrderAPI";
import { fetchOneUser, updateUserProfile } from "@/API/UserAPI";

const OrderPage = observer(() => {
  const { cart, order, user } = useContext(Context);
  const [completeOrder, setCompleteOrder] = useState(false);
  const [orderNumber, setOrderNumber] = useState(null);

  const [paymentMethods, setPaymentMethods] = useState([]);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);

  const [orderDeliveries, setOrderDeliveries] = useState([]);
  const [selectedOrderDelivery, setSelectedOrderDelivery] = useState(null);

  const [deliveryPrice, setDeliveryPrice] = useState(0);
  const [totalPriceWithDelivery, setTotalPriceWithDelivery] = useState(0);

  const [address, setAddress] = useState("");
  const [entry, setEntry] = useState("");
  const [floor, setFloor] = useState("");
  const [code, setCode] = useState("");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const cartItems = cart.cart;
  const user_data = user.user.email_user;

  const totalItems = cart.totalItems;
  const totalPrice = cart.totalPrice;

  useEffect(() => {
    const loadPaymentMethods = async () => {
      try {
        const methods = await fetchPaymentMethods();
        setPaymentMethods(methods);
        if (methods.length > 0) {
          setSelectedPaymentMethod(methods[0]);
        }
      } catch (error) {
        console.error("Ошибка при загрузке способов оплаты:", error);
      }
    };

    const loadOrderDeliveries = async () => {
      try {
        const deliveries = await fetchOrderDeliveries();
        setOrderDeliveries(deliveries);
        if (deliveries.length > 0) {
          setSelectedOrderDelivery(deliveries[0]);
        }
      } catch (error) {
        console.error("Ошибка при загрузке способов доставки:", error);
      }
    };

    loadPaymentMethods();
    loadOrderDeliveries();
  }, [totalPrice]);

  useEffect(() => {
    if (selectedOrderDelivery && selectedOrderDelivery.price_order_delivery) {
      const delprice = Number(selectedOrderDelivery.price_order_delivery);
      setTotalPriceWithDelivery(totalPrice + delprice);
      setDeliveryPrice(delprice);
    }
  }, [selectedOrderDelivery, totalPrice]);

  useEffect(() => {
    const loadUserProfileData = async () => {
      try {
        const userProfile = await fetchOneUser(user_data);
        if (userProfile) {
          setFirstName(userProfile.first_name_user);
          setLastName(userProfile.second_name_user);
          setPhoneNumber(userProfile.phone_number_client);
        }
      } catch (e) {
        console.error("Ошибка при загрузке профиля пользователя:", error);
      }
    };

    if (user_data) {
      loadUserProfileData();
    }
  }, [user_data]);

  // функция для генерации номера заказа
  const generateOrderNumber = () => {
    return Math.floor(Math.random() * 1000000);
  };

  const submitOrder = async (e) => {
    e.preventDefault();

    const userProfileData = {
      first_name_user: firstName,
      second_name_user: lastName,
      phone_number_client: phoneNumber,
    };

    try {
      await updateUserProfile(user_data, userProfileData);

      const orderData = {
        order: {
          number_order: generateOrderNumber(),
          price_order: totalPriceWithDelivery.toFixed(2),
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
        payment_method: {
          id_payment_method: selectedPaymentMethod
            ? selectedPaymentMethod.id_payment_method
            : null,
        },
        order_delivery: {
          id_order_delivery: selectedOrderDelivery
            ? selectedOrderDelivery.id_order_delivery
            : null,
        },
      };

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
        <OrderComplete orderNumber={orderNumber} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <OrderForm
            firstName={firstName}
            lastName={lastName}
            phoneNumber={phoneNumber}
            setFirstName={setFirstName}
            setLastName={setLastName}
            setPhoneNumber={setPhoneNumber}
            address={address}
            setAddress={setAddress}
            entry={entry}
            setEntry={setEntry}
            floor={floor}
            setFloor={setFloor}
            code={code}
            setCode={setCode}
            submitOrder={submitOrder}
            paymentMethods={paymentMethods}
            selectedPaymentMethod={selectedPaymentMethod}
            setSelectedPaymentMethod={setSelectedPaymentMethod}
            orderDeliveries={orderDeliveries}
            selectedOrderDelivery={selectedOrderDelivery}
            setSelectedOrderDelivery={setSelectedOrderDelivery}
          />
          <OrderSummary
            cartItems={cartItems}
            totalItems={totalItems}
            totalPrice={totalPriceWithDelivery}
            deliveryPrice={deliveryPrice}
          />
        </div>
      )}
    </div>
  );
});

export default OrderPage;
