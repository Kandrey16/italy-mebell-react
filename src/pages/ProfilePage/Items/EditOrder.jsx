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

    const updatedData = {
      order: {
        price_order: price,
      },
      id_order_status: selectedStatusId,
    };

    updateOrder(orderData.id_order, updatedData)
      .then(() => {
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
              onChange={(e) => {
                console.log("Цена изменена: ", e.target.value);
                setPrice(e.target.value);
              }}
            />
            <Typography variant="h5" className="mb-2">
              Изменить статус заказа
            </Typography>
            <Select
              color="blue"
              label="Статус заказа"
              value={selectedStatusId}
              onChange={(value) => {
                console.log("Статус изменен: ", value); // Добавлено: логирование изменения статуса
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
