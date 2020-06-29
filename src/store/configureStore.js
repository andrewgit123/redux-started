import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import reducer from "./reducer";
import { logger } from "./middleware/logger";
import func from "./middleware/func";
import notify from "./middleware/notify";
import api from "./middleware/api";

export default function () {
  return configureStore({
    reducer,
    middleware: [
      ...getDefaultMiddleware(),
      logger({ destination: "console" }),
      notify,
      api,
    ],
  });
}
