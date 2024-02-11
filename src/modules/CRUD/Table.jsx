// ProductList.js
import React, { useEffect, useState } from "react";
import { Card, Input, Button } from "@material-tailwind/react";
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "@/API/requests.js";
import TableHead from "./TableHead";
import TableRow from "./TableRow";
import TableEditRow from "./TableEditRow";
import PlusIcon from "@/assets/plus.svg";

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

export default function ProductList() {
  const [product, setProduct] = useState([]);
  const [newProduct, setNewProduct] = useState({});
  const [editProduct, setEditProduct] = useState(null);
  const [isActiveRow, setIsActiveRow] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    getProducts().then((response) => {
      const sortedProducts = response.data.sort(
        (a, b) => a.id_product - b.id_product
      );
      setProduct(sortedProducts);
    });
  };

  const handlePost = () => {
    createProduct(newProduct).then((response) => {
      const createdProduct = response.data;
      setProduct([...product, createdProduct]);
      setNewProduct({});
    });
  };

  const handleUpdate = (id_product) => {
    updateProduct(id_product, editProduct).then(() => {
      fetchProducts();
      setEditProduct(null);
    });
  };

  const handleDelete = (id_product) => {
    deleteProduct(id_product).then(() => {
      fetchProducts();
    });
  };

  //TODO: сделай так, чтобы при отображении TableEdittableRow
  return (
    <>
      <Card className="m-8 rounded-xl transition-all duration-500 ease-in-out">
        <table className="w-full table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <TableHead data={head} />
              ))}
            </tr>
          </thead>
          <tbody>
            {product.map((product) => {
              return (
                <TableRow
                  product={product}
                  handleDelete={handleDelete}
                  setEditProduct={setEditProduct}
                />
              );
            })}
            {isActiveRow && (
              <TableEditRow
                newProduct={newProduct}
                setNewProduct={setNewProduct}
                handlePost={() => {
                  handlePost();
                }}
                handleCancel={() => setIsActiveRow(false)}
              />
            )}
          </tbody>
        </table>
        {!isActiveRow && (
          <div className="flex items-center gap-4 p-4">
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

      {editProduct && (
        <div>
          <h2>Изменить продукт</h2>
          <input
            type="text"
            placeholder="Артикул"
            value={editProduct.article_product}
            onChange={(e) =>
              setEditProduct({
                ...editProduct,
                article_product: e.target.value,
              })
            }
          />
          <input
            type="text"
            placeholder="Название"
            value={editProduct.name_product}
            onChange={(e) =>
              setEditProduct({ ...editProduct, name_product: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Описание"
            value={editProduct.description_product}
            onChange={(e) =>
              setEditProduct({
                ...editProduct,
                description_product: e.target.value,
              })
            }
          />
          <input
            type="number"
            placeholder="Цена"
            value={editProduct.price_product}
            onChange={(e) =>
              setEditProduct({ ...editProduct, price_product: e.target.value })
            }
          />
          <input
            type="number"
            placeholder="Кол-во"
            value={editProduct.count_product}
            onChange={(e) =>
              setEditProduct({ ...editProduct, count_product: e.target.value })
            }
          />
          <button onClick={() => handleUpdate(editProduct.id_product)}>
            Сохранить изменения
          </button>
        </div>
      )}
    </>
  );
}
