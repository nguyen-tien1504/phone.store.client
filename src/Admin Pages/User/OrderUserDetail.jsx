import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useUserCartById } from "../../Query/query";

const OrderUserDetail = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const { data, isLoading } = useUserCartById(user._id);
  console.log(data);

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }
  function getDate(x) {
    return new Date(x).toISOString().replace(/T.*/, "").split("-").reverse().join("/");
  }
  return (
    <div className="mt-12 mx-16 border border-black border-solid relative rounded-md p-4 px-28 bg-[#f8f9fa] h-screen">
      <p className="font-bold text-3xl mt-8">Chi tiết đơn hàng</p>
      {!isLoading && (
        <div className="mt-12">
          <div className="flex flex-col gap-3">
            <p className="text-xl">
              <span className="font-bold">Tên khách hàng:</span> {data.fullName}
            </p>
            <p className="text-xl">
              <span className="font-bold">Điện thoại:</span> {data.phone}
            </p>

            <p className="text-xl">
              <span className="font-bold">Địa chỉ giao hàng:</span>{" "}
              {data.order.addressDelivery}
            </p>
            <p className="text-xl">
              <span className="font-bold">Ngày đặt:</span> {getDate(data.order.orderAt)}
            </p>
            
          </div>
          <div className="mt-10">
            <table className="w-full text-center">
              <thead>
                <tr>
                  <td>STT</td>
                  <td className="text-left pl-2">Tên sản phẩm</td>
                  <td>Số lượng</td>
                  <td>Giá bán</td>
                  <td>Thành tiền</td>
                </tr>
              </thead>
              <tbody>
                {data.order.cart.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td className="text-left pl-2">{item.title}</td>
                      <td>{item.quantity}</td>
                      <td>{item.price ? numberWithCommas(item.price) : item.price}</td>
                      <td>
                        {item.quantity && item.price
                          ? numberWithCommas(item.quantity * item.price)
                          : ""}
                      </td>
                    </tr>
                  );
                })}
                <tr>
                  <td
                    colSpan={5}
                    className="text-right pr-36 text-[#ed1c1c]">
                    Tổng cộng:{" "}
                    {data.order.totalBill
                      ? numberWithCommas(data.order.totalBill)
                      : data.order.totalBill}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
      <div className="flex items-center absolute top-[85%] left-28">
        <Link
          to="/user-detail"
          className="flex items-center gap-1 p-2 bg-[orange]/70 rounded-md">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            className="bi bi-reply-fill"
            viewBox="0 0 16 16">
            <path d="M5.921 11.9 1.353 8.62a.719.719 0 0 1 0-1.238L5.921 4.1A.716.716 0 0 1 7 4.719V6c1.5 0 6 0 7 8-2.5-4.5-7-4-7-4v1.281c0 .56-.606.898-1.079.62z" />
          </svg>
          <p>Quay lại</p>
        </Link>
      </div>
    </div>
  );
};

export default OrderUserDetail;
