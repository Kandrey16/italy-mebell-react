// ProductList.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, Button } from "@material-tailwind/react";
import TableHead from "./TableVisual/TableHead";
import TableRow from "./TableVisual/TableRow";
import PlusIcon from "@/assets/plus.svg";
import {
  createProduct,
  editProduct as updateProduct,
  deleteProduct,
  fetchProducts,
} from "@/redux/actions/productActions";
import { REQUEST_PRODUCTS } from "@/redux/type/productTypes";
import ProductAddForm from "../../../notUsedModules/ProductAddForm";
import ProductEditForm from "../../../notUsedModules/ProductEditForm";

// Заголовки страницы
const TABLE_HEAD = [
  "ID",
  "Артикул",
  "Название",
  "Цена",
  "Изображение",
  "Описание",
  "Количество",
  "Доступность",
  "Дата создания",
  "Дата изменения",
  "Категория",
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
  const dispatch = useDispatch();
  const product = useSelector((state) => state.products.products);

  // const [product, setProduct] = useState([]); // Список продуктов
  const [editProduct, setEditProduct] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [isActiveRow, setIsActiveRow] = useState(false); // Состояние активной строки для редактирования

  useEffect(() => {
    dispatch({ type: REQUEST_PRODUCTS });
  }, [dispatch]);

  const handleEdit = (product) => {
    setEditProduct(product);
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditProduct(null);
  };

  const handleUpdateProduct = (editedProduct) => {
    dispatch(updateProduct(editedProduct));
    setIsEditing(false);
    setEditProduct(null);
  };

  const handleDelete = (id) => {
    dispatch(deleteProduct(id)).then(() => {
      dispatch({ type: REQUEST_PRODUCTS });
    });
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
            {product.map((product, index) => {
              return (
                <TableRow
                  key={index}
                  product={product} // данные товаров
                  handleEdit={handleEdit}
                  handleDelete={handleDelete} // метод удаления
                />
              );
            })}
            {/* {isActiveRow && ( // Появление строки для добавления данных
              <TableEditRow
                handleCancel={() => setIsActiveRow(false)} // закрытие столбца добавления
              />
            )} */}
          </tbody>
        </table>
      </Card>
      <div>
        <Button color="blue" onClick={() => setIsActiveRow(true)}>
          Добавить товар
        </Button>
        {isActiveRow && <ProductAddForm />}
        {isEditing && (
          <ProductEditForm
            product={editProduct}
            onCancel={handleCancelEdit}
            onSave={handleUpdateProduct}
          />
        )}
      </div>
    </>
  );
}

// ProductList.js
// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Card, Button } from "@material-tailwind/react";
// import TableHead from "./TableVisual/TableHead";
// import TableRow from "./TableVisual/TableRow";
// import PlusIcon from "@/assets/plus.svg";
// import {
//   createProduct,
//   editProduct as updateProduct,
//   deleteProduct,
//   fetchProducts,
// } from "@/redux/actions/productActions";
// import { REQUEST_PRODUCTS } from "@/redux/type/productTypes";
// import ProductAddForm from "./TableFunction/ProductAddForm";
// import ProductEditForm from "./TableFunction/ProductEditForm";

// // Заголовки страницы
// const TABLE_HEAD = [
//   "ID",
//   "Артикул",
//   "Название",
//   "Описание",
//   "Цена",
//   "Количество",
//   "Доступность",
//   "Дата создания",
//   "Дата изменения",
//   "",
//   "",
// ];

// // Список полей для ввода для редактирования данных
// const INPUT_LIST = [
//   { type: "text", label: "Артикул", value: "article_product" },
//   { type: "text", label: "Название", value: "name_product" },
//   { type: "text", label: "Описание", value: "description_product" },
//   { type: "number", label: "Цена", value: "price_product" },
//   { type: "number", label: "Количество", value: "count_product" },
// ];

// //MADE: вывод данных, добавление, изменение, удаление
// //TODO: Поиск, пагинация, сортировка
// // Изменение данных через измнение ячейки
// // Автоматизация таблицы

// // Комопонент Таблицы
// export default function ProductTable() {
//   const dispatch = useDispatch();
//   const product = useSelector((state) => state.products.products);

//   // const [product, setProduct] = useState([]); // Список продуктов
//   const [editProduct, setEditProduct] = useState("");
//   const [isEditing, setIsEditing] = useState(false);
//   const [isActiveRow, setIsActiveRow] = useState(false); // Состояние активной строки для редактирования

//   useEffect(() => {
//     dispatch({ type: REQUEST_PRODUCTS });
//   }, [dispatch]);

//   const handleEdit = (product) => {
//     setEditProduct(product);
//     setIsEditing(true);
//   };

//   const handleCancelEdit = () => {
//     setIsEditing(false);
//     setEditProduct(null);
//   };

//   const handleUpdateProduct = (editedProduct) => {
//     dispatch(updateProduct(editedProduct));
//     setIsEditing(false);
//     setEditProduct(null);
//   };

//   const handleDelete = (id) => {
//     dispatch(deleteProduct(id)).then(() => {
//       dispatch({ type: REQUEST_PRODUCTS });
//     });
//   };

//   return (
//     <>
//       <Card className="m-8 rounded-xl transition-al overflow-auto">
//         <table className="table-auto text-left">
//           <thead>
//             <tr>
//               {TABLE_HEAD.map((head, index) => (
//                 <TableHead key={index} data={head} />
//               ))}
//             </tr>
//           </thead>
//           <tbody>
//             {product.map((product, index) => {
//               return (
//                 <TableRow
//                   key={index}
//                   product={product} // данные товаров
//                   handleEdit={handleEdit}
//                   handleDelete={handleDelete} // метод удаления
//                 />
//               );
//             })}
//             {/* {isActiveRow && ( // Появление строки для добавления данных
//               <TableEditRow
//                 handleCancel={() => setIsActiveRow(false)} // закрытие столбца добавления
//               />
//             )} */}
//           </tbody>
//         </table>
//       </Card>
//       <div>
//         <Button color="blue" onClick={() => setIsActiveRow(true)}>
//           Добавить товар
//         </Button>
//         {isActiveRow && <ProductAddForm />}
//         {isEditing && (
//           <ProductEditForm
//             product={editProduct}
//             onCancel={handleCancelEdit}
//             onSave={handleUpdateProduct}
//           />
//         )}
//       </div>
//     </>
//   );
// }
