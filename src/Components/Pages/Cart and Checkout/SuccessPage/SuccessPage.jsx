import React from "react";
import logo from "../../../../img/Navbar/dancing.png";
import { Link } from "react-router-dom";
const SuccessPage = () => {
  return (
    <div className="mt-12 mx-24 mb-24 border border-solid border-black rounded-2xl bg-[#f8f9fa]">
      <div className="flex flex-col items-center justify-center mt-9 mb-5">
        <p className="font-bold text-3xl text-[#eb5757]">Đặt hàng thành công</p>
        <img src={logo} alt="" className="w-1/4 h-1/4" />
        <Link to="/" className="font-light text-xl p-3 rounded bg-[orange]/70 mt-4">Đến trang chủ</Link>
      </div>
    </div>
  );
};

export default SuccessPage;
