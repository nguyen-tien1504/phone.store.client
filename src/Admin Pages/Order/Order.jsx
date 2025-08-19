import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Heading } from "../Products/getAllProducts";
import { useAllUserCart, useUpdateOrderStatus } from "../../Query/query";

const Order = () => {
  const { mutate: updateOrderStatus, isLoading: isUpdating } = useUpdateOrderStatus();

  function getDate(x) {
    return new Date(x).toISOString().replace(/T.*/, "").split("-").reverse().join("/");
  }
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

  const handleStatusChange = (userId, newStatus) => {
    updateOrderStatus({ userId, status: newStatus });
  };
  const { data, isLoading } = useAllUserCart();
  return (
    <div className="h-screen">
      <Heading name={"Danh sách đơn hàng"} />
      <div className="mt-5">
        <table className="w-full text-center">
          <thead>
            <tr>
              <th className="px-2">ID</th>
              <th className="px-2">Khách hàng</th>
              <th className="px-2">Số điện thoại</th>
              <th className="px-2">Ngày đặt</th>
              <th className="px-2">Trạng thái</th>
              <th className="px-2">Giá trị đơn hàng</th>
              <th className="px-2">Xử lý đơn</th>
              <th className="px-4">Thao tác</th>
            </tr>
          </thead>
          {!isLoading && (
            <tbody>
              {data.map((item, index) => {
                return (
                  <tr
                    className=""
                    key={index}>
                    <td className="py-2">{index + 1}</td>
                    <td>{item.fullName}</td>
                    <td>{item.phone}</td>
                    <td>{getDate(item.order.orderAt)}</td>
                    <td>{item.order.status}</td>
                    <td>
                      {item.order.totalBill ? numberWithCommas(item.order.totalBill) : ""}
                    </td>
                    <td>
                      {item.order.status !== "Đang chờ duyệt" ? (
                        <div
                          className={
                            item.order.status === "Đã duyệt"
                              ? "text-green-500 text-[#2f80ed] font-medium px-2"
                              : "text-red-500 text-[#2f80ed] font-medium px-2"
                          }>
                          {item.order.status}
                        </div>
                      ) : (
                        <div>
                          <button
                            className="text-[#2f80ed] font-medium  px-2 text-green-500"
                            onClick={() => handleStatusChange(item._id, "Đã duyệt")}>
                            Duyệt đơn
                          </button>

                          <button
                            className="text-[#2f80ed] font-medium px-2 border-l border-solid border-[#333] text-red-500"
                            onClick={() => handleStatusChange(item._id, "Đã hủy")}>
                            Hủy đơn
                          </button>
                        </div>
                      )}
                    </td>
                    <td>
                      <Link
                        to={`/admin/orders/order-detail/${item._id}`}
                        className="text-[#2f80ed] font-medium px-2">
                        Xem chi tiết
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          )}
        </table>
      </div>
    </div>
  );
};

export default Order;
