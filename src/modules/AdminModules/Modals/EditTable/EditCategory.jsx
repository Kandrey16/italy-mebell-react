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

const CategoryEditForm = observer(({ show, onHide, category }) => {
  const { product } = useContext(Context);
  const [value, setValue] = useState(category.name_category);

  useEffect(() => {
    if (category) {
      setValue(category.name_category);
    }
  }, [category]);

  const editCategory = () => {
    // editCategory(category.id_category, { name_category: value }).then((data) => {
    //   setValue("");
    //   onHide();
    // });
    if (category && category.id_category) {
      product
        .editCategory(category.id_category, {
          name_category: value,
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
                Изменить категорию
              </Typography>
              <Input
                type="text"
                size="lg"
                lavel="Название"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Введите новое название категории"
              />
            </div>
            <Button
              className="my-2"
              color="blue"
              size="md"
              onClick={editCategory}
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

export default CategoryEditForm;
