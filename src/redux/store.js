import { configureStore, compose } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import WeatherSlice from "./reducer/WeatherSlice";

const store = configureStore(
  {
    reducer: {
        weather: WeatherSlice
    },
    devTools: true,
    middleware: [thunk]
  },
  (window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__()) ||
    compose
);

export default store