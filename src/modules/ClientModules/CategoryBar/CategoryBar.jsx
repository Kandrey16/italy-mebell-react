import { useEffect, useContext, useState } from "react";
import { Context } from "@/main";
import { observer } from "mobx-react";
import {
  Card,
  Checkbox,
  List,
  ListItem,
  Typography,
} from "@material-tailwind/react";
import { toJS } from "mobx";

const CategoryBar = observer(() => {
  const { product } = useContext(Context);

  useEffect(() => {
    product.fetchSpecifications();
  }, [product]);

  console.log(toJS(product.specifications));

  return (
    <>
      <Card>
        <div className="mb-2 p-4">
          <Typography variant="h5" color="black">
            Фильтры
          </Typography>
        </div>
        <List>
          {product.categories.map((category) => (
            <ListItem
              className="cursor-pointer"
              active={
                category.id === product.selectedCategory.id ? "true" : "false"
              }
              onClick={() => {product.setSelectedCategory(category)}}
              key={category.id_category}
            >
              {category.name_category}
            </ListItem>
          ))}
          {/* {product.specifications.map((spec) => (
            <ListItem
              key={spec.id_specification}
              className="flex justify-between"
            >
              <Checkbox
                color="lightBlue"
                text={spec.value_specification}
                id={`checkbox-${spec.id_specification}`}
                onChange={(e) =>
                  product.toggleSpecificationFilter(
                    spec.id_specification,
                    e.target.checked
                  )
                }
              />
              <Typography>
                {spec.name_attribute} - {spec.value_specification}
              </Typography>
            </ListItem>
          ))} */}
        </List>
      </Card>
    </>
  );
});

export default CategoryBar;
