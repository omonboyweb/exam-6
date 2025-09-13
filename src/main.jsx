import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "antd/dist/reset.css"; // Ant Design reset css
import "./index.css"; // o‘z css yoki tailwind bo‘lsa

import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { persistor, store } from "./store/store.js";
import { PersistGate } from "redux-persist/integration/react";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </BrowserRouter>
);
