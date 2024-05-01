import React, { useState, useEffect, useContext } from "react";
import {
  Button,
  Card,
  CardBody,
  Dialog,
  Input,
  Typography,
} from "@material-tailwind/react";
import { Context } from "@/main";
import { observer } from "mobx-react";
import { editOrderDelivery, fetchOrderDeliveries } from "@/API/OrderAPI";

const DeliveryEditForm = observer(({ show, onHide, delivery }) => {
  const { order } = useContext(Context);
  const [name, setName] = useState(delivery.name_order_delivery);
  const [price, setPrice] = useState(delivery.price_order_delivery);

  useEffect(() => {
    if (delivery) {
      setName(delivery.name_order_delivery);
      setPrice(delivery.price_order_delivery);
    }
  }, [delivery]);

  const updateDelivery = () => {
    const formData = new FormData();
    formData.append("name_order_delivery", name);
    formData.append("price_order_delivery", price);

    editOrderDelivery(delivery.id_order_delivery, formData).then(() => {
      fetchOrderDeliveries().then((data) => order.setOrders(data));
      onHide();
    });
  };

  return (
    <Dialog
      open={show}
      animate={{
        mount: { scale: 1, y: 0 },
        unmount: { scale: 0.9, y: -100 },
      }}
    >
      <Card className="p-4 rounded-xl">
        <CardBody>
          <form>
            <div className="flex flex-col gap-4">
              <Typography variant="h5" className="mb-2">
                Изменить коллекцию
              </Typography>
              <Input
                type="text"
                size="lg"
                lavel="Название"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Введите новое название способа доставки"
              />
              <Input
                type="number"
                size="lg"
                lavel="Стоимость"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Введите новое название способа доставки"
              />
            </div>
            <Button
              className="my-2"
              color="blue"
              size="md"
              onClick={updateDelivery}
            >
              Обновить
            </Button>
            <Button
              className="my-2"
              variant="outlined"
              color="red"
              size="md"
              onClick={onHide}
            >
              Отмена
            </Button>
          </form>
        </CardBody>
      </Card>
    </Dialog>
  );
});

export default DeliveryEditForm;
