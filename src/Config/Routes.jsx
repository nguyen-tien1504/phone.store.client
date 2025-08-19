import { createBrowserRouter } from "react-router-dom";
import Home from "../Components/Pages/Home/Home";
import DefaultLayout from "../Default Layout/DefaultLayou";
import ProductsList from "../Components/Pages/Products/Products List/ProductsList";
import ProductDetail from "../Components/Pages/Products/ProductDetail/ProductDetail";
import CartShopping from "../Components/Pages/Cart and Checkout/Cart shopping/CartShopping";
import CheckOut1 from "../Components/Pages/Cart and Checkout/CheckOut1/CheckOut1";
import SuccessPage from "../Components/Pages/Cart and Checkout/SuccessPage/SuccessPage";
import Login from "../Components/LoginSignin/Login/Login";
import Signin from "../Components/LoginSignin/Signin/Signin";
import DefaultLayoutAdmin from "./../Admin Pages/Default Layout/DefaultLayoutAdmin";
import GetAllProducts from "./../Admin Pages/Products/getAllProducts";
import Error from "../Components/Pages/Error/Error";
import CreateProduct from "../Admin Pages/Create a Product/CreateProduct";
import UpdateProduct from "../Admin Pages/Update a Product/UpdateProduct";
import Order from "../Admin Pages/Order/Order";
import OrderDetail from "../Admin Pages/Order/OrderDetail";
import User from "./../Admin Pages/User/User";
import OrderUserDetail from "../Admin Pages/User/OrderUserDetail";
import Category from "../Admin Pages/Category/Category";
import CreateCategory from "../Admin Pages/Category/CreateCategory";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/products",
        element: <ProductsList />,
      },
      {
        path: "/product/:productID",
        element: <ProductDetail />,
      },
      {
        path: "/cart-shopping",
        element: <CartShopping />,
      },
      {
        path: "/cart-shopping/check-out1",
        element: <CheckOut1 />,
      },
      {
        path: "/successpage",
        element: <SuccessPage />,
      },
      {
        path: "/user-detail",
        element: <User />,
      },
      {
        path: "/user-detail/order-detail",
        element: <OrderUserDetail />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signin",
    element: <Signin />,
  },
  {
    path: "/admin",
    element: <DefaultLayoutAdmin />,
    children: [
      {
        path: "/admin/categories",
        element: <Category />,
      },
      {
        path: "/admin/create-category",
        element: <CreateCategory />,
      },
      { path: "/admin/products", element: <GetAllProducts /> },
      { path: "/admin/orders", element: <Order /> },
      { path: "/admin/orders/order-detail/:userID", element: <OrderDetail /> },
      { path: "/admin/create-product", element: <CreateProduct /> },
      { path: "/admin/update-product", element: <UpdateProduct /> },
    ],
  },
]);
export default router;
