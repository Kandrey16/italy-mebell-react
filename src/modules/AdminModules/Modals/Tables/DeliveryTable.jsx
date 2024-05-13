import React, { useEffect, useState } from "react";
import { Card, Button } from "@material-tailwind/react";
import TableHead from "../TableVisual/TableHead";
import TableRow from "../TableVisual/TableRow";
import { observer } from "mobx-react";
import { useContext } from "react";
import { Context } from "@/main";
import CategoryEditForm from "../EditTable/EditCategory";
import { fetchCategories, deleteCategory } from "@/API/ProductAPI";
import { toJS } from "mobx";
import CollectionEditForm from "../EditTable/EditCollection";
import DeliveryEditForm from "../EditTable/EditDelivery";

const TABLE_HEAD = ["ID", "Название", "Стоимость", "", ""];

const DeliveryTable = observer(() => {
  const { order } = useContext(Context);
  const [deliveryEditVisible, setDeliveryEditVisible] = useState(false);
  const [currentDelivery, setCurrentDelivery] = useState(null);

  console.log(toJS(order.order_delivery));

  useEffect(() => {
    order
      .fetchOrderDeliveries()
      .catch((error) => {
        console.error("Ошибка при загрузке доставки:", error);
      });
  }, [order]);


  const handleDelete = (id) => {
    order.deleteOrderDelivery(id);
  };

  const handleEdit = (delivery) => {
    setCurrentDelivery(delivery);
    setDeliveryEditVisible(true);
  };

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
            {order.order_delivery.map((delivery, index) => {
              return (
                <TableRow
                  key={index}
                  data={delivery} // данные товаров
                  hiddenColumns={["createdAt", "updatedAt"]}
                  handleEdit={() => handleEdit(delivery)}
                  handleDelete={() => handleDelete(delivery.id_order_delivery)} // метод удаления
                />
              );
            })}
          </tbody>
        </table>
      </Card>

      {currentDelivery && (
        <DeliveryEditForm
          delivery={currentDelivery}
          show={deliveryEditVisible}
          onHide={() => {
            setDeliveryEditVisible(false);
            setCurrentDelivery(null);
          }}
        />
      )}
    </>
  );
});

export default DeliveryTable;
