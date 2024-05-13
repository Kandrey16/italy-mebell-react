import React, { useEffect, useState } from "react";
import { observer } from "mobx-react";
import { useContext } from "react";
import { Context } from "@/main";
import { fetchOrders } from "@/API/OrderAPI";

import OrderCard from "@/pages/ProfilePage/Items/OrderCard";

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
    <div className="container mt-6">
      {order.orders.length > 0 ? (
        order.orders.map((order) => <OrderCard key={order.id_order} data={order} isAdmin={true} />)
      ) : (
        <p className="text-gray-500">У вас нет активных заказов.</p>
      )}
    </div>
  );
});

export default OrderTable;
