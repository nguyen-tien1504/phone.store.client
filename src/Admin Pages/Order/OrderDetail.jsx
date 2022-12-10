import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Heading } from "../Products/getAllProducts";

const OrderDetail = () => {
  const { userID } = useParams();
  const [data, setData] = useState([]);
  const [cart, setCart] = useState({});
  const [loaded, setLoaded] = useState(false);
  function getDate(x) {
    return new Date(x)
      .toISOString()
      .replace(/T.*/, "")
      .split("-")
      .reverse()
      .join("/");
  }
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }
  useEffect(() => {
    axios
      .get(`https://phonestoreserver.herokuapp.com/users/${userID}`)
      .then((res) => {
        setData(res.data.user);
        setCart(res.data.user.order);
      })
      .then(() => setLoaded(true))
      .catch((err) => console.log(err));
  }, [userID]);
  console.log(cart.cart);
  if (loaded) {
    return (
      <div className="h-screen">
        <Heading name={"Chi tiết đơn hàng"} />
        <div className="mt-4 flex flex-col gap-4">
          <div>
            <p className="text-xl">
              <span className="font-bold">Tên khách hàng:</span> {data.fullName}
            </p>
            <p className="text-xl">
              <span className="font-bold">Điện thoại:</span> {data.phone}
            </p>

            <p className="text-xl">
              <span className="font-bold">Địa chỉ:</span> {cart.addressDelivery}
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
              {cart.cart.map((item, index) => {
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
                <td colSpan={5} className="text-right pr-36 text-[#ed1c1c]">
                  Tổng cộng: {numberWithCommas(cart.totalBill)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
};

export default OrderDetail;
