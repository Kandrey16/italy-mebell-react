import React, { createContext } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { ThemeProvider } from "@material-tailwind/react";
import UserStore from "./store/UserStore.js";
import ProductStore from "./store/ProductStore.js";
// import { createStore, applyMiddleware } from "redux";
// import { Provider } from "react-redux";
// import { composeWithDevTools } from "@redux-devtools/extension";
// import { thunk } from "redux-thunk";
// import createSagaMiddleware from "redux-saga";
// import { rootReducer } from "./redux/reducers/rootReducer.js";
// import { sagaWatcher } from "./redux/sagas/productSaga.js";

// const saga = createSagaMiddleware()

// const store = createStore(
//   rootReducer,
//   composeWithDevTools(applyMiddleware(thunk, saga))
// );

// saga.run(sagaWatcher)
export const Context = createContext(null);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Context.Provider
      value={{
        user: new UserStore(),
        product: new ProductStore(),
      }}
    >
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </Context.Provider>
  </React.StrictMode>
);
