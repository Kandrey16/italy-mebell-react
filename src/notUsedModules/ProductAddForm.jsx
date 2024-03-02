// ProductForm.js
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { createProduct } from "@/redux/actions/productActions";
import {
  Button,
  Card,
  CardBody,
  Dialog,
  Input,
} from "@material-tailwind/react";

const INPUT_LIST = [
  { type: "text", label: "Артикул", value: "article_product" },
  { type: "text", label: "Название", value: "name_product" },
  { type: "text", label: "Описание", value: "description_product" },
  { type: "number", label: "Цена", value: "price_product" },
  { type: "number", label: "Количество", value: "count_product" },
];

export default function ProductAddForm() {
  const dispatch = useDispatch();
  const [product, setProduct] = useState({
    article_product: "",
    name_product: "",
    description_product: "",
    price_product: "",
    count_product: "",
  });

  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen((cur) => !cur);
  const handleClose = () => {
    setOpen(false);
    setProduct({
        article_product: "",
        name_product: "",
        description_product: "",
        price_product: "",
        count_product: "",
      });
  };

  useEffect(() => {
    if (product) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createProduct(product));
    setProduct({
      article_product: "",
      name_product: "",
      description_product: "",
      price_product: "",
      count_product: "",
    });
  };

  return (
    <Dialog
      open={open}
      handler={handleOpen}
      animate={{
        mount: { scale: 1, y: 0 },
        unmount: { scale: 0.9, y: -100 },
      }}
    >
      <Card className="p-4 rounded-xl">
        <CardBody>
          <form onSubmit={handleSubmit}>
            {INPUT_LIST.map((input, index) => (
              <div key={index}>
                <label>{input.label}</label>
                <Input
                  type={input.type}
                  name={input.value}
                  value={product[input.value]}
                  onChange={handleChange}
                />
              </div>
            ))}
            <Button
              className="my-2"
              color="blue"
              size="md"
              type="submit"
              onClick={handleClose}
            >
              Создать
            </Button>
          </form>
        </CardBody>
      </Card>
    </Dialog>
  );
}