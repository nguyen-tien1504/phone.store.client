import React, { useEffect, useState } from "react";
import logo from "../../../img/Navbar/login.png";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
const Login = () => {
  const [message, setMessage] = useState();
  const navigate = useNavigate();
  const emailRegExp =
    /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  const schema = yup.object().shape({
    email: yup
      .string()
      .email("Vui lòng nhập đúng định dạng email.")
      .required("Vui lòng nhập email.")
      .matches(emailRegExp, "Vui lòng nhập đúng định dạng email."),
    password: yup.string().required("Vui lòng nhập mật khẩu."),
    // email: yup
    //   .string()
    //   .required("Vui lòng nhập số điện thoại.")
    //   .matches(emailRegExp, "Vui lòng nhập đúng định dạng số điện thoại."),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm({ resolver: yupResolver(schema), mode: "onChange" });
  function handleLogin() {
    const data = getValues();
    // console.log(data);
    // axios
    //   .post("https://phonestoreserver.herokuapp.com/users/login", data)
    //   .then((res) => {
    //     if (res.data.user.admin) {
    //       navigate("/admin/products");
    //     } else if (typeof res.data == "object") {
    //       setMessage(false);
    //       window.localStorage.setItem("user", JSON.stringify(res.data));
    //       navigate("/");
    //     } else {
    //       setMessage(res.data);
    //     }
    //   })
    //   .catch((err) => console.log(err));
    axios
      .post("https://phonestoreserver.herokuapp.com/users/login", data)
      .then((res) => {
        if (res.data.admin) {
          navigate("/admin/products");
        } else if (typeof res.data == "object") {
          setMessage(false);
          window.localStorage.setItem("user", JSON.stringify(res.data));
          navigate("/");
        } else {
          setMessage(res.data);
        }
      })
      .catch((err) => console.log(err));
  }
  return (
    <div className="w-screen h-screen pr-64 relative after:content-[''] after:w-[95%] after:h-full after:bg-[orange]/70 after:absolute after:top-0 after:-left-1/2 after:rounded-full after:-z-10">
      <div className="flex items-center justify-center w-full h-full">
        <div className="flex flex-col items-center gap-4">
          <img src={logo} alt="" className="w-1/4" />
          <p className="w-1/2 font-bold text-xl text-[#4f4f4f]">
            Hi there, do you have money? Tell me how much, i will give you
            things you need
          </p>
          <Link
            to="/"
            className="flex items-center gap-2 justify-start w-1/2 mt-16"
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
            <p className="text-[#4f4f4f] font-bold">Trang chủ</p>
          </Link>
        </div>
        <div className="bg-[orange]/70 py-10 px-9 rounded">
          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit(handleLogin)}
          >
            <input
              type="text"
              placeholder="Email"
              className="pl-3 py-1 rounded bg-slate-100"
              {...register("email")}
            />
            {errors.email && (
              <span className="text-base">{errors.email.message}</span>
            )}
            <input
              type="password"
              placeholder="Mật khẩu"
              className="pl-3 py-1 rounded bg-slate-100"
              name="password"
              {...register("password")}
            />
            {errors.password && (
              <span className="text-base">{errors.password.message}</span>
            )}
            {message && <span className="text-base">{message}</span>}
            <button
              type="submit"
              className="bg-slate-100 rounded-full py-1 w-3/4 mx-auto"
            >
              Đăng nhập
            </button>
          </form>

          <div className="mt-14 flex flex-col gap-1">
            <a href="" className="underline">
              Bạn quên mật khẩu?
            </a>
            <Link to="/signin">
              Bạn chưa có mật khẩu?
              <span className="underline text-[#333]">Đăng ký</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
