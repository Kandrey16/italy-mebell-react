import React, { useEffect, useState } from "react";
import { Card, Button } from "@material-tailwind/react";
import TableHead from "../TableVisual/TableHead";
import TableRow from "../TableVisual/TableRow";
import { observer } from "mobx-react";
import { useContext } from "react";
import { Context } from "@/main";
import { fetchOrders } from "@/API/OrderAPI";

const TABLE_HEAD = ["ID", "№ Заказа", "Сумма", "Дата", "Адрес", "", ""];

const OrderTable = observer(() => {
  const { order } = useContext(Context);

  useEffect(() => {
    fetchOrders()
      .then((data) => {
        order.setOrders(data);
      })
      .catch((error) => {
        console.error("Ошибка при загрузке заказов:", error);
      });
  }, []);

  return (
    <>
      <Card className="m-8 rounded-xl transition-al overflow-auto">
        <table className="table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head, index) => (
                <TableHead key={index} data={head} />
              ))}
            </tr>
          </thead>
          <tbody>
            {order.orders.map((order, index) => {
              return (
                <TableRow
                  key={index}
                  data={order}
                  hiddenColumns={[
                    "createdAt",
                    "updatedAt",
                    "order_address",
                    "order_product",
                  ]}
                />
              );
            })}
          </tbody>
        </table>
      </Card>
    </>
  );
});

export default OrderTable;
