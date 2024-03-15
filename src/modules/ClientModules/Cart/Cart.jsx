import { Context } from "@/main";
import { toJS } from "mobx";
import { useState, useContext, useEffect } from "react";
import {
  Popover,
  PopoverHandler,
  PopoverContent,
  Button,
  Avatar,
  Typography,
  List,
  ListItem,
  ListItemSuffix,
  ListItemPrefix,
} from "@material-tailwind/react";
import basketIcon from "@/assets/BasketIcon.svg";
import deleteIcon from "@/assets/delete.svg";
import { observer } from "mobx-react";

const Cart = observer(() => {
  const { product, user } = useContext(Context);
  const [openPopover, setOpenPopover] = useState(false);

  const triggers = {
    onMouseEnter: () => setOpenPopover(true),
    onMouseLeave: () => setOpenPopover(false),
  };

  useEffect(() => {
    console.log("Getting cart for user: ", user.user.email_user);
    console.log("Current cart: ", toJS(product.cart));
    product.getCart(user.user.email_user);
  }, []);

  return (
    <>
      <Popover open={openPopover} handler={setOpenPopover}>
        <PopoverHandler {...triggers}>
          <img src={basketIcon} />
        </PopoverHandler>
        <PopoverContent {...triggers} className="z-50 max-w-[32rem]">
          <List>
            {product.cart.map((item) => {
              if ((item, product)) {
                const image = `${import.meta.env.VITE_APP_API_URL}/${item.product.url_main_image_product}`;
                return (
                  <ListItem
                    className="flex justify-between p-2"
                    key={item.id_cart_product}
                  >
                    <ListItemPrefix>
                      <Avatar
                        size="lg"
                        variant="rounded"
                        src={image}
                        alt={item.name_product}
                      />
                    </ListItemPrefix>
                    <div className="flex flex-col">
                      <strong>{item.product.name_product}</strong>
                      <span>Кол-во: {item.count_cart_product} шт</span>
                    </div>
                    <ListItemSuffix className="p-2">
                      <img
                        className="w-6 h-6"
                        src={deleteIcon}
                        onClick={() =>
                          product.removeFromCart(item.id_cart_product)
                        }
                      />
                    </ListItemSuffix>
                  </ListItem>
                );
              }
            })}
          </List>
          <Button className="w-full border-t border-blue-gray-50">
            Перейти в корзину
          </Button>
        </PopoverContent>
      </Popover>
    </>
  );
});

export default Cart;
