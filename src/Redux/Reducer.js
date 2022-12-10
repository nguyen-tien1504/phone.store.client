const initState = {
  cart: [],
  totalBill: 0,
  searchQuery: "",
};
const rootReducer = (state = initState, action) => {
  switch (action.type) {
    case "addToCart":
      const reqToAdd = action.payload;
      const itemFindToAdd = state.cart.find((item) => {
        return item.id == reqToAdd.id;
      });
      if (itemFindToAdd) {
        return {
          ...state,
          cart: state.cart.map((item) => {
            return item.id == reqToAdd.id
              ? { ...item, quantity: item.quantity + 1 }
              : item;
          }),
          totalBill: state.totalBill + reqToAdd.price,
        };
      }
      return {
        ...state,
        cart: [...state.cart, { ...action.payload, quantity: 1 }],
        totalBill: state.totalBill + reqToAdd.price,
      };
    case "removeFromCard":
      const reqToRemove = action.payload;
      const itemFindTodelete = state.cart.find((item) => {
        return item.id == reqToRemove.id;
      });
      if (itemFindTodelete.quantity == 1) {
        return {
          ...state,
          cart: state.cart.filter((item) => item !== reqToRemove),
          totalBill: state.totalBill - reqToRemove.price * reqToRemove.quantity,
        };
      }

      return {
        ...state,
        cart: state.cart.map((item) => {
          return item.id == reqToRemove.id
            ? { ...item, quantity: item.quantity - 1 }
            : item;
        }),
        totalBill: state.totalBill - reqToRemove.price,
      };
    case "deleteFromCart":
      const reqToDelete = action.payload;
      return {
        ...state,
        cart: state.cart.filter((item) => item !== reqToDelete),
        totalBill: state.totalBill - reqToDelete.price * reqToDelete.quantity,
      };
    case "deleteCart":
      return {
        ...state,
        cart: [],
        totalBill: 0,
      };
    case "searchQuery":
      const search = action.payload;
      return {
        ...state,
        searchQuery: search,
      };
    default:
      return state;
  }
};
export default rootReducer;
