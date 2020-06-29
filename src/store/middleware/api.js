import axios from "axios";
import * as actions from "../api";

const api = ({ dispatch }) => (next) => async (action) => {
  if (action.type !== actions.apiCallBegan.type) return next(action);

  const { url, method, data, onSuccess, onStart, onError } = action.payload;

  if (onStart) dispatch({ type: onStart });

  next(action);

  try {
    const result = await axios.request({
      baseURL: "http://localhost:9001/api/",
      url,
      method,
      data,
      onSuccess,
      onError,
    });
    // General
    dispatch(actions.apiCallSuccess(result.data));
    // Specific
    if (onSuccess) dispatch({ type: onSuccess, payload: result.data });
  } catch (err) {
    // General
    dispatch(actions.apiCallFailed(err.message));
    // Specific
    if (onError) dispatch({ type: onError, payload: err.message });
  }
};

export default api;
