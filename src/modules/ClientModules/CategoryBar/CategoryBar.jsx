import { useEffect, useContext, useState } from "react";
import { Context } from "@/main";
import { observer } from "mobx-react";
import { toJS } from "mobx";

const CategoryBar = observer(() => {
  const { product } = useContext(Context);

  useEffect(() => {
    // console.log("Загруженные категории:", toJS(product.categories));
  }, [product.categories]);

  useEffect(() => {
    // console.log("Выбранная категория:", toJS(product.selectedCategory));
  }, [product.selectedCategory]);

  const handleClick = (category) => {
    product.setSelectedCategory(category);
  };

  return (
    <>
      <div className="flex space-x-2">
        {product.categories.map((category) => (
          <div
            className="cursor-pointer rounded-3xl bg-colorPrimary my-4 py-2 px-4 text-white text-lg flex items-center justify-center"
            // active={
            //   category.id_category === product.selectedCategory.id_category
            //     ? "true"
            //     : "false"
            // }
            onClick={() => handleClick(category)}
            key={category.id_category}
          >
            {category.name_category}
          </div>
        ))}
      </div>
    </>
  );
});

export default CategoryBar;
