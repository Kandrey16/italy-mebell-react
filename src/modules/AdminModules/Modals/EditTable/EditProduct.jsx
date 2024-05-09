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
import { fetchCategories, editProduct, fetchProducts } from "@/API/ProductAPI";
import { observer } from "mobx-react";
import { toJS } from "mobx";

const ProductEditForm = observer(({ show, onHide, product }) => {
  const { product: productStore } = useContext(Context);
  const [name, setName] = useState(product.name_product);
  const [article, setArticle] = useState(product.article_product);
  const [price, setPrice] = useState(product.price_product);
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState(product.description_product);
  const [count, setCount] = useState(product.count_product);
  const [category, setCategory] = useState(product.id_category);
  const [collection, setCollection] = useState(product.id_collection);
  const [specification, setSpecification] = useState([]);
  const [attribute, setAttribute] = useState([]);
  const [images, setImages] = useState([]);

  useEffect(() => {
    if (product) {
      setName(product.name_product);
      setArticle(product.article_product);
      setPrice(product.price_product);
      setDescription(product.description_product);
      setCount(product.count_product);
      setCategory(product.id_category);
      setCollection(product.id_collection);
    }
  }, [product]);

  // useEffect(() => {
  //   productStore
  //     .fetchCategories()
  //     .then(() => {
  //       console.log("Категории:", toJS(productStore.categories));
  //     })
  //     .catch((e) => {
  //       console.error("Ошибка при загрузке категорий", e);
  //     });
  //   productStore
  //     .fetchCollections()
  //     .then(() => {
  //       console.log("Коллекции:", toJS(productStore.collections));
  //     })
  //     .catch((e) => {
  //       console.error("Ошибка при загрузке коллекций", e);
  //     });
  // }, []);

  // const selectFile = (e) => {
  //   setFile(e.target.files[0]);
  // };

  // const handleImageChange = (e) => {
  //   const files = Array.from(e.target.files);
  //   setImages(images.concat(files));
  // };

  // const removeImage = (index) => {
  //   setImages(images.filter((_, i) => i !== index));
  // };

  // const addSpecification = () => {
  //   setSpecification([
  //     ...specification,
  //     {
  //       id_specification: Date.now(),
  //       id_attribute: null,
  //       value_specification: "",
  //     },
  //   ]);
  // };

  // const removeSpecification = (id) => {
  //   setSpecification(specification.filter((i) => i.id_specification !== id));
  // };

  // const handleAttributeChange = (index, value) => {
  //   const updatedSpecification = [...specification];
  //   updatedSpecification[index].id_attribute = value;
  //   setSpecification(updatedSpecification);
  // };

  // const handleValueChange = (index, value) => {
  //   const updatedSpecification = [...specification];
  //   updatedSpecification[index].value_specification = value;
  //   setSpecification(updatedSpecification);
  // };

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
    // formData.append("specifications", JSON.stringify(specification));
    // images.forEach((image) => {
    //   formData.append("additional_images", image);
    // });
    // for (var pair of formData.entries()) {
    //   console.log(pair[0] + ", " + pair[1]);
    // }

    editProduct(product.id_product, formData).then(() => {
      fetchProducts().then((data) => productStore.setProducts(data)); // Обновление продуктов
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
                {productStore.categories ? (
                  productStore.categories.map((category) => (
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
                label="Категория"
                value={category}
                onChange={(value) => setCollection(value)}
              >
                {productStore.collections ? (
                  productStore.collections.map((collection) => (
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
              {/* <input type="file" onChange={selectFile} />
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
              <input type="file" multiple onChange={handleImageChange} /> */}
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
