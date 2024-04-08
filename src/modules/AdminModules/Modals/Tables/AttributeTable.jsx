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

// function mapDataForTable(data, exclude = [], transform = {}) {
//   let mappedData = {};

//   Object.keys(data).forEach((key) => {
//     if (exclude.includes(key)) {
//       return;
//     }
//     if (key in transform) {
//       mappedData[key] = transform[key](data[key]);
//     } else {
//       mappedData[key] = data[key];
//     }
//   });

//   return mappedData;
// }

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

  // Методы редактирования и удаления
  const handleDelete = (id) => {
    attribute.deleteAttribute(id);
  };

  const handleEdit = (attributeItem) => {
    setCurrentAttribute(attributeItem);
    setEditVisible(true);
  };

  //   function getGroupNameById(groupId) {
  //     console.log("Вызов getGroupNameById с groupId:", groupId); // Должно отобразиться перед возвращением значения
  //     const group = attribute.attributeGroups.find(
  //       (g) => g.id_attribute_group === groupId
  //     );
  //     console.log(group);
  //     return group ? group.name_attribute_group : "Неизвестная группа";
  //   }

  //   const transformRules = {
  //     id_attribute_group: getGroupNameById, // Используем функцию без вызова
  //   };

  //   console.log("transformRules", transformRules); // Для проверки содержания transformRules

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
              //   console.log("Обрабатываем:", attr); // Для проверки входящего объекта
              //   let rowData = mapDataForTable(
              //     attr,
              //     [],
              //     transformRules
              //   );
              //   console.log("После mapDataForTable:", rowData); // Для проверки результата работы mapDataForTable
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

      {/* Тут может быть ваша форма редактирования атрибутов
      {currentAttribute && editVisible && (
        // Тут должен быть ваш компонент формы редактирования
      )} */}
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
