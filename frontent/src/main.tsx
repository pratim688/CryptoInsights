import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Provider } from "react-redux";
import store, { persistor } from "./Redux/store.ts";
import { PersistGate } from "redux-persist/integration/react";
import MainWrapper from "./MainWrapper.tsx";
createRoot(document.getElementById("root")!).render(
  
  <Provider store={store}>
    <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
    <MainWrapper />
    <App />
    </PersistGate>
  </Provider>
);
