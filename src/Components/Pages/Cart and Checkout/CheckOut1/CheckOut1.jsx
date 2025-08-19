import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useForm } from "react-hook-form";
import { deleteCart } from "./../../../../Redux/Action";

const CheckOut1 = () => {
  const data = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const totalBill = useSelector((state) => state.totalBill);
  const userData = JSON.parse(window.localStorage.getItem("user"));
  console.log(userData);
  if (!userData) {
    return useEffect(() => {
      navigate("/login");
    },[]);
  }
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }
  const order = {
    cart: [...data],
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();
  const handleOrder = () => {
    const addressDelivery = getValues().addressDelivery;
    axios
      .put(`http://localhost:3000/users/${userData._id}`, {
        order: { ...order, addressDelivery: addressDelivery },
      })
      .then(() => navigate("/successpage"))
      .then(() => {
        dispatch(deleteCart());
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="mt-12 mx-24 mb-24">
      <p className="text-center font-bold text-3xl">
        Có {data.length} sản phẩm trong giỏ hàng
      </p>
      <form
        className="mt-4 border border-solid border-black rounded-2xl p-6 bg-[#f8f9fa]"
        onSubmit={handleSubmit(handleOrder)}
      >
        <div className=" flex gap-12">
          <div className="basis-1/2">
            <div className="flex flex-col gap-1">
              <p className="font-bold text-xl">Thông tin khách hàng:</p>
              <p>
                <span className="font-bold">Họ và tên: </span>
                {userData.fullName}
              </p>
              <p>
                <span className="font-bold">Email: </span>
                {userData.email}
              </p>
              <p>
                <span className="font-bold">Điện thoại: </span>
                {userData.phone}
              </p>
            </div>
            <form action="" className="flex flex-col mt-3 gap-1">
              <p className="font-bold text-xl">Địa chỉ giao hàng</p>
              {/* <label htmlFor="defaultAddress">
                <input
                  type="radio"
                  id="defaultAddress"
                  name="address"
                  className="mr-3"
                  checked
                />
                Địa chỉ mặc định
              </label> */}
              <input
                type="text"
                name="address"
                className="bg-gray-200 p-2 rounded"
                defaultValue={userData.address}
                {...register("addressDelivery")}
              />

              {/* <label htmlFor="anotherAddress" className="pr-5">
                <input
                  type="radio"
                  id="anotherAddress"
                  name="address"
                  className="mr-3"
                />
                Địa chỉ khác
              </label> */}
              {/* <input
                type="text"
                placeholder="Nhập địa chỉ khác"
                name="address"
                className="bg-gray-200 p-2 rounded"
                {...register("addressDelivery")}
              /> */}
              <p className="font-normal text-lg italic">
                <span className="font-bold text-xl not-italic">
                  Hình thức thanh toán:
                </span>{" "}
                Chỉ hổ trợ trả tiền mặt khi nhận hàng
              </p>
            </form>
          </div>
          <div className="basis-1/2 text-center">
            <table className="w-full">
              <tr>
                <th></th>
                <th className="text-lg font-bold">Tên sản phẩm</th>
                <th className="text-lg font-bold">Số lượng</th>
                <th className="text-lg font-bold">Giá</th>
              </tr>

              {data.map((item) => {
                return (
                  <tr>
                    <td>
                      <div className="flex items-center justify-center py-2">
                        <img
                          src={item.thumbnail}
                          alt=""
                          className="w-20 h-20"
                        />
                      </div>
                    </td>
                    <td>
                      <div>
                        <p>{item.title}</p>
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center justify-center">
                        <p>{item.quantity}</p>
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center justify-center px-4">
                        <p>{numberWithCommas(item.price * item.quantity)}</p>
                      </div>
                    </td>
                  </tr>
                );
              })}

              <tr>
                <td
                  colSpan="4"
                  className="text-right font-bold py-1 pr-2 text-[#eb5757]"
                >
                  <span className="text-black">Cần thanh toán: </span>
                  {numberWithCommas(totalBill)}
                </td>
              </tr>
            </table>
            <Link
              to="/cart-shopping"
              className="flex items-center gap-1 p-2 bg-[orange]/70 rounded-md w-fit mt-4 float-right"
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
              <p>Sửa đổi</p>
            </Link>
          </div>
        </div>
        <div className="mt-10 text-center">
          <button
            type="submit"
            className="bg-[#ed1c1c] text-white p-3 uppercase font-bold text-xl leading-7 rounded-md"
          >
            Hoàn tất đặt hàng
          </button>
        </div>
      </form>
    </div>
  );
};

export default CheckOut1;
