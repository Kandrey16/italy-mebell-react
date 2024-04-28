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
import { NavLink, useNavigate } from "react-router-dom";
import { CART_ROUTE } from "@/routes/utils/consts";
import style from "./Cart.module.scss";

const Cart = observer(() => {
  const { product, user, cart } = useContext(Context);
  const navigate = useNavigate();
  const [openPopover, setOpenPopover] = useState(false);
  const [totalItemsInCart, setTotalItemsInCart] = useState(0);

  const triggers = {
    onMouseEnter: () => setOpenPopover(true),
    onMouseLeave: () => setOpenPopover(false),
  };

  useEffect(() => {
    cart.getCart(user.user.email_user);
  
    const totalItems = cart.cart.reduce((total, cartItem) => {
      return total + cartItem.count_cart_product;
    }, 0);

    setTotalItemsInCart(totalItems);
  }, [cart.cart]);

  const cartNotEmpty = cart.cart.length > 0;

  return (
    <>
      <Popover open={openPopover} handler={setOpenPopover}>
        <PopoverHandler {...triggers} onClick={() => navigate(CART_ROUTE)}>
          <div className="relative inline-block">
            <img src={basketIcon} className={style.not_active} />
            {cartNotEmpty && (
              <div src={basketIcon} className={style.active}>
                {totalItemsInCart}
              </div>
            )}
          </div>
        </PopoverHandler>
        {cartNotEmpty && (
          <PopoverContent {...triggers} className="z-50 max-w-[32rem]">
            <List>
              {cart.cart.map((item) => {
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
                            cart.removeFromCart(item.id_cart_product)
                          }
                        />
                      </ListItemSuffix>
                    </ListItem>
                  );
                }
              })}
            </List>
            <Button
              className="w-full border-t border-blue-gray-50 bg-colorPrimary"
              onClick={() => navigate(CART_ROUTE)}
            >
              Перейти в корзину
            </Button>
          </PopoverContent>
        )}
      </Popover>
    </>
  );
});

export default Cart;
