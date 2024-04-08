import React, { useEffect, useState } from "react";
import { Card, Button } from "@material-tailwind/react";
import TableHead from "../TableVisual/TableHead";
import TableRow from "../TableVisual/TableRow";
import { observer } from "mobx-react";
import { useContext } from "react";
import { Context } from "@/main";
import CategoryEditForm from "../EditTable/EditCategory";
import { toJS } from "mobx";
import AttributeGroupEditForm from "../EditTable/EditAttributeGroup";

const TABLE_HEAD = ["ID", "Название", "", ""];

const AttributeGroupTable = observer(() => {
  const { attribute } = useContext(Context);
  const [groupEditVisible, setGroupEditVisible] = useState(false);
  const [currentGroup, setCurrentGroup] = useState(null);

  console.log(toJS(attribute.attributeGroups));

  useEffect(() => {
    attribute
      .fetchAttributeGroups()
      .then(() => {
        console.log(
          "Группы атрибутов после загрузки: ",
          attribute.attributeGroups
        ); // Здесь добавлен console.log
      })
      .catch((error) => {
        console.error("Ошибка при загрузке групп атрибутов:", error);
      });
  }, [attribute]);

  const handleDelete = (id) => {
    attribute.deleteAttributeGroup(id);
  };

  const handleEdit = (category) => {
    setCurrentGroup(category);
    setGroupEditVisible(true);
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
            {attribute.attributeGroups.map((group, index) => {
              return (
                <TableRow
                  key={index}
                  data={group}
                  hiddenColumns={["createdAt", "updatedAt"]}
                  handleEdit={() => handleEdit(group)}
                  handleDelete={() => handleDelete(group.id_attribute_group)} // метод удаления
                />
              );
            })}
          </tbody>
        </table>
      </Card>

      {currentGroup && (
        <AttributeGroupEditForm
          group={currentGroup}
          show={groupEditVisible}
          onHide={() => {
            setGroupEditVisible(false);
            setCurrentGroup(null);
          }}
        />
      )}
    </>
  );
});

export default AttributeGroupTable;
