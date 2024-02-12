// EditableRow.js
import React from "react";
import TableCell from "../TableVisual/TableCell";
import { Input } from "@material-tailwind/react";
import SaveIcon from "@/assets/save.svg";
import CancelIcon from "@/assets/cancel.svg";

export default function TableEdiTableRow({
  newProduct,
  setNewProduct,
  handlePost,
  handleCancel,
}) {

  // Список полей для редатирования
  const fields = [
    { placeholder: "Артикул", key: "article_product" },
    { placeholder: "Название", key: "name_product" },
    { placeholder: "Описание", key: "description_product" },
    { placeholder: "Цена", key: "price_product" },
    { placeholder: "Количество", key: "count_product" },
  ];

  return (
    <tr>
      {fields.map(({ placeholder, key }) => ( //Вывод полей для редактирования
        <TableCell // Ячейка строки
          key={key}
          data={
            <Input
              variant="static"
              color="blue"
              placeholder={placeholder}
              value={newProduct[key]}
              onChange={(e) =>
                setNewProduct({ ...newProduct, [key]: e.target.value })
              }
            />
          }
        />
      ))}
      {/* Сохранение  данных*/}
      <td>
        <button className="relative" onClick={handlePost}> 
          <img className="size-auto" src={SaveIcon} /> 
        </button>
      </td>
      {/* Выод из режима добавления */}
      <td>
        <button className="relative" onClick={handleCancel}>
          <img className="size-auto" src={CancelIcon} />
        </button>
      </td>
    </tr>
  );
}
