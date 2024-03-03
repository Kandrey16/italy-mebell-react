import { useEffect, useContext } from "react";
import { Context } from "@/main";
import { observer } from "mobx-react";
import { Card, List, ListItem, Typography } from "@material-tailwind/react";

const CategoryBar = observer(() => {
  const { product } = useContext(Context);
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
              onClick={() => product.setSelectedCategory(category)}
              key={category.id_category}
            >
              {category.name_category}
            </ListItem>
          ))}
        </List>
      </Card>
    </>
  );
});

export default CategoryBar;
