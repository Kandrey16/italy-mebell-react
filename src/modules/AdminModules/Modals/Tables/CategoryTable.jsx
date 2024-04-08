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

const TABLE_HEAD = ["ID", "Название", "", ""];

const CategoryTable = observer(() => {
  const { product } = useContext(Context);
  const [categoryEditVisible, setCategoryEditVisible] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(null);

  console.log(toJS(currentCategory));

  const handleDelete = (id) => {
    product.deleteCategory(id);
  };

  const handleEdit = (category) => {
    setCurrentCategory(category);
    setCategoryEditVisible(true);
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
            {product.categories.map((category, index) => {
              return (
                <TableRow
                  key={index}
                  data={category} // данные товаров
                  hiddenColumns={["createdAt", "updatedAt"]}
                  handleEdit={() => handleEdit(category)}
                  handleDelete={() => handleDelete(category.id_category)} // метод удаления
                />
              );
            })}
          </tbody>
        </table>
      </Card>

      {currentCategory && (
        <CategoryEditForm
          category={currentCategory}
          show={categoryEditVisible}
          onHide={() => {
            setCategoryEditVisible(false);
            setCurrentCategory(null);
          }}
        />
      )}
    </>
  );
});

export default CategoryTable;
