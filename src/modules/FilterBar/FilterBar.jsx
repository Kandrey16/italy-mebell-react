import { useEffect, useContext, useState } from "react";
import { Context } from "@/main";
import { observer } from "mobx-react";
import {
  Button,
  Card,
  Checkbox,
  List,
  ListItem,
  Typography,
  Input,
  Radio,
  Rating,
} from "@material-tailwind/react";
import { fetchProducts } from "@/API/ProductAPI";
import { toJS } from "mobx";

const FilterBar = observer(() => {
  const { product } = useContext(Context);
  const [appliedFilters, setAppliedFilters] = useState({});
  const [selectedRating, setSelectedRating] = useState(0);

  useEffect(() => {
    product.fetchSpecifications();
    product.fetchCollections();
  }, [product]);

  const uniqueSpecifications = product.specifications.reduce((acc, current) => {
    const x = acc.find(
      (item) => item.value_specification === current.value_specification
    );
    if (!x) {
      return acc.concat([current]);
    } else {
      return acc;
    }
  }, []);

  const applyFilters = async () => {
    try {
      product.setIsLoading(true); // Устанавливаем флаг загрузки перед отправкой запроса
      const valueSpecString = appliedFilters.value_specification
        ? appliedFilters.value_specification.join(",")
        : "";

      const filteredProducts = await fetchProducts(
        {
          ...appliedFilters,
          value_specification: valueSpecString,
        },
        product.page,
        product.limit
      );
      console.log("Получены отфильтрованные товары:", filteredProducts);
      product.setFilteredProducts(filteredProducts); // Обновляем searchedProduct вместо products
    } catch (error) {
      console.error("Ошибка при применении фильтров:", error);
    } finally {
      product.setIsLoading(false); // Сбрасываем флаг загрузки после получения данных
    }
  };

  const resetFilters = async () => {
    setAppliedFilters({}); // Сбрасываем примененные фильтры
    setSelectedRating(0); // Сбрасываем рейтинг, если он был установлен

    try {
      product.setIsLoading(true); // Устанавливаем флаг загрузки
      const allProducts = await fetchProducts({}, product.page, product.limit);
      product.setFilteredProducts(allProducts);
    } catch (error) {
      console.error("Ошибка при получении всех товаров:", error);
    } finally {
      product.setIsLoading(false); // Сбрасываем флаг загрузки
    }
  };

  const hasActiveFilters = () => {
    return (
      Object.values(appliedFilters).filter(Boolean).length > 0 ||
      selectedRating > 0
    );
  };

  return (
    <div className="items-start">
      <div className="mb-2 p-4">
        <Typography variant="h5" color="black">
          Фильтры
        </Typography>
        {hasActiveFilters() && (
          <Button
            className="bg-gray-400 text-black w-full mt-10"
            onClick={resetFilters} // Привязываем функцию сброса фильтров к кнопке
          >
            Сбросить
          </Button>
        )}
      </div>
      <List className="items-start">
        <Typography variant="h5" color="blue-gray">
          Цена
        </Typography>
        <ListItem className="flex space-x-2 justify-between">
          <input
            placeholder="От"
            className="p-2 w-[7rem] rounded-xl border-2 border-blue-300"
            value={appliedFilters.price_min || ""}
            onChange={(e) =>
              setAppliedFilters({
                ...appliedFilters,
                price_min: e.target.value,
              })
            }
          ></input>
          <input
            placeholder="До"
            className="p-2 w-[7rem] rounded-xl border-2 border-blue-300"
            value={appliedFilters.price_max || ""}
            onChange={(e) =>
              setAppliedFilters({
                ...appliedFilters,
                price_max: e.target.value,
              })
            }
          ></input>
        </ListItem>
        <Typography variant="h5" color="blue-gray">
          Рейтинг
        </Typography>
        <ListItem className="flex flex-col items-start">
          {[1, 2, 3, 4, 5].map((rating) => (
            <div className="flex ">
              <Radio
                key={rating}
                id={`rating-${rating}`}
                checked={selectedRating === rating}
                onChange={() => {
                  setSelectedRating(rating);
                  setAppliedFilters({ ...appliedFilters, rating_min: rating });
                }}
              />
              <Rating value={rating} readonly />
            </div>
          ))}
        </ListItem>
        <Typography variant="h5" color="blue-gray">
          Коллекции
        </Typography>
        {product.collections.map((collection) => (
          <ListItem
            key={collection.id_collection}
            className="flex flex-col items-start"
          >
            <Checkbox
              color="lightBlue"
              text={collection.name_collection}
              id={`collection-checkbox-${collection.name_collection}`}
              label={collection.name_collection}
              checked={
                appliedFilters.id_collection &&
                appliedFilters.id_collection.includes(collection.id_collection)
              }
              onChange={(e) => {
                const newCollectionIds = e.target.checked
                  ? [
                      ...(appliedFilters.id_collection || []),
                      collection.id_collection,
                    ]
                  : (appliedFilters.id_collection || []).filter(
                      (id) => id !== collection.id_collection
                    );
                setAppliedFilters({
                  ...appliedFilters,
                  id_collection: newCollectionIds,
                });
              }}
            />
          </ListItem>
        ))}
        <Typography variant="h5" color="blue-gray">
          Характеристики
        </Typography>
        {uniqueSpecifications.map((spec) => (
          <>
            <Typography>{spec.attribute.name_attribute}</Typography>
            <ListItem
              key={spec.id_specification}
              className="flex flex-col items-start"
            >
              <Checkbox
                color="lightBlue"
                text={spec.value_specification}
                label={spec.value_specification}
                id={`checkbox-${spec.id_specification}`}
                onChange={(e) => {
                  const newValue = e.target.checked
                    ? [
                        ...(appliedFilters.value_specification || []),
                        spec.value_specification,
                      ]
                    : appliedFilters.value_specification.filter(
                        (value) => value !== spec.value_specification
                      );
                  setAppliedFilters({
                    ...appliedFilters,
                    value_specification: newValue,
                  });
                }}
              />
            </ListItem>
          </>
        ))}
      </List>
      <div className="flex p-4 ">
        <Button
          className="w-full bg-colorPrimary"
          onClick={() => {
            applyFilters();
          }}
        >
          Применить
        </Button>
      </div>
    </div>
  );
});

export default FilterBar;
