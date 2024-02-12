// EditProductCard.js
import React from "react";
import { Card, Input, Button } from "@material-tailwind/react";

export default function TableEditCard({
  editProduct,
  setEditProduct,
  handleUpdate,
  inputList,
}) {
  return (
    <Card className="w-1/2 m-8 rounded-xl">
      <h2>Изменить продукт</h2>
      <div className="grid grid-cols-3 gap-4 p-4">
        {inputList.map((input) => ( // вывод полей для редактирования
          <Input
            type={input.type}
            color="lightBlue"
            size="regular"
            outline={true}
            label={input.label}
            value={editProduct[input.value]}
            onChange={(e) => // метод для редактирования
              setEditProduct({
                ...editProduct,
                [input.value]: e.target.value,
              })
            }
          />
        ))}
      </div>
      <div className="flex">
        <Button
          className="w-1/2 m-2"
          color="blue"
          buttonType="filled"
          size="regular"
          ripple="light"
          onClick={() => handleUpdate(editProduct.id_product)} // примнение редатирования
        >
          Сохранить изменения
        </Button>
        <Button
          className="w-1/6 m-2"
          color="red"
          buttonType="filled"
          size="regular"
          ripple="light"
          onClick={() => setEditProduct(null)} // закрытие формы
        >
          Отменить
        </Button>
      </div>
    </Card>
  );
}
