import React, { useEffect, useState } from "react";
import { Card } from "@material-tailwind/react";
import TableHead from "../TableVisual/TableHead";
import TableRow from "../TableVisual/TableRow";
import { observer } from "mobx-react";
import { useContext } from "react";
import { Context } from "@/main";
import { toJS } from "mobx";
import AttributeEditForm from "../EditTable/EditAttribute";

// Заголовки таблицы
const ATTRIBUTE_TABLE_HEAD = ["ID", "Название", "Группа атрибутов", "", ""];

const AttributeTable = observer(() => {
  const { attribute } = useContext(Context);
  const [editVisible, setEditVisible] = useState(false);
  const [currentAttribute, setCurrentAttribute] = useState(null);

  useEffect(() => {
    attribute
      .fetchAttributes()
      .then(() => {
        console.log("Атрибуты после загрузки:", toJS(attribute.attributes));
      })
      .catch((error) => {
        console.error("Ошибка при загрузке атрибутов:", error);
      });
  }, [attribute]);

  const handleDelete = (id) => {
    attribute.deleteAttribute(id);
  };

  const handleEdit = (attributeItem) => {
    setCurrentAttribute(attributeItem);
    setEditVisible(true);
  };

  return (
    <>
      <Card className="m-8 rounded-xl transition-all overflow-auto">
        <table className="table-auto text-left">
          <thead>
            <tr>
              {ATTRIBUTE_TABLE_HEAD.map((head, index) => (
                <TableHead key={index} data={head} />
              ))}
            </tr>
          </thead>
          <tbody>
            {attribute.attributes.map((attr, index) => {
              return (
                <TableRow
                  key={index}
                  data={attr}
                  hiddenColumns={["createdAt", "updatedAt"]}
                  handleEdit={() => handleEdit(attr)}
                  handleDelete={() => handleDelete(attr.id_attribute)}
                />
              );
            })}
          </tbody>
        </table>
      </Card>

      {currentAttribute && (
        <AttributeEditForm
          selectedAttribute={currentAttribute}
          show={editVisible}
          onHide={() => {
            setEditVisible(false);
            setCurrentAttribute(null);
          }}
        />
      )}
    </>
  );
});

export default AttributeTable;
