import React, { useState, useEffect, useContext } from "react";
import {
  Button,
  Card,
  CardBody,
  Dialog,
  Input,
  Typography,
} from "@material-tailwind/react";
import { createCollection } from "@/API/ProductAPI";
import { observer } from "mobx-react";
import { Context } from "@/main";

const CollectionAddForm = observer(({ show, onHide }) => {
  const product = useContext(Context);
  const [value, setValue] = useState("");

  const addCollection = () => {
    createCollection({ name_collection: value }).then(() => {
      product.product.fetchCollections();
      setValue("");
      onHide();
    });
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
              <Typography>Коллекция</Typography>
              <Input
                size="lg"
                value={value}
                label="Название"
                required
                onChange={(e) => setValue(e.target.value)}
              />
            </div>
            <Button
              className="my-2"
              color="blue"
              size="md"
              onClick={addCollection}
            >
              Создать
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

export default CollectionAddForm;
