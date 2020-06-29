import { at } from "lodash";

export const logger = (param) => (store) => (next) => (action) => {
  console.log("Logger", param);
  next(action);
};
