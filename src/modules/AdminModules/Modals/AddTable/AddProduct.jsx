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
import {
  fetchCategories,
  fetchProducts,
  createProduct,
} from "@/API/ProductAPI";
import { fetchAttributes } from "@/API/AttributeAPI";
import { observer } from "mobx-react";

const ProductAddForm = observer(({ show, onHide }) => {
  const { product } = useContext(Context);
  const [name, setName] = useState("");
  const [article, setArticle] = useState("");
  const [price, setPrice] = useState(0);
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState("");
  const [count, setCount] = useState("");
  const [specification, setSpecification] = useState([]);
  const [attribute, setAttribute] = useState([]);

  useEffect(() => {
    fetchCategories().then((data) => product.setCategories(data));
    fetchAttributes().then((data) => {
      setAttribute(data);
    });
  }, []);

  function addSpecification() {
    setSpecification([
      ...specification,
      {
        id_specification: Date.now(),
        id_attribute: null,
        value_specification: "",
      },
    ]);
  }

  function removeSpecification(id) {
    setSpecification(specification.filter((i) => i.id_specification !== id));
  }

  const handleAttributeChange = (index, value) => {
    const updatedSpecification = [...specification];
    updatedSpecification[index].id_attribute = value;
    setSpecification(updatedSpecification);
  };

  const handleValueChange = (index, value) => {
    const updatedSpecification = [...specification];
    updatedSpecification[index].value_specification = value;
    setSpecification(updatedSpecification);
  };

  const selectFile = (e) => {
    setFile(e.target.files[0]);
  };

  const addProduct = () => {
    if (!product.selectedCategory || !product.selectedCategory.id_category) {
      return;
    }

    const formData = new FormData();
    formData.append("name_product", name);
    formData.append("article_product", article);
    formData.append("price_product", `${price}`);
    formData.append("url_main_image_product", file);
    formData.append("description_product", description);
    formData.append("count_product", `${count}`);
    formData.append("id_category", product.selectedCategory.id_category);
    formData.append("specifications", JSON.stringify(specification));
    console.log(specification);

    createProduct(formData).then(() => {
      fetchProducts().then((data) => {
        product.setProducts(data.rows);
      });
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
              <Select color="blue" label="Категория">
                {product.categories.map((category) => (
                  <Option
                    onClick={() => product.setSelectedCategory(category)}
                    key={category.id_category}
                  >
                    {category.name_category}
                  </Option>
                ))}
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
              <Button variant="outlined" onClick={addSpecification}>
                Добавить новую характеристику
              </Button>
              {specification.map((spec, index) => (
                <div
                  className="grid grid-cols-3 gap-4"
                  key={spec.id_specification}
                >
                  <Select
                    className="col"
                    placeholder="Выберите характеристику"
                    value={spec.id_attribute}
                    onChange={(value) => handleAttributeChange(index, value)}
                  >
                    {attribute.map((attr) => (
                      <Option key={attr.id_attribute} value={attr.id_attribute}>
                        {attr.name_attribute}
                      </Option>
                    ))}
                  </Select>
                  <Input
                    className="col"
                    label="Значение"
                    value={spec.value_specification}
                    onChange={(e) => handleValueChange(index, e.target.value)}
                  ></Input>
                  <Button
                    className="col"
                    variant="outlined"
                    color="red"
                    onClick={() => removeSpecification(spec.id_specification)}
                  >
                    Удалить
                  </Button>
                </div>
              ))}
            </div>
            <hr />
            <Button
              className="my-2"
              color="blue"
              size="md"
              onClick={addProduct}
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

export default ProductAddForm;
