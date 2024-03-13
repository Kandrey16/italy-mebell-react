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
} from "@material-tailwind/react";
import basketIcon from "@/assets/BasketIcon.svg";
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
        <PopoverContent {...triggers} className="z-50 max-w-[24rem]">
          <List>
            {product.cart.map((item) => {
              if ((item, product)) {
                const image = `${import.meta.env.VITE_APP_API_URL}/${item.product.url_main_image_product}`;
                return (
                  <ListItem key={item.id_cart_product}>
                    <Avatar
                      size="md"
                      variant="rounded"
                      src={image}
                      alt={item.name_product}
                    />
                    <Typography>{item.product.name_product}</Typography>
                  </ListItem>
                );
              }
            })}
          </List>
          <div className="mt-6 flex items-center border-t border-blue-gray-50 pt-4">
            <Button>Перейти в корзину</Button>
          </div>
        </PopoverContent>
      </Popover>
    </>
  );
});

export default Cart;
