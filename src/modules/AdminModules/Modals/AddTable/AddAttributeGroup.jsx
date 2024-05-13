import React, { useState, useEffect, useContext } from "react";
import {
  Button,
  Card,
  CardBody,
  Dialog,
  Input,
  Typography,
} from "@material-tailwind/react";
import { observer } from "mobx-react";
import { Context } from "@/main";

const AttributeGroupAddForm = observer(({ show, onHide }) => {
  const { attribute } = useContext(Context);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [value, setValue] = useState("");
  const [error, setError] = useState(""); // Добавляем состояние для отображения ошибки

  const validateInput = () => {
    if (!value.trim()) {
      setError("Название не может быть пустым");
      return false;
    }
    return true;
  };

  const addAttributeGroup = () => {
    setIsSubmitted(true);
    if (validateInput()) {
      attribute
        .createAttributeGroup({ name_attribute_group: value })
        .then(() => {
          setValue("");
          onHide();
          setIsSubmitted(false);
          setError("");
        });
    }
  };

  return (
    <Dialog
      open={show}
      onClose={() => {
        onHide();
        setError("");
        setIsSubmitted(false);
      }}
    >
      <Card className="p-4 rounded-xl">
        <CardBody>
          <div>
            <Typography variant="h5" className="mb-2">
              Добавить группу атрибутов
            </Typography>
            <Input
              type="text"
              size="lg"
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
                if (isSubmitted) validateInput();
              }}
              label="Название"
              placeholder="Введите название группы"
              required
              error={isSubmitted && error}
            />
          </div>

          <Button color="blue" className="my-2" onClick={addAttributeGroup}>
            Создать
          </Button>
          <Button
            color="red"
            className="my-2"
            variant="outlined"
            onClick={() => {
              onHide();
              setError("");
              setIsSubmitted(false);
            }}
          >
            Отмена
          </Button>
        </CardBody>
      </Card>
    </Dialog>
  );
});

export default AttributeGroupAddForm;
