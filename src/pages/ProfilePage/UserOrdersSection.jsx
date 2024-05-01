import { useState } from "react";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  Card,
  CardHeader,
  Typography,
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import OrderItem from "./Items/OrderItem";
import OrderCard from "./Items/OrderCard";
import { toJS } from "mobx";

export const UserOrders = ({ orders, open, handleOpen }) => {

  return (
    <div className="mt-6">
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
              <OrderCard data={order} />
            ))
          ) : (
            <p className="text-gray-500">У вас нет активных заказов.</p>
          )}
        </AccordionBody>
      </Accordion>
    </div>
  );
};
