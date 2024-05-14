import {
  Card,
  CardHeader,
  Dialog,
  DialogBody,
  DialogFooter,
  Typography,
  Button,
  Select,
  Option,
} from "@material-tailwind/react";
import OrderItem from "./OrderItem";
import { useContext, useEffect, useState } from "react";
import { fetchOneUser } from "@/API/UserAPI";
import { exportOrderData } from "@/API/OrderAPI";
import { Context } from "@/main";
import { toJS } from "mobx";
import { fetchOrderStatuses, updateOrder } from "@/API/OrderAPI";
import OrderEditForm from "./EditOrder";

const OrderCard = ({ data, isAdmin }) => {
  const { order } = useContext(Context);
  const [userData, setUserData] = useState("");
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const [editVisible, setEditVisible] = useState(false);
  const [currentOrder, setCurrentOrder] = useState(null);

  const email = data.order_address.email_user;
  const order_data = order.orders;
  const status_data = order.order_status;
  const payment_data = order.payment_method;

  useEffect(() => {
    fetchOneUser(email).then(setUserData);
    order
      .fetchOrders()
      .then(() => {})
      .catch((error) => {
        console.error("Ошибка при загрузке заказов:", error);
      });
    order
      .fetchOrderStatuses()
      .then(() => {})
      .catch((error) => {
        console.error("Ошибка при загрузке статусов:", error);
      });
    order
      .fetchPaymentMethods()
      .then(() => {})
      .catch((error) => {
        console.error("Ошибка при загрузке статусов:", error);
      });
  }, [order]);

  const getStatusNameById = (statusId) => {
    const status = status_data.find(
      (status) => status.id_order_status === statusId
    );
    return status ? status.name_order_status : "Статус не установлен";
  };

  const getPaymentMethodNameBySelectedOrder = (methodId) => {
    const method = payment_data.find(
      (method) => method.id_payment_method === methodId
    );
    return method ? method.name_payment_method : "Метод не установлен";
  };

  const handleEdit = (orderItem) => {
    setCurrentOrder(orderItem);
    setEditVisible(true);
  };

  const handleShowOrderDetails = (data) => {
    setSelectedOrder(data);
    setShowOrderDetails(true);
  };

  const handleCloseOrderDetails = () => {
    setSelectedOrder(null);
    setShowOrderDetails(false);
  };

  const handleExportOrder = async (id) => {
    try {
      const response = await exportOrderData(id);
      console.log("Export response:", response); // Log the response
      if (!response) {
        throw new Error("Empty response received");
      }
      const contentType = response.type; // Access the content type directly from the response object
      if (!contentType) {
        throw new Error("Content type header not found in response");
      }
      const blob = new Blob([response], {
        type: contentType,
      });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "order.xlsx");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Ошибка при экспорте данных:", error);
    }
  };

  return (
    <>
      <Card
        key={data.id_order}
        className="order bg-white rounded-lg shadow-lg mb-4"
      >
        <CardHeader
          floated={false}
          shadow={false}
          className="flex items-center justify-between rounded-lg mx-0 mt-0 px-4 py-4 bg-[#f5f7fa]"
        >
          <div className="flex items-center space-x-4">
            <div className="flex flex-col">
              <Typography className="font-semibold text-lg">
                Заказ №{data.number_order}
              </Typography>
              <Typography className="text-gray-600">
                Дата: {new Date(data.date_order).toLocaleDateString()}
              </Typography>
            </div>
            <div className="rounded-xl p-2">
              <span>{getStatusNameById(data.id_order_status)}</span>
            </div>

            {isAdmin && (
              <>
                <Button
                  variant="filled"
                  color="green"
                  onClick={() => handleEdit(order_data)}
                >
                  Изменить заказ
                </Button>
                <Button
                  variant="filled"
                  color="blue"
                  onClick={() => handleExportOrder(data.id_order)} // Call the handleExportOrder function on button click
                >
                  Экспорт данных
                </Button>
              </>
            )}

            <OrderEditForm
              orderData={data}
              show={editVisible}
              onHide={() => {
                setEditVisible(false);
                setCurrentOrder(null);
              }}
            />
          </div>
          <div>
            <p className="text-black font-bold text-lg">{data.price_order} ₽</p>
          </div>
        </CardHeader>
        <div className="py-4">
          {data.order_product.map((productItem) => (
            <OrderItem
              key={productItem.id_product}
              item={productItem}
              isAdmin={isAdmin}
            />
          ))}
        </div>
        <div className="flex flex-col px-4 py-4">
          <p className="text-black font-semibold">
            Всего товаров:{" "}
            {data.order_product.reduce(
              (sum, item) => sum + item.count_order_product,
              0
            )}
          </p>

          <p
            className="hover:text-colorPrimary text-lg font-bold"
            onClick={() => {
              handleShowOrderDetails(data);
            }}
          >
            Полная информация
          </p>
        </div>
      </Card>

      {showOrderDetails && selectedOrder && (
        <Dialog
          open={showOrderDetails}
          onClose={handleCloseOrderDetails}
          className="container p-4"
        >
          <DialogBody>
            <div className="grid grid-cols-3">
              <div>
                <h3 className="text-lg font-bold">Информация о клиенте:</h3>
                <p>Имя: {userData.first_name_user}</p>
                <p>Фамилия: {userData.second_name_user}</p>
                <p>Номер телефона: {userData.phone_number_client}</p>
                <p>Почта: {userData.email_user}</p>
              </div>
              <div>
                <h2 className="text-xl font-bold">Информация о заказе:</h2>
                <p>Номер заказа: {selectedOrder.number_order}</p>
                <p>
                  Создан: {new Date(selectedOrder.createdAt).toLocaleString()}
                </p>
                <p>
                  Дата заказа:{" "}
                  {new Date(selectedOrder.date_order).toLocaleDateString()}
                </p>
                <p>Стоимость заказа: {selectedOrder.price_order} ₽</p>
                <p>
                  Метод оплаты:{" "}
                  {getPaymentMethodNameBySelectedOrder(
                    selectedOrder.id_payment_method
                  )}
                </p>
              </div>
              <div>
                <h3 className="text-lg font-bold">Адрес доставки:</h3>
                <p>
                  Адрес:{" "}
                  {selectedOrder.order_address?.address_order || "Не указан"}
                </p>
                <p>
                  Подъезд:{" "}
                  {selectedOrder.order_address?.entrance_order || "Не указан"}
                </p>
                <p>
                  Этаж:{" "}
                  {selectedOrder.order_address?.floor_order || "Не указан"}
                </p>
                <p>
                  Код домофона:{" "}
                  {selectedOrder.order_address?.home_code_order || "Не указан"}
                </p>
              </div>
            </div>
          </DialogBody>
          <DialogFooter>
            <Button
              variant="outline"
              color="green"
              onClick={handleCloseOrderDetails}
            >
              <span>Закрыть</span>
            </Button>
          </DialogFooter>
        </Dialog>
      )}
    </>
  );
};

export default OrderCard;
