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

const AttributeAddForm = observer(({ show, onHide }) => {
  const { attribute } = useContext(Context);
  const [value, setValue] = useState("");

  useEffect(() => {
    fetchAttributeGroups().then((data) => attribute.setAttributeGroups(data));
  }, []);

  const addAttribute = () => {
    if (
      !attribute.selectedAttributeGroup ||
      !attribute.selectedAttributeGroup.id_attribute_group
    )
      return;

    const formData = new FormData();
    formData.append("name_attribute", value);
    formData.append(
      "id_attribute_group",
      attribute.selectedAttributeGroup.id_attribute_group
    );

    attribute.createAttribute(formData).then(() => {
      fetchAttributes().then((data) => {
        attribute.setAttributes(data);
      });
      onHide();
    });
  };

  return (
    <Dialog
      open={show}
      onClose={onHide}
      animate={{
        mount: { scale: 1, y: 0 },
        unmount: { scale: 0.9, y: -100 },
      }}
    >
      <Card className="p-4 rounded-xl">
        <CardBody>
          <div>
            <Typography variant="h5" className="mb-2">
              Добавить атрибут
            </Typography>
            <Input
              type="text"
              size="lg"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Введите название атрибута"
            />
          </div>
          <Select color="blue" label="Категория">
            {attribute.attributeGroups.map((group) => (
              <Option
                onClick={() => attribute.setSelectedAttributeGroup(group)}
                key={group.id_attribute_group}
              >
                {group.name_attribute_group}
              </Option>
            ))}
          </Select>
          <Button color="blue" className="my-2" onClick={addAttribute}>
            Создать
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

export default AttributeAddForm;
