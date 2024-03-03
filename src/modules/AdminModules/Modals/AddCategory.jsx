import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  CardBody,
  Dialog,
  Input,
  Typography,
} from "@material-tailwind/react";
import { createCategory } from "@/API/ProductAPI";

export default function CategoryAddForm({ show, onHide }) {
  const [value, setValue] = useState("");

  const addCategory = () => {
    createCategory({ name_category: value }).then((data) => {
      setValue("");
      onHide()
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
              <Typography>Категория</Typography>
              <Input
                size="lg"
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
            </div>
            <Button
              className="my-2"
              color="blue"
              size="md"
              onClick={addCategory}
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
}
