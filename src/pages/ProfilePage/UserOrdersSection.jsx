import React from "react";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  Card,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import OrderItem from "./Items/OrderItem";
import { toJS } from "mobx";

export const UserOrders = ({ orders, open, handleOpen }) => {
  console.log(toJS(orders));
  return (
    <div className="user-orders mt-6">
      <Accordion open={open === 1}>
        <AccordionHeader
          onClick={() => handleOpen()}
          className="text-2xl font-bold mb-4 cursor-pointer"
        >
          Ваши заказы
        </AccordionHeader>
        <AccordionBody>
          {orders.length > 0 ? (
            orders.map((order) => (
              <Card
                key={order.id_order}
                className="order bg-white rounded-lg shadow-lg mb-4"
              >
                <CardHeader
                  floated={false}
                  shadow={false}
                  className="flex items-center justify-between rounded-lg mx-0 mt-0 px-4 py-4 bg-[#f5f7fa]"
                >
                  <div className="flex-col">
                    <Typography className="font-semibold text-lg">
                      Заказ №{order.number_order}
                    </Typography>
                    <Typography className="text-gray-600">
                      Дата: {new Date(order.date_order).toLocaleDateString()}
                    </Typography>
                  </div>
                  <div>
                    <p className="text-black font-bold text-lg">
                      {order.price_order} ₽
                    </p>
                  </div>
                </CardHeader>
                <div className="py-4">
                  {order.order_product.map((productItem) => (
                    <OrderItem
                      key={productItem.id_product}
                      item={productItem}
                    />
                  ))}
                </div>
                <div className="px-4 py-4">
                  <p className="text-black font-semibold">
                    Всего товаров:{" "}
                    {order.order_product.reduce(
                      (sum, item) => sum + item.count_order_product,
                      0
                    )}
                  </p>
                </div>
              </Card>
            ))
          ) : (
            <p className="text-gray-500">У вас нет активных заказов.</p>
          )}
        </AccordionBody>
      </Accordion>
    </div>
  );
};
