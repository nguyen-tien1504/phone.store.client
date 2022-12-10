import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../../../../Redux/Action";
import { deleteFromCart } from "./../../../../Redux/Action";

const CartTable = () => {
  const data = useSelector((state) => state.cart);
  const totalBill = useSelector((state) => state.totalBill);
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }
  const dispatch = useDispatch();
  return (
    <table className="w-full mt-6">
      <tbody>
        <tr>
          <th>Sản phẩm</th>
          <th>Mô tả</th>
          <th>Số lượng</th>
          <th>Giá</th>
          <th>Tổng</th>
        </tr>
        {data.map((item) => {
          return (
            <tr key={item.value}>
              <td>
                <div className="flex items-center justify-center py-2">
                  <img src={item.thumbnail} alt="" className="w-32 h-32" />
                </div>
              </td>
              <td>
                <div className="ml-4">
                  <p className="font-normal text-lg"></p>
                  <p className="font-bold text-lg">{item.title}</p>
                </div>
              </td>
              <td>
                <div className="flex items-center justify-center">
                  <p className="px-3 py-1 bg-slate-100  border border-solid border-gray-500">
                    {item.quantity}
                  </p>
                  <button
                    className="px-3 py-1 bg-slate-300 border border-solid border-gray-500"
                    onClick={() => dispatch(removeFromCart(item))}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="30"
                      height="30"
                      fill="currentColor"
                      className="bi bi-dash"
                      viewBox="0 0 16 16"
                    >
                      <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z" />
                    </svg>
                  </button>
                  <button
                    className="px-3 py-1 bg-slate-300 border border-solid border-gray-500"
                    onClick={() => dispatch(addToCart(item))}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="30"
                      height="30"
                      fill="currentColor"
                      className="bi bi-plus"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                    </svg>
                  </button>
                  <button
                    className="px-3 py-1 bg-red-500 border border-solid border-gray-500"
                    onClick={() => dispatch(deleteFromCart(item))}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="30"
                      height="30"
                      fill="currentColor"
                      className="bi bi-x"
                      viewBox="0 0 16 16"
                    >
                      <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                    </svg>
                  </button>
                </div>
              </td>
              <td>
                <p className="text-center font-normal text-2xl">
                  {numberWithCommas(item.price)}
                </p>
              </td>
              <td>
                <p className="text-center font-normal text-2xl text-[#eb5757]">
                  {numberWithCommas(item.price * item.quantity)}
                </p>
              </td>
            </tr>
          );
        })}
        <tr>
          <td
            colSpan="4"
            className="text-right border-none text-[#eb5757] font-bold text-lg leading-8 py-2"
          >
            <span className="text-black">Tổng cộng:</span>{" "}
            {numberWithCommas(totalBill)}
          </td>
        </tr>
      </tbody>
    </table>
  );
};
const CartShopping = () => {
  return (
    <div className="mt-12 mx-48 ">
      <p className="font-bold text-2xl">Chi tiết giỏ hàng</p>
      <CartTable />
      <div className="mt-9">
        <div className="flex justify-between">
          <Link
            to="/"
            className="flex items-center gap-1 p-2 bg-[orange]/70 rounded-md"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              className="bi bi-reply-fill"
              viewBox="0 0 16 16"
            >
              <path d="M5.921 11.9 1.353 8.62a.719.719 0 0 1 0-1.238L5.921 4.1A.716.716 0 0 1 7 4.719V6c1.5 0 6 0 7 8-2.5-4.5-7-4-7-4v1.281c0 .56-.606.898-1.079.62z" />
            </svg>
            <p>Tiếp tục mua hàng</p>
          </Link>
          <Link
            to="/cart-shopping/check-out1"
            className="p-2 bg-[#6fc661] text-white rounded-md"
          >
            Tiếp theo
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartShopping;
