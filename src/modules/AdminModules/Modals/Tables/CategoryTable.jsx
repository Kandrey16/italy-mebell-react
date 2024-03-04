import React, { useEffect, useState } from "react";
import { Card, Button } from "@material-tailwind/react";
import TableHead from "../TableVisual/TableHead";
import TableRow from "../TableVisual/TableRow";
import { observer } from "mobx-react";
import { useContext } from "react";
import { Context } from "@/main";
import CategoryEditForm from "../EditCategory";

const TABLE_HEAD = [
  "ID",
  "Название",
  "Дата создания",
  "Дата изменения",
  "",
  "",
];

const CategoryTable = observer(() => {
  const { product } = useContext(Context);
  const [categoryEditVisible, setCategoryEditVisible] = useState(false);

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
            {product.categories.map((product, index) => {
              return (
                <TableRow
                  key={index}
                  product={product} // данные товаров
                  // handleEdit={handleEdit}
                  // handleDelete={handleDelete} // метод удаления
                />
              );
            })}
          </tbody>
        </table>
      </Card>

      <CategoryEditForm show={categoryEditVisible} onHide={() => setCategoryEditVisible(false)}/>
    </>
  );
});

export default CategoryTable;
