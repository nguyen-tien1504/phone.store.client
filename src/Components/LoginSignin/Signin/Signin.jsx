import React, { useEffect, useState } from "react";
import logo from "../../../img/Navbar/login.png";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";

const Signin = () => {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const emailRegExp =
    /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  const phoneRegExp = /((09|03|07|08|05)+([0-9]{8})\b)/g;
  const schema = yup.object().shape({
    fullName: yup.string().required("Vui long nhap ho va ten"),
    email: yup
      .string()
      .required("Vui long nhap email")
      .matches(emailRegExp, "Vui long nhap dung dinh dang email."),
    phone: yup
      .string()
      .required("Vui long nhap so dien thoai")
      .matches(phoneRegExp, "Vui long nhap dung dinh dang"),
    userName: yup.string().required("Vui long nhap User Name"),
    password: yup.string().required("Vui long nhap mat khau"),
    address: yup.string().required("Vui long nhap dia chi"),
    confirmpassword: yup
      .string()
      .required("Vui long nhap lai mat khau")
      .oneOf([yup.ref("password"), null], "Passwords must match"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm({ resolver: yupResolver(schema), mode: "onChange" });
  function handleSignin() {
    // const {fullName,email,phone,userName,password,address} = getValues();
    // const dataReq = {
    //   fullName: fullName,
    //   email: email,
    //   phone: phone,
    //   userName: userName,
    //   password: password,
    //   address: address,
    // };
    const {confirmpassword,...rest} = getValues();
    axios
      .post("http://localhost:3000/users/signin", rest)
      .then((res) => {
        if (res.data === "Tạo tài khoản thành công") {
          alert(res.data);
          navigate("/login");
        }
        setMessage(res.data);
      })
      .catch((err) => console.log(err));
    if (message == "Tạo tài khoản thành công") {
      alert(message);
      navigate("/login");
    }
  }
  return (
    <div className="w-screen h-screen bg-[orange]/70 flex items-center justify-center">
      <div className="pl-8">
        <img src={logo} alt="" className="w-2/5" />
        <p className="w-3/5">
          Đăng ký ngay để nhận được nhiều khuyến mãi đặc biệt
        </p>
      </div>
      <div className="w-[400px]">
        <form
          className="flex flex-col gap-2 bg-[#333] py-5 px-10 rounded-md"
          onSubmit={handleSubmit(handleSignin)}
        >
          <p className="text-white text-center font-bold text-2xl">
            Tạo tài khoản
          </p>
          <div className="flex flex-col">
            <input
              type="text"
              placeholder="Nhập họ và tên"
              className="pl-6 text-lg rounded"
              {...register("fullName")}
            />
            {errors.username && (
              <span className="text-lg text-white mt-1">
                {errors.username.message}
              </span>
            )}
          </div>
          <div className="flex flex-col">
            <input
              type="text"
              placeholder="Email"
              className="pl-6 text-lg rounded"
              {...register("email")}
            />
            {errors.email && (
              <span className="text-lg text-white mt-1">
                {errors.email.message}
              </span>
            )}
          </div>
          <div className="flex flex-col">
            <input
              type="text"
              placeholder="Số điện thoại"
              className="pl-6 text-lg rounded"
              {...register("phone")}
            />
            {errors.phone && (
              <span className="text-lg text-white mt-1">
                {errors.phone.message}
              </span>
            )}
          </div>
          <div className="flex flex-col">
            <input
              type="text"
              placeholder="Tên đăng nhập"
              className="pl-6 text-lg rounded"
              {...register("userName")}
            />
            {errors.name && (
              <span className="text-lg text-white mt-1">
                {errors.name.message}
              </span>
            )}
          </div>
          <div className="flex flex-col">
            <input
              type="text"
              placeholder="Địa chỉ"
              className="pl-6 text-lg rounded"
              {...register("address")}
            />
            {errors.name && (
              <span className="text-lg text-white mt-1">
                {errors.name.message}
              </span>
            )}
          </div>
          <div className="flex flex-col">
            <input
              type="password"
              placeholder="Mật khẩu"
              className="pl-6 text-lg rounded"
              {...register("password")}
            />
            {errors.password && (
              <span className="text-lg text-white mt-1">
                {errors.password.message}
              </span>
            )}
          </div>
          <div className="flex flex-col">
            <input
              type="password"
              placeholder="Xác nhận mật khẩu"
              className="pl-6 text-lg rounded"
              {...register("confirmpassword")}
            />
            {errors.confirmpassword && (
              <span className="text-lg text-white mt-1">
                {errors.confirmpassword.message}
              </span>
            )}
            {message && (
              <span className="text-lg text-white mt-1">{message}</span>
            )}
          </div>
          <div className="flex justify-between mt-2">
            <Link
              to="/login"
              className="bg-[orange]/100 py-1 px-5 rounded-full"
            >
              Quay lại
            </Link>
            <button
              type="submit"
              className="bg-[orange]/100 py-1 px-5 rounded-full"
            >
              Đăng kí
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signin;
