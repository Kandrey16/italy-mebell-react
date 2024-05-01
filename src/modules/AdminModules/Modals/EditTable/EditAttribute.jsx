import React, { useState, useEffect, useContext } from "react";
import {
  Button,
  Card,
  CardBody,
  Dialog,
  Input,
  Option,
  Select,
  Typography,
} from "@material-tailwind/react";
import { observer } from "mobx-react";
import { Context } from "@/main";
import { fetchAttributeGroups } from "@/API/AttributeAPI";
import { fetchAttributes } from "@/API/ProductAPI";

const AttributeEditForm = observer(({ show, onHide, selectedAttribute }) => {
  const { attribute } = useContext(Context);
  const [value, setValue] = useState("");
  const [selectedGroupId, setSelectedGroupId] = useState("");

  useEffect(() => {
    fetchAttributeGroups().then((data) => {
      attribute.setAttributeGroups(data);
      if (selectedAttribute) {
        setValue(selectedAttribute.name_attribute);
        setSelectedGroupId(selectedAttribute.id_attribute_group);
        attribute.setSelectedAttributeGroup(selectedAttribute.attributeGroup);
      }
    });
  }, [selectedAttribute, attribute]);

  console.log(selectedGroupId);

  const editAttribute = () => {
    if (!selectedGroupId || !value) return;

    const formData = new FormData();
    formData.append("name_attribute", value);
    formData.append("id_attribute_group", selectedGroupId);

    for (const entry of formData.entries()) {
      console.log(entry);
    }

    attribute
      .editAttribute(selectedAttribute.id_attribute, formData)
      .then(() => {
        onHide();
      })
      .catch((error) => {
        console.error("Ошибка при изменении атрибута:", error);
      });
  };

  return (
    <Dialog open={show} onClose={onHide}>
      <Card className="p-4 rounded-xl">
        <CardBody>
          <div className="my-2">
            <Typography variant="h5" className="mb-2">
              Редактировать атрибут
            </Typography>
            <Input
              type="text"
              size="lg"
              lavel="Название"
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
              }}
              placeholder="Введите новое название атрибута"
            />
          </div>
          <Select
            color="blue"
            label="Группа атрибутов"
            value={selectedGroupId}
            onChange={(value) => {
              setSelectedGroupId(value);
            }}
          >
            {attribute.attributeGroups.map((group) => (
              <Option
                key={group.id_attribute_group}
                value={group.id_attribute_group}
              >
                {group.name_attribute_group}
              </Option>
            ))}
          </Select>
          <Button color="blue" className="my-2" onClick={editAttribute}>
            Сохранить изменения
          </Button>
          <Button
            color="red"
            className="my-2"
            variant="outlined"
            onClick={onHide}
          >
            Отмена
          </Button>
        </CardBody>
      </Card>
    </Dialog>
  );
});

export default AttributeEditForm;
