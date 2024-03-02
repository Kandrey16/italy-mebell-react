import React, { useState, useEffect, useContext } from "react";
import {
  Button,
  Card,
  CardBody,
  Dialog,
  Input,
  Typography,
  Select,
  Option,
} from "@material-tailwind/react";
import { Context } from "@/main";

export default function ProductAddForm({ show, onHide }) {
  const { product } = useContext(Context);
  const [specification, setSpecification] = useState([]);

  function addSpecification() {
    setSpecification([
      ...specification,
      {id: Date.now() ,name_atribute: "", value_specification: "" },
    ]);
  }

  function removeSpecification(id) {
    setSpecification(specification.filter(i => i.id !== id))
  }
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
            <div className="flex flex-col gap-4">
              <Input size="lg" label="Название" />
              <Input size="lg" label="Артикул" />
              <Select color="blue" label="Категория">
                {product.categories.map((cat) => (
                  <Option key={cat.id}>{cat.name_category}</Option>
                ))}
              </Select>
              <Input size="lg" label="Цена" />
              <Input size="lg" label="Количество" />
              <Input size="lg" label="Описание" />
              <input type="file" />
              <Button variant="outlined" onClick={addSpecification}>
                Добавить новую характеристику
              </Button>
              {specification.map((i) => (
                <div className="grid grid-cols-3 gap-3">
                    <Select
                      className="col"
                      placeholder="Выберите характеристику"
                    >
                      <Option>Ширина</Option>
                    </Select>
                    <Input
                      className="col"
                      label="Значение"
                    ></Input>
                    <Button className="col" variant="outlined" color="red" onClick={() => removeSpecification(i.id)}>
                      Удалить
                    </Button>
                </div>
              ))}
            </div>
            <hr />
            <Button className="m-2" color="blue" size="md" onClick={onHide}>
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
