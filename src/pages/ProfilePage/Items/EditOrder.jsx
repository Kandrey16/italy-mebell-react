import React, { useState, useEffect, useContext } from "react";
import {
  Button,
  Dialog,
  Select,
  Option,
  Typography,
  CardBody,
  DialogBody,
  DialogFooter,
  Input,
} from "@material-tailwind/react";
import { Context } from "@/main";
import { fetchOrderStatuses, updateOrder } from "@/API/OrderAPI";
import { toJS } from "mobx";

const OrderEditForm = ({ show, onHide, orderData }) => {
  const { order } = useContext(Context);
  const [price, setPrice] = useState(orderData.price_order);
  const [selectedStatusId, setSelectedStatusId] = useState(
    orderData.id_order_status
  );

  useEffect(() => {
    fetchOrderStatuses()
      .then((data) => {
        order.setOrderStatuses(data);
        if (orderData) {
          setSelectedStatusId(orderData.id_order_status);
          order.setSelectedOrderStatus(orderData.order_status);
        }
      })
      .catch((error) => {
        console.error("Ошибка при загрузке статусов:", error);
      });
  }, []);

  const handleStatusChange = () => {
    if (!selectedStatusId) return;

    console.log("Статус для обновления: ", selectedStatusId);
    const formData = new FormData();
    formData.append("price_order", price);
    formData.append("id_order_status", selectedStatusId);

    updateOrder(orderData.id_order, formData)
      .then(() => {
        console.log("Обновление произошло", orderData.id_order, price);
        onHide(); // Закрыть диалоговое окно после успешного изменения
      })
      .catch((error) => {
        console.error("Ошибка при изменении статуса заказа:", error);
      });
  };

  return (
    <Dialog open={show} onClose={onHide}>
      <CardBody>
        <DialogBody>
          <div className="my-2">
            <Typography variant="h5" className="mb-2">
              Подтвердить окончательную цену заказа
            </Typography>
            <Input
              type="number"
              color="blue"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <Typography variant="h5" className="mb-2">
              Изменить статус заказа
            </Typography>
            <Select
              color="blue"
              label="Статус заказа"
              value={selectedStatusId}
              onChange={(value) => {
                setSelectedStatusId(value);
              }}
            >
              {order.order_status.map((status) => (
                <Option
                  key={status.id_order_status}
                  value={status.id_order_status}
                >
                  {status.name_order_status}
                </Option>
              ))}
            </Select>
          </div>
        </DialogBody>
        <DialogFooter>
          <Button color="blue" onClick={handleStatusChange}>
            Сохранить изменения
          </Button>
          <Button color="red" variant="outlined" onClick={onHide}>
            Отмена
          </Button>
        </DialogFooter>
      </CardBody>
    </Dialog>
  );
};

export default OrderEditForm;
