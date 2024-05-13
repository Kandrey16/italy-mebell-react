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

const FilterBar = observer(({ uniqueSpecifications }) => {
  const { product } = useContext(Context);
  const [appliedFilters, setAppliedFilters] = useState({});
  const [appliedSpecifications, setAppliedSpecifications] = useState({});
  const [selectedRating, setSelectedRating] = useState(0);

  useEffect(() => {
    product.fetchSpecifications();
    product.fetchCollections();
    product.fetchCategories();
  }, [product]);

  useEffect(() => {
    const newAppliedSpecifications = Object.keys(uniqueSpecifications).reduce(
      (acc, key) => {
        acc[key] = [...uniqueSpecifications[key]];
        return acc;
      },
      {}
    );
    setAppliedSpecifications(newAppliedSpecifications);
  }, [uniqueSpecifications]);

  const attributesArray = Object.keys(uniqueSpecifications).map(
    (name_attribute) => {
      return {
        name_attribute,
        values: Array.from(uniqueSpecifications[name_attribute]),
      };
    }
  );

  const applyFilters = async () => {
    try {
      product.setIsLoading(true); // Устанавливаем флаг загрузки перед отправкой запроса
      // Формируем объект с фильтрами для запроса
      const filters = {
        ...appliedFilters,
      };

      const formattedFilters = {};
      Object.keys(filters).forEach((key) => {
        if (Array.isArray(filters[key])) {
          formattedFilters[`${key}`] = filters[key];
        } else {
          formattedFilters[key] = filters[key];
        }
      });

      const filteredProducts = await fetchProducts(
        filters,
        product.page,
        product.limit
      );
      product.setFilteredProducts(filteredProducts); // Обновляем searchedProduct вместо products
    } catch (error) {
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
          <>
            <Button
              className="bg-gray-400 text-black w-full mt-10"
              onClick={resetFilters} // Привязываем функцию сброса фильтров к кнопке
            >
              Сбросить
            </Button>
            <Button
              className="w-full bg-colorPrimary mt-3"
              onClick={() => {
                applyFilters();
              }}
            >
              Применить
            </Button>
          </>
        )}
      </div>
      <List className="items-start ">
        <Typography variant="h5" color="blue-gray">
          Цена
        </Typography>
        <ListItem className="flex space-x-1">
          <input
            placeholder="От"
            className="p-2 w-[6rem] rounded-xl border-2 border-blue-300"
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
            className="p-2 w-[6rem] rounded-xl border-2 border-blue-300"
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
                key={`rating-${rating}`}
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
          Категории
        </Typography>
        {product.categories.map((category) => (
          <div
            key={category.id_category}
            className="flex flex-col items-start mb-2"
          >
            <label className="inline-flex items-center">
              <Checkbox
                type="checkbox"
                className="form-checkbox w-4 h-4"
                id={`collection-checkbox-${category.category}`}
                checked={
                  appliedFilters.id_category &&
                  appliedFilters.id_category.includes(category.id_category)
                }
                onChange={(e) => {
                  const newCategoriesIds = e.target.checked
                    ? [
                        ...(appliedFilters.id_category || []),
                        category.id_category,
                      ]
                    : (appliedFilters.id_category || []).filter(
                        (id) => id !== category.id_category
                      );
                  setAppliedFilters({
                    ...appliedFilters,
                    id_category: newCategoriesIds,
                  });
                }}
              />
              <span className="ml-2">{category.name_category}</span>{" "}
            </label>
          </div>
        ))}
        <Typography variant="h5" color="blue-gray">
          Коллекции
        </Typography>
        {product.collections.map((collection) => (
          <div
            key={collection.id_collection}
            className="flex flex-col items-start mb-2"
          >
            <label className="inline-flex items-center">
              <Checkbox
                type="checkbox"
                className="form-checkbox w-4 h-4"
                id={`collection-checkbox-${collection.name_collection}`}
                checked={
                  appliedFilters.id_collection &&
                  appliedFilters.id_collection.includes(
                    collection.id_collection
                  )
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
              <span className="ml-2">{collection.name_collection}</span>{" "}
            </label>
          </div>
        ))}
        <Typography variant="h5" color="blue-gray">
          Характеристики
        </Typography>
        {attributesArray.map((spec) => (
          <div
            key={spec.id_attribute} // Использовать spec.id_attribute вместо spec.id_specification, если id_attribute является уникальным идентификатором атрибута
            className="flex flex-col items-start mb-2"
          >
            <span className="font-bold">{spec.name_attribute}</span>
            {spec.values.map(
              (
                value,
                index // Проитерироваться по values, так как они являются массивом значений для каждого атрибута
              ) => {
                return (
                  <label key={index} className="inline-flex items-center">
                    <Checkbox
                      type="checkbox"
                      className="form-checkbox w-4 h-4"
                      id={`checkbox-${index}`}
                      checked={
                        appliedFilters.value_specification &&
                        appliedFilters.value_specification.includes(value)
                      }
                      onChange={(e) => {
                        let newValueSpecArray =
                          appliedFilters["value_specification"] || "";
                        if (e.target.checked) {
                          newValueSpecArray = newValueSpecArray
                            ? `${newValueSpecArray},${value}`
                            : value;
                        } else {
                          newValueSpecArray = newValueSpecArray
                            .split(",")
                            .filter((val) => val !== value)
                            .join(",");
                        }
                        setAppliedFilters({
                          ...appliedFilters,
                          ["value_specification"]: newValueSpecArray,
                        });
                      }}
                    />
                    <span className="ml-2">{value}</span>
                  </label>
                );
              }
            )}
          </div>
        ))}
      </List>
    </div>
  );
});

export default FilterBar;
