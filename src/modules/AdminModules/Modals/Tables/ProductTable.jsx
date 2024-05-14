import React, { useEffect, useState } from "react";
import { Card, Button } from "@material-tailwind/react";
import TableHead from "../TableVisual/TableHead";
import TableRow from "../TableVisual/TableRow";
import { observer } from "mobx-react";
import { useContext } from "react";
import { Context } from "@/main";
import { fetchProducts, deleteProduct } from "@/API/ProductAPI";
import ProductEditForm from "../EditTable/EditProduct";
import { toJS } from "mobx";

const TABLE_HEAD = [
  "ID",
  "Артикул",
  "Название",
  "Цена",
  "Количество",
  "Доступность",
  "Рейтинг",
  "Атрибуты",
  "Группы атрибутов",
  "Характеристики",
  "Изображения",
  "",
  "",
];

const ProductTable = observer(() => {
  const [products, setProducts] = useState([]);
  const [productEditVisible, setProductEditVisible] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null); // добавлено

  useEffect(() => {
    fetchProducts()
      .then((data) => {
        console.log("Товары", data);
        setProducts(data.rows);
      })
      .catch((error) => {
        console.error("Ошибка при загрузке продуктов:", error);
      });
  }, []);

  const handleDelete = (id) => {
    deleteProduct(id);
  };

  const handleEdit = (product) => {
    setCurrentProduct(product);
    setProductEditVisible(true);
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
            {products &&
              products.map((product, index) => {
                return (
                  <TableRow
                    key={index}
                    data={product} // данные товаров
                    hiddenColumns={[
                      "url_main_image_product",
                      "description_product",
                      "createdAt",
                      "updatedAt",
                      "id_category",
                      "id_collection",
                    ]}
                    handleEdit={() => handleEdit(product)} // изменено
                    handleDelete={() => handleDelete(product.id_product)} // метод удаления
                  />
                );
              })}
          </tbody>
        </table>
      </Card>
      {currentProduct && (
        <ProductEditForm
          selectedProduct={currentProduct}
          show={productEditVisible}
          onHide={() => {
            setProductEditVisible(false);
            setCurrentProduct(null);
          }}
        />
      )}
    </>
  );
});

export default ProductTable;
