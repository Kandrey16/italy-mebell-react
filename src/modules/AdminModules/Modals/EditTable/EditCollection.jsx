import React, { useState, useEffect, useContext } from "react";
import {
  Button,
  Card,
  CardBody,
  Dialog,
  Input,
  Typography,
} from "@material-tailwind/react";
import { editCategory } from "@/API/ProductAPI";
import { Context } from "@/main";
import { observer } from "mobx-react";

const CollectionEditForm = observer(({ show, onHide, collection }) => {
  const { product } = useContext(Context);
  const [value, setValue] = useState(collection.name_collection);

  useEffect(() => {
    if (collection) {
      setValue(collection.name_collection);
    }
  }, [collection]);

  const editCollection = () => {
    if (collection && collection.id_collection) {
      product
        .editCollection(collection.id_collection, {
          name_collection: value,
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
          <form>
            <div>
              <Typography variant="h5" className="mb-2">
                Изменить коллекцию
              </Typography>
              <Input
                type="text"
                size="lg"
                lavel="Название"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Введите новое название коллекции"
              />
            </div>
            <Button
              className="my-2"
              color="blue"
              size="md"
              onClick={editCollection}
            >
              Обновить
            </Button>
            <Button
              className="my-2"
              variant="outlined"
              color="red"
              size="md"
              onClick={onHide}
            >
              Отмена
            </Button>
          </form>
        </CardBody>
      </Card>
    </Dialog>
  );
});

export default CollectionEditForm;
