import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Heading } from "../Products/getAllProducts";
import { useAllUserCart } from "../../Query/query";

const OrderDetail = () => {
  const { userID } = useParams();
  const [cart, setCart] = useState({});
  function getDate(x) {
    return new Date(x).toISOString().replace(/T.*/, "").split("-").reverse().join("/");
  }
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }
  const { data, isLoading } = useAllUserCart(userID);
  console.log(data);
    
  return (
    <div className="h-screen">
      <Heading name={"Chi tiết đơn hàng"} />
      {!isLoading && (
        <>
          <div className="mt-4 flex flex-col gap-4">
            <div>
              <p className="text-xl">
                <span className="font-bold">Tên khách hàng:</span> {data.fullName}
              </p>
              <p className="text-xl">
                <span className="font-bold">Điện thoại:</span> {data.phone}
              </p>

              <p className="text-xl">
                <span className="font-bold">Địa chỉ giao hàng:</span> {data.order.addressDelivery}
              </p>
            </div>
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
                      <td>{numberWithCommas(item.price)}</td>
                      <td>{numberWithCommas(item.quantity * item.price)}</td>
                    </tr>
                  );
                })}
                <tr>
                  <td
                    colSpan={5}
                    className="text-right pr-36 text-[#ed1c1c]">
                    Tổng cộng: {numberWithCommas(data.order.totalBill)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default OrderDetail;
