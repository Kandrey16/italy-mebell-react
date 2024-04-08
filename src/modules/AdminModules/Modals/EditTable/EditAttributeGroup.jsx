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

const AttributeGroupEditForm = observer(({ show, onHide, group }) => {
  const { attribute } = useContext(Context);
  const [value, setValue] = useState("");

  useEffect(() => {
    if (group) {
      setValue(group.name_attribute_group);
    }
  }, [group]);

  const editAttributeGroup = () => {
    if (group && group.id_attribute_group) {
      attribute
        .editAttributeGroup(group.id_attribute_group, {
          name_attribute_group: value,
        })
        .then(() => {
          onHide();
        });
    }
  };

  return (
    <Dialog
      open={show}
      animate={{
        mount: { scale: 1, y: 0 },
        unmount: { scale: 0.9, y: -100 },
      }}
    >
      <Card className="p-4 rounded-xl">
        <CardBody>
          <div>
            <Typography variant="h5" className="mb-2">
              Изменить группу атрибутов
            </Typography>
            <Input
              type="text"
              size="lg"
              lavel="Название"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Введите новое название группы"
            />
          </div>

          <Button color="blue" className="my-2" onClick={editAttributeGroup}>
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

export default AttributeGroupEditForm;
