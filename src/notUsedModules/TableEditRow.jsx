// EditableRow.js
import React from "react";
import { useState } from "react";
import TableCell from "../modules/AdminModules/Table/TableVisual/TableCell";
import { Input } from "@material-tailwind/react";
import SaveIcon from "@/assets/save.svg";
import CancelIcon from "@/assets/cancel.svg";
import { useDispatch, useSelector } from "react-redux";
import { createProduct } from "@/redux/actions/productActions";

export default function TableEditRow() {
  const dispatch = useDispatch();
  const [productToAdd, setProductToAdd] = useState({}); // Новое локальное состояние
  const newProduct = useSelector((state) => state.products.products);

  const handlePost = () => {
    dispatch(createProduct(productToAdd));
    setProductToAdd({});
  };

  const handleChange = (key, value) => {
    setProductToAdd({ ...productToAdd, [key]: value });
  };

  const fields = [
    { placeholder: "Артикул", key: "article_product" },
    { placeholder: "Название", key: "name_product" },
    { placeholder: "Описание", key: "description_product" },
    { placeholder: "Цена", key: "price_product" },
    { placeholder: "Количество", key: "count_product" },
  ];

  return (
    <tr>
      {fields.map(
        (
          { placeholder, key } //Вывод полей для редактирования
        ) => (
          <TableCell // Ячейка строки
            key={key}
            data={
              <Input
                variant="static"
                color="blue"
                placeholder={placeholder}
                value={newProduct[key]}
                onChange={(e) => handleChange(key, e.target.value)}
              />
            }
          />
        )
      )}
      {/* Сохранение  данных*/}
      <td>
        <button className="relative" onClick={handlePost}>
          <img className="size-auto" src={SaveIcon} />
        </button>
      </td>
      {/* Выод из режима добавления */}
      <td>
        <button className="relative">
          <img className="size-auto" src={CancelIcon} />
        </button>
      </td>
    </tr>
  );
}
