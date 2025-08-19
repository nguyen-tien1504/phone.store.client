import "./index.css";
import ReactDOM from "react-dom/client";
import router from "./Config/Routes";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import rootReducer from "./Redux/Reducer";
import { configureStore } from "@reduxjs/toolkit";
import { QueryClient, QueryClientProvider } from "react-query";
// const saga = createSagaMiddleware();
const store = configureStore({ reducer: rootReducer });
const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </QueryClientProvider>
);
