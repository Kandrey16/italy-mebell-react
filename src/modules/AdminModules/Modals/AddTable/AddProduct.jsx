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
  fetchProducts,
  createProduct,
} from "@/API/ProductAPI";
import { fetchAttributes } from "@/API/AttributeAPI";
import { observer } from "mobx-react";
import { toJS } from "mobx";

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
  const [images, setImages] = useState([]);

  useEffect(() => {
    product
      .fetchCategories()
      .then(() => {
        // console.log("Категории:", toJS(product.categories));
      })
      .catch((e) => {
        console.error("Ошибка при загрузке категорий", e);
      });
    product
      .fetchCollections()
      .then(() => {
        // console.log("Коллекции:", toJS(product.collections));
      })
      .catch((e) => {
        console.error("Ошибка при загрузке коллекций", e);
      });
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

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(images.concat(files));
  };

  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const addProduct = () => {
    if (!product.selectedCategory || !product.selectedCategory.id_category) {
      console.warn("Категория не выбрана. Отмена добавления продукта.");
      return;
    }

    console.log("Начало процесса добавления продукта:");
    console.log(`Название: ${name}, Артикул: ${article}, Цена: ${price}`);
    console.log(`Описание: ${description}, Количество: ${count}`);
    console.log("Выбранные характеристики:", specification);
    console.log(
      "Выбранные изображения:",
      images.map((file) => file.name)
    );

    const formData = new FormData();
    formData.append("name_product", name);
    formData.append("article_product", article);
    formData.append("price_product", `${price}`);
    formData.append("url_main_image_product", file);
    formData.append("description_product", description);
    formData.append("count_product", `${count}`);
    formData.append("id_category", product.selectedCategory.id_category);
    formData.append(
      "id_collection",
      product.setSelectedCollection.id_collection
    );
    formData.append("specifications", JSON.stringify(specification));
    images.forEach((image) => {
      formData.append("additional_images", image);
    });

    createProduct(formData)
      .then(() => {
        console.log("Продукт успешно создан. Обновление списка продуктов...");
        fetchProducts()
          .then((data) => {
            console.log("Список продуктов после создания товара:", data.rows);
            product.setProducts(data.rows);
          })
          .catch((error) => {
            console.error("Ошибка при обновлении списка продуктов:", error);
          });
        onHide();
      })
      .catch((error) => {
        console.error("Ошибка при добавлении продукта:", error);
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
                required
              />
              <Input
                value={article}
                onChange={(e) => setArticle(e.target.value)}
                size="lg"
                label="Артикул"
                required
              />
              <Select color="blue" label="Категория" required>
                {product.categories.map((category) => (
                  <Option
                    onClick={() => product.setSelectedCategory(category)}
                    key={category.id_category}
                  >
                    {category.name_category}
                  </Option>
                ))}
              </Select>
              <Select color="blue" label="Коллекция" required>
                {product.collections.map((collection) => (
                  <Option
                    onClick={() => {
                      product.setSelectedCollection(collection);
                      console.log(product.selectedCollection);
                    }}
                    key={collection.id_collection}
                  >
                    {collection.name_collection}
                  </Option>
                ))}
              </Select>
              <Input
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                size="lg"
                type="number"
                label="Цена"
                required
              />
              <Input
                value={count}
                onChange={(e) => setCount(e.target.value)}
                size="lg"
                type="number"
                label="Количество"
                required
              />
              <Input
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                size="lg"
                label="Описание"
                required
              />
              <input type="file" onChange={selectFile} required/>
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
              {images.map((file, index) => (
                <div key={index}>
                  <Typography>{file.name}</Typography>
                  <Button color="red" onClick={() => removeImage(index)}>
                    Удалить
                  </Button>
                </div>
              ))}
              <input type="file" multiple onChange={handleImageChange} />
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
