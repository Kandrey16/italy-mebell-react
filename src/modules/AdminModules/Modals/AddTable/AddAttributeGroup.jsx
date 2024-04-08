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
  const [value, setValue] = useState("");

  const addAttributeGroup = () => {
    attribute.createAttributeGroup({ name_attribute_group: value }).then(() => {
      setValue(""); 
      onHide(); 
    });
  };

  return (
    <Dialog open={show} onClose={onHide}>
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
              onChange={(e) => setValue(e.target.value)}
              placeholder="Введите название группы"
            />
          </div>

          <Button color="blue" className="my-2" onClick={addAttributeGroup}>
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

export default AttributeGroupAddForm;
