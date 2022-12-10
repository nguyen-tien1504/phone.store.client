import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Heading } from "../Products/getAllProducts";

const Order = () => {
  const [data, setData] = useState([]);
  const [status, setStatus] = useState("Đang chờ duyệt");
  const [load, setLoad] = useState(false);
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
      .get("https://phone-store-server.onrender.com/users")
      .then((res) => {
        const newArr = res.data.users.filter((item) => {
          return item.order.totalBill > 0;
        });
        return newArr;
      })
      .then((data) => setData(data))
      .then(() => setLoad(true))
      .catch((err) => console.log(err));
  }, []);
  const handleStatus = () => {
    if (status == "Đang chờ duyệt") {
      setStatus("Đang giao hàng");
    } else if (status == "Đang giao hàng") {
      setStatus("Giao hàng thành công");
    }
  };
  if (!load) {
    return <>Loading...</>;
  }
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
          <tbody>
            {data.map((item, index) => {
              return (
                <tr className="" key={index}>
                  <td className="py-2">{index + 1}</td>
                  <td>{item.fullName}</td>
                  <td>{item.phone}</td>
                  <td>{getDate(item.order.orderAt)}</td>
                  <td>{status}</td>
                  <td>
                    {item.order.totalBill
                      ? numberWithCommas(item.order.totalBill)
                      : ""}
                  </td>
                  <td>
                    <div>
                      {!(status == "Đã hủy") && (
                        <button
                          className="text-[#2f80ed] font-medium  px-2"
                          onClick={handleStatus}
                        >
                          {status == "Đang chờ duyệt"
                            ? "Duyệt đơn"
                            : status == "Đang giao hàng"
                            ? "Xác nhận thanh toán"
                            : ""}
                        </button>
                      )}
                      {status == "Đang chờ duyệt" && (
                        <button
                          className="text-[#2f80ed] font-medium px-2 border-l border-solid border-[#333]"
                          onClick={() => setStatus("Đã hủy")}
                        >
                          Hủy đơn
                        </button>
                      )}
                    </div>
                  </td>
                  <td>
                    <Link
                      to={`/admin/orders/order-detail/${item._id}`}
                      className="text-[#2f80ed] font-medium px-2"
                    >
                      Xem chi tiết
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Order;
