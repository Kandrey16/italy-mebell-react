import { Context } from "@/main";
import { observer } from "mobx-react";
import { toJS } from "mobx";
import { useContext, useEffect } from "react";
import deleteIcon from "@/assets/delete.svg";
import { Button } from "@material-tailwind/react";
import plusIcon from "@/assets/rounded-plus.svg";
import minusIcon from "@/assets/round-minus.svg";
import CartItemQuantity from "@/modules/ClientModules/Cart/ProductCounter";

const CartPage = observer(() => {
  const { product, user } = useContext(Context);
  const cart = toJS(product.cart);

  useEffect(() => {
    product.getCart(user.user.email_user);
  }, [cart]);

  if (cart.length === 0) {
    return (
      <div className="container py-10">
        <h1 className="text-4xl">Корзина</h1>
        <div className="text-lg font-medium py-3">Ваша корзина пуста</div>
      </div>
    );
  }

  return (
    <>
      <div className="container py-10">
        <h1 className="text-4xl">Корзина</h1>
        <div className="table w-full py-3">
          <div className="table-header-group">
            <div className="grid grid-cols-[45%_20%_15%_15%_5%]">
              <span className="text-lg font-medium">Название</span>
              <span className="text-lg font-medium">Цена</span>
              <span className="text-lg font-medium">Количество</span>
              <span className="text-lg font-medium">Сумма</span>
            </div>
          </div>
          <hr />
          <div className="">
            {cart.map((item) => {
              const image = `${import.meta.env.VITE_APP_API_URL}/${item.product.url_main_image_product}`;
              return (
                <div
                  key={item.id_cart_product}
                  className="grid grid-cols-[45%_20%_15%_15%_5%] py-3"
                >
                  <div className="">
                    <div className="flex items-center">
                      <img
                        className="w-11 h-11"
                        src={image}
                        alt={item.product.name_product}
                      />
                      <div className="flex flex-col">
                        <strong>{item.product.name_product}</strong>
                        <span>{item.product.article_product}</span>
                      </div>
                    </div>
                  </div>
                  <div className="">
                    <span>{item.product.price_product}</span>
                  </div>
                  <div className="flex items-center justify-start rounded-full">
                    <div className="p-1 rounded-xl">
                      <Button
                        className="rounded-full"
                        color="white"
                        size="sm"
                        ripple={true}
                        onClick={() =>
                          product.updateCartQuantity(
                            item.id_cart_product,
                            item.count_cart_product - 1
                          )
                        }
                        disabled={item.count_cart_product === 1}
                      >
                        <img className="w-4 h-4" src={minusIcon} alt="" />
                      </Button>
                      <span className="mx-2 text-lg">
                        {item.count_cart_product}
                      </span>
                      <Button
                        className="rounded-full"
                        color="white"
                        size="sm"
                        ripple={true}
                        onClick={() =>
                          product.updateCartQuantity(
                            item.id_cart_product,
                            item.count_cart_product + 1
                          )
                        }
                        disabled={
                          item.count_cart_product >= item.product.count_product
                        }
                      >
                        <img className="w-4 h-4" src={plusIcon} alt="" />
                      </Button>
                    </div>
                  </div>
                  <div className="">
                    <span>
                      {item.product.price_product * item.count_cart_product}
                    </span>
                  </div>
                  <div className="">
                    <img
                      className="w-6 h-6"
                      src={deleteIcon}
                      onClick={() =>
                        product.removeFromCart(item.id_cart_product)
                      }
                    />
                  </div>
                </div>
              );
            })}
          </div>
          <hr />
        </div>
      </div>
    </>
  );
});

export default CartPage;
