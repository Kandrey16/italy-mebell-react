import React, { useState, useEffect, useContext } from "react";
import {
  Button,
  Card,
  CardBody,
  Dialog,
  Input,
  Select,
  Option,
} from "@material-tailwind/react";
import { Context } from "@/main";
import { editProduct, fetchProducts } from "@/API/ProductAPI";
import { observer } from "mobx-react";
import { toJS } from "mobx";

const ProductEditForm = observer(({ show, onHide, selectedProduct }) => {
  const { product } = useContext(Context);
  const [name, setName] = useState(selectedProduct.name_product);
  const [article, setArticle] = useState(selectedProduct.article_product);
  const [price, setPrice] = useState(selectedProduct.price_product);
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState(
    selectedProduct.description_product
  );
  const [count, setCount] = useState(selectedProduct.count_product);
  const [category, setCategory] = useState(selectedProduct.id_category);
  const [collection, setCollection] = useState(selectedProduct.id_collection);

  useEffect(() => {
    if (selectedProduct) {
      setName(selectedProduct.name_product);
      setArticle(selectedProduct.article_product);
      setPrice(selectedProduct.price_product);
      setDescription(selectedProduct.description_product);
      setCount(selectedProduct.count_product);
      setCategory(selectedProduct.id_category);
      setCollection(selectedProduct.id_collection);
    }
  }, [selectedProduct]);

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
    formData.append("id_collection", collection);

    for (const entry of formData.entries()) {
      console.log(entry);
    }

    editProduct(selectedProduct.id_product, formData).then(() => {
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
                onChange={(value) => setCategory(value)}
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
              <Select
                color="blue"
                label="Коллекция"
                value={collection}
                onChange={(value) => setCollection(value)}
              >
                {product.collections ? (
                  product.collections.map((collection) => (
                    <Option
                      key={collection.id_collection}
                      value={collection.id_collection}
                    >
                      {collection.name_collection}
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