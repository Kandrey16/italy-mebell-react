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
  // const [selectedStatus, setSelectedStatus] = useState(data.id_order_status);
  // const [isStatusDialogOpen, setIsStatusDialogOpen] = useState(false);

  const email = data.order_address.email_user;
  const order_data = order.orders;
  const status_data = order.order_status;
  // console.log(status_data);
  //   console.log(toJS(order_data));
  // console.log(toJS(order));
  // console.log(orderStatuses);
  //   console.log(toJS(data));

  useEffect(() => {
    if (isAdmin) {
      fetchOneUser(email).then(setUserData);
      order
        .fetchOrders()
        .then(() => {
          // console.log("Заказы после загрузки", toJS(order_data));
        })
        .catch((error) => {
          console.error("Ошибка при загрузке заказов:", error);
        });
      order
        .fetchOrderStatuses()
        .then(() => {
          // console.log("Статусы после загрузки", toJS(status_data));
        })
        .catch((error) => {
          console.error("Ошибка при загрузке статусов:", error);
        });
    }
  }, [isAdmin, order]);

  const getStatusNameById = (statusId) => {
    const status = status_data.find(
      (status) => status.id_order_status === statusId
    );
    return status ? status.name_order_status : "Статус не установлен";
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

  // const handleOpenStatusDialog = (data) => {
  //   setIsStatusDialogOpen(true);
  //   setSelectedOrder(data);
  // };

  // const handleCloseStatusDialog = () => {
  //   setIsStatusDialogOpen(false);
  //   setSelectedOrder(null);
  // };

  // const updateOrderStatus = () => {
  //   updateOrder(data.id_order, selectedStatus)
  //     .then(() => {
  //       fetchOrderStatuses().then((data) => {
  //         order.setOrderStatuses(data); // Обновление статусов заказа
  //       });
  //     })
  //     .catch((error) => {
  //       console.error("Ошибка при обновлении статуса заказа:", error);
  //     });
  // };

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
              <Button
                variant="filled"
                color="green"
                onClick={() => handleEdit(order_data)}
              >
                Изменить заказ
              </Button>
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
            onClick={() => handleShowOrderDetails(data)}
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
              </div>
              <div>
                <h3 className="text-lg font-bold">Адрес доставки:</h3>
                <p>Адрес: {selectedOrder.order_address.address_order}</p>
                <p>Подъезд: {selectedOrder.order_address.entrance_order}</p>
                <p>Этаж: {selectedOrder.order_address.floor_order}</p>
                <p>
                  Код домофона: {selectedOrder.order_address.home_code_order}
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
