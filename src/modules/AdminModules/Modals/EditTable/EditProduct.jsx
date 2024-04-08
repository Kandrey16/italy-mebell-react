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
import { fetchCategories, editProduct } from "@/API/ProductAPI";
import { observer } from "mobx-react";

const ProductEditForm = observer(({ show, onHide, product }) => {
  //   const { product } = useContext(Context);
  const [name, setName] = useState(product.name_product);
  const [article, setArticle] = useState(product.article_product);
  const [price, setPrice] = useState(product.price_product);
  const [file, setFile] = useState(product.url_main_image_product);
  const [description, setDescription] = useState(product.description_product);
  const [count, setCount] = useState(product.count_product);
  const [category, setCategory] = useState(product.id_category);

  //   useEffect(() => {
  //     fetchCategories().then((data) => product.setCategories(data));
  //   }, []);

  useEffect(() => {
    if (product) {
      setName(product.name_product);
      setArticle(product.article_product);
      setPrice(product.price_product);
      setDescription(product.description_product);
      setCount(product.count_product);
      setCategory(product.id_category);
    }
  }, [product]);

  const selectFile = (e) => {
    setFile(e.target.files[0]);
  };

  const updateProduct = () => {
    const formData = new FormData();
    formData.append("name_product", name);
    formData.append("article_product", article);
    formData.append("price_product", price);
    if (file) {
      formData.append("url_main_image_product", file);
    }
    formData.append("description_product", description);
    formData.append("count_product", count);
    formData.append("id_category", category);

    editProduct(product.id_product, formData).then(() => {
      fetchProducts().then((data) => product.setProducts(data)); // Обновление продуктов
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
            <div className="flex flex-col gap-4">
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                size="lg"
                label="Название"
              />
              <Input
                value={article}
                onChange={(e) => setArticle(e.target.value)}
                size="lg"
                label="Артикул"
              />
              <Select
                color="blue"
                label="Категория"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {product.categories ? (
                  product.categories.map((category) => (
                    <Option
                      key={category.id_category}
                      value={category.id_category}
                    >
                      {category.name_category}
                    </Option>
                  ))
                ) : (
                  <Option disabled>Загрузка...</Option>
                )}
              </Select>

              <Input
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                size="lg"
                type="number"
                label="Цена"
              />
              <Input
                value={count}
                onChange={(e) => setCount(e.target.value)}
                size="lg"
                type="number"
                label="Количество"
              />
              <Input
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                size="lg"
                label="Описание"
              />
              <input type="file" onChange={selectFile} />
            </div>
            <hr />
            <Button
              className="m-2"
              color="blue"
              size="md"
              onClick={updateProduct}
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

export default ProductEditForm;
