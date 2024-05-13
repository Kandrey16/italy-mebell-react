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
  const [errors, setErrors] = useState({ name: "", group: "" });

  useEffect(() => {
    fetchAttributeGroups().then((data) => attribute.setAttributeGroups(data));
  }, []);

  const validate = () => {
    let hasError = false;
    let errorMessages = { name: "", group: "" };

    if (!value.trim()) {
      errorMessages.name = "Необходимо ввести название атрибута.";
      hasError = true;
    }

    if (
      !attribute.selectedAttributeGroup ||
      !attribute.selectedAttributeGroup.id_attribute_group
    ) {
      errorMessages.group = "Выберите группу атрибутов.";
      hasError = true;
    }

    setErrors(errorMessages);
    return !hasError;
  };

  const addAttribute = () => {
    if (!validate()) return;

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

  const handleClose = () => {
    setErrors({ name: "", group: "" }); // сброс ошибок
    setValue(""); // (необязательно) сброс значения, если требуется
    onHide(); // закрытие модального окна
  };

  return (
    <Dialog
      open={show}
      onClose={handleClose}
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
              required
              label="Название"
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
                setErrors({
                  ...errors,
                  name: e.target.value.trim() ? "" : errors.name,
                });
              }}
              placeholder="Введите название атрибута"
              error={errors.name}
            />
            {errors.name && (
              <Typography color="red" className="mt-2">
                {errors.name}
              </Typography>
            )}
          </div>
          <Select color="blue" label="Категория">
            {attribute.attributeGroups.map((group) => (
              <Option
                onClick={() => attribute.setSelectedAttributeGroup(group)}
                onChange={(group) => {
                  setErrors({ ...errors, group: group ? "" : errors.group });
                }}
                key={group.id_attribute_group}
              >
                {group.name_attribute_group}
              </Option>
            ))}
          </Select>
          {errors.group && (
            <Typography color="red" className="mt-2">
              {errors.group}
            </Typography>
          )}
          <Button color="blue" className="my-2" onClick={addAttribute}>
            Создать
          </Button>
          <Button
            color="red"
            className="my-2"
            variant="outlined"
            onClick={handleClose}
          >
            Отмена
          </Button>
        </CardBody>
      </Card>
    </Dialog>
  );
});

export default AttributeAddForm;
