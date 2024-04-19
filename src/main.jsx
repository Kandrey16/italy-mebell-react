import React, { createContext } from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from "@material-tailwind/react";
import App from "./App.jsx";
import UserStore from "./store/UserStore.js";
import ProductStore from "./store/ProductStore.js";
import CartStore from "./store/CartStore.js";
import OrderStore from "./store/OrderStore.js";
import AttributeStore from "./store/AttributeStore.js";
import ProductCommentStore from "./store/ProductCommentStore.js";

const user = new UserStore();
const product = new ProductStore();
const cart = new CartStore();
const order = new OrderStore();
const attribute = new AttributeStore();
const comment = new ProductCommentStore();

export const Context = createContext(null);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Context.Provider
      value={{
        user,
        product,
        cart,
        order,
        attribute,
        comment,
      }}
    >
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </Context.Provider>
  </React.StrictMode>
);
