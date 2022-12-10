import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const User = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [cart, setCart] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [message, setMessage] = useState();
  const [show, setShow] = useState(false);
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }
  function getDate(x) {
    return new Date(x)
      .toISOString()
      .replace(/T.*/, "")
      .split("-")
      .reverse()
      .join("/");
  }
  useEffect(() => {
    axios
      .get(`https://phonestoreserver.herokuapp.com/users/${user._id}`)
      .then((res) => {
        setCart(res.data.user.order);
      })
      .then(() => setLoaded(true))
      .catch((err) => console.log(err));
  }, []);
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
  } = useForm();

  const handleChange = () => {
    const value = getValues();
    if (!value.oldPassword) {
      return setMessage("Vui lòng nhập mật khẩu");
    }
    axios
      .put(`http://localhost:3000/users/updateUser/${user._id}`, value)
      .then((res) => setMessage(res.data))
      .catch((err) => console.log(err));
  };
  if (!loaded) {
    return <>Loading</>;
  }
  return (
    <div className="mt-12 mx-16 border border-black border-solid rounded-md p-4 flex px-28 bg-[#f8f9fa] relative h-screen">
      <div className="flex flex-col gap-2 basis-1/3">
        <p className="font-bold text-2xl mb-10">Thông tin khách hàng</p>
        <p className="text-xl">
          <span className="font-bold">Tên đăng nhập:</span> {user.userName}
        </p>
        <p className="text-xl">
          <span className="font-bold">Họ và tên:</span> {user.fullName}
        </p>
        <p className="text-xl">
          <span className="font-bold">Email:</span> {user.email}
        </p>
        <p className="text-xl">
          <span className="font-bold">Điện thoại:</span> {user.phone}
        </p>
        <p className="text-xl">
          <span className="font-bold">Địa chỉ:</span> {user.address}
        </p>
        <div className="flex gap-3 mt-2">
          <button
            className="bg-[#c4c4c4] rounded p-2 font-semibold text-lg"
            onClick={() => setShow(!show)}
          >
            Đổi mật khẩu
          </button>
          <button className="bg-[orange]/70 rounded p-2 font-semibold text-lg">
            Cập nhật thông tin
          </button>
        </div>
      </div>
      <div className="basis-2/3">
        <p className="font-bold text-2xl mb-12">Lịch sử mua hàng</p>
        <div>
          <table className="w-full text-center ">
            <thead>
              <tr>
                <td>ID</td>
                <td>Ngày đặt</td>
                <td>Trạng thái</td>
                <td>Giá trị đơn hàng</td>
                <td>Thao tác</td>
              </tr>
            </thead>
            <tbody>
              {/* {cart.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td className="text-left pl-2">{cart.orderAt}</td>
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
              </tr> */}
              <tr>
                <td>1</td>
                <td>
                  <div>{getDate(cart.orderAt)}</div>
                </td>
                <td>ddang duyet</td>
                <td>
                  {cart.totalBill
                    ? numberWithCommas(cart.totalBill)
                    : cart.totalBill}
                </td>
                <td>
                  <Link
                    to={"/user-detail/order-detail"}
                    className="text-[#2f80ed] font-medium px-2"
                  >
                    Xem chi tiet
                  </Link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex items-center absolute top-[85%] left-28">
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
          <p>Quay lại</p>
        </Link>
      </div>
      {show && (
        <div className="absolute top-1/2 left-1/2 rounded-md -translate-x-1/2 -translate-y-1/2 w-1/2 h-1/2 bg-black/60 flex items-center justify-center">
          <form onSubmit={handleSubmit(handleChange)}>
            <div className="flex flex-col gap-3">
              <label htmlFor="" className="flex flex-col gap-2">
                Mật khẩu cũ
                <input
                  type="password"
                  placeholder="Mật khẩu cũ"
                  className="rounded pl-2 "
                  {...register("oldPassword")}
                />
              </label>
              <label htmlFor="" className="flex flex-col gap-2">
                Mật khẩu mới
                <input
                  type="password"
                  placeholder="Mật khẩu mới"
                  className="rounded pl-2 "
                  {...register("newPassword")}
                />
              </label>
              {typeof message == "string"
                ? message
                : typeof message == "object"
                ? "Đổi mật khẩu thành công"
                : ""}
              <div className="flex justify-center gap-4">
                <button
                  type="submit"
                  className="bg-[orange]/70 w-fit py-2 px-4 rounded-md"
                >
                  Cập nhật
                </button>
                <button
                  onClick={() => setShow(!show)}
                  className="bg-[orange]/70 w-fit py-2 px-4 rounded-md"
                >
                  Đóng
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default User;
