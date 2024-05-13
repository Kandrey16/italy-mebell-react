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
import CollectionEditForm from "../EditTable/EditCollection";

const TABLE_HEAD = ["ID", "Название", "", ""];

const CollectionTable = observer(() => {
  const { product } = useContext(Context);
  const [collectionEditVisible, setCollectionEditVisible] = useState(false);
  const [currentCollection, setCurrentCollection] = useState(null);

  console.log(toJS(product.categories));

  useEffect(() => {
    product
      .fetchCollections()
      .catch((error) => {
        console.error("Ошибка при загрузке коллекций:", error);
      });
  }, [product]);


  const handleDelete = (id) => {
    product.deleteCollection(id);
  };

  const handleEdit = (collection) => {
    setCurrentCollection(collection);
    setCollectionEditVisible(true);
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
            {product.collections.map((collection, index) => {
              return (
                <TableRow
                  key={index}
                  data={collection} // данные товаров
                  hiddenColumns={["createdAt", "updatedAt"]}
                  handleEdit={() => handleEdit(collection)}
                  handleDelete={() => handleDelete(collection.id_collection)} // метод удаления
                />
              );
            })}
          </tbody>
        </table>
      </Card>

      {currentCollection && (
        <CollectionEditForm
          collection={currentCollection}
          show={collectionEditVisible}
          onHide={() => {
            setCollectionEditVisible(false);
            setCurrentCollection(null);
          }}
        />
      )}
    </>
  );
});

export default CollectionTable;
