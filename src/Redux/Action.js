export const addToCart = (data) => {
  return { type: "addToCart", payload: data };
};
export const removeFromCart = (data) => {
  return {
    type: "removeFromCard",
    payload: data,
  };
};
export const deleteFromCart = (data) => {
  return {
    type: "deleteFromCart",
    payload: data,
  };
};
export const deleteCart = () => {
  return {
    type: "deleteCart",
  };
};
export const searchQuery = (data) => {
  return {
    type: "searchQuery",
    payload: data,
  };
};
