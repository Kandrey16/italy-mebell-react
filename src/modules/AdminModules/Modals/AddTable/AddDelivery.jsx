import React, { useState, useEffect, useContext } from "react";
import {
  Button,
  Card,
  CardBody,
  Dialog,
  Input,
  Typography,
} from "@material-tailwind/react";
import { createCollection } from "@/API/ProductAPI";
import { observer } from "mobx-react";
import { Context } from "@/main";
import { createOrderDelivery, fetchOrderDeliveries } from "@/API/OrderAPI";

const DeliveryAddForm = observer(({ show, onHide }) => {
  const { order } = useContext(Context);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  const addDelyvery = () => {
    const formData = new FormData();
    formData.append("name_order_delivery", name);
    formData.append("price_order_delivery", price);

    createOrderDelivery(formData).then(() => {
      fetchOrderDeliveries();
      setName("");
      setPrice("");
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
            <div className="">
              <Typography>Способ доствки</Typography>
              <Input
                type="text"
                size="lg"
                value={name}
                lavel="Название"
                onChange={(e) => setName(e.target.value)}
              />
              <Input
                type="number"
                size="lg"
                value={price}
                lavel="Стоимость"
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <Button
              className="my-2"
              color="blue"
              size="md"
              onClick={addDelyvery}
            >
              Создать
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

export default DeliveryAddForm;
