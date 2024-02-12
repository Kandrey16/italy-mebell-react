// ProductList.js
import React, { useEffect, useState } from "react";
import { Card, Button } from "@material-tailwind/react";
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "@/API/requests.js";
import TableHead from "./TableVisual/TableHead";
import TableRow from "./TableVisual/TableRow";
import TableEditRow from "./TableFunction/TableEditRow";
import TableEditCard from "./TableFunction/TableEditCard";
import PlusIcon from "@/assets/plus.svg";

// Заголовки страницы
const TABLE_HEAD = [
  "ID",
  "Артикул",
  "Название",
  "Описание",
  "Цена",
  "Количество",
  "Доступность",
  "Дата создания",
  "Дата изменения",
  "",
  "",
];

// Список полей для ввода для редактирования данных
const INPUT_LIST = [
  { type: "text", label: "Артикул", value: "article_product" },
  { type: "text", label: "Название", value: "name_product" },
  { type: "text", label: "Описание", value: "description_product" },
  { type: "number", label: "Цена", value: "price_product" },
  { type: "number", label: "Количество", value: "count_product" },
];

//MADE: вывод данных, добавление, изменение, удаление
//TODO: Поиск, пагинация, сортировка
// Изменение данных через измнение ячейки
// Автоматизация таблицы

// Комопонент Таблицы
export default function ProductTable() {
  // Инициализация состояний
  const [product, setProduct] = useState([]); // Список продуктов
  const [newProduct, setNewProduct] = useState({}); // Новый продукт для добавления
  const [editProduct, setEditProduct] = useState(null); // Продукт для редактирования
  const [isActiveRow, setIsActiveRow] = useState(false); // Состояние активной строки для редактировани

  // Загрузка продуктов при монтировании компонента
  useEffect(() => {
    fetchProducts();
  }, []);

  // Вывод данных товара
  const fetchProducts = () => {
    getProducts().then((response) => {
      // Сортировка товаров после изменений
      const sortedProducts = response.data.sort(
        (a, b) => a.id_product - b.id_product
      );
      setProduct(sortedProducts);
    });
  };

  // Добавление нового товара
  const handlePost = () => {
    createProduct(newProduct).then((response) => {
      const createdProduct = response.data;
      setProduct([...product, createdProduct]);
      setNewProduct({});
    });
  };

  // Изменение товара
  const handleUpdate = (id_product) => {
    updateProduct(id_product, editProduct).then(() => {
      fetchProducts();
      setEditProduct(null);
    });
  };

  // Удаление товара
  const handleDelete = (id_product) => {
    deleteProduct(id_product).then(() => {
      fetchProducts();
    });
  };

  return (
    <>
      {/* Тело товара */}
      <Card className="m-8 rounded-xl transition-al overflow-auto">
        <table className="table-auto text-left">
          {/* Вывод заголовков таблицы */}
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <TableHead data={head} />
              ))}
            </tr>
          </thead>
          <tbody>
            {product.map((product) => {
              // Вывод данных таблицы
              return (
                // Вывод строк таблицы
                <TableRow
                  product={product} // данные товаров
                  setEditProduct={setEditProduct} // метод изменения
                  handleDelete={handleDelete} // метод удаления
                />
              );
            })}
            {isActiveRow && ( // Появление строки для добавления данных
              <TableEditRow
                newProduct={newProduct} // данные нового товара
                setNewProduct={setNewProduct} // метод добавления
                handlePost={() => {
                  //применение метода добавления
                  handlePost();
                }}
                handleCancel={() => setIsActiveRow(false)} // закрытие столбца добавления
              />
            )}
          </tbody>
        </table>
        {!isActiveRow && ( // отображение кнопки "Добавить товар"
          <div className="p-4">
            <Button
              className="flex items-center gap-3"
              onClick={() => setIsActiveRow(true)}
            >
              <img className="size-auto" src={PlusIcon} />
              Добавить товар
            </Button>
          </div>
        )}
      </Card>

      {editProduct && ( // Появление формы для редактирования
        <TableEditCard // компонент редактирования
          editProduct={editProduct}
          setEditProduct={setEditProduct}
          handleUpdate={handleUpdate}
          inputList={INPUT_LIST}
        />
      )}
    </>
  );
}
