import React, { useEffect, useState } from "react";
import { Card, Button } from "@material-tailwind/react";
import TableHead from "../TableVisual/TableHead";
import TableRow from "../TableVisual/TableRow";
import { observer } from "mobx-react";
import { useContext } from "react";
import { Context } from "@/main";
import ProductEditForm from "../EditProduct";

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

const ProductTable = observer(() => {
  const { product } = useContext(Context);
  const [productEditVisible, setProductEditVisible] = useState(false);

  const [currentProduct, setCurrentProduct] = useState(null); // добавлено

  const handleDelete = (id) => {
    product.deleteProduct(id);
  };

  const handleEdit = (product) => {
    // изменено
    setCurrentProduct(product); // добавлено
    setProductEditVisible(true); // изменено
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
            {product.products.map((product, index) => {
              return (
                <TableRow
                  key={index}
                  product={product} // данные товаров
                  handleEdit={() => handleEdit(product)} // изменено
                  handleDelete={() => handleDelete(product.id_product)} // метод удаления
                />
              );
            })}
          </tbody>
        </table>
      </Card>
      
      {currentProduct && ( // добавлено
        <ProductEditForm
          product={currentProduct} // изменено
          show={productEditVisible}
          onHide={() => {
            setProductEditVisible(false);
            setCurrentProduct(null); // добавлено
          }}
        />
      )}
    </>
  );
});

export default ProductTable;
