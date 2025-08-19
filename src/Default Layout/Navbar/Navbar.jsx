import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import banner from "../../img/Navbar/navbarbanner.png";
import { useDispatch, useSelector } from "react-redux";
import { searchQuery } from "./../../Redux/Action";
import { useQuery } from "react-query";
import { useCategories } from "../../Query/query";
import { useEffect } from "react";
const NavbarLink = (props) => {
  const { name, _id } = props.cate;

  return (
    <li className="uppercase">
      <Link
        to={{ pathname: "/products" }}
        state={{ categoryName: name, categoryId: _id }}>
        {name}
      </Link>
    </li>
  );
};
const Navbar = () => {
  const navigate = useNavigate();
  const cartData = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  function handleUser() {
    window.localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  }
  const handleSearch = (search) => {
    dispatch(searchQuery(search));
  };
  const { data, isLoading } = useCategories();

  return (
    <div>
      <div className="bg-[#333333] flex items-center place-content-between">
        <div className="flex items-center">
          <Link to="/">
            <img
              src={banner}
              alt="Navbar banner"
              className="w-fit h-fit"
            />
          </Link>
          <div className="flex items-center	gap-x-1.5">
            <input
              type="text"
              placeholder="Nhập thứ cần tìm"
              className="w-[400px] h-10 rounded-md pl-3"
              onChange={(e) => handleSearch(e.target.value)}
            />
            <button
              className="bg-[orange] p-2 rounded-md"
              onClick={handleSearch}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#000000"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round">
                <circle
                  cx="11"
                  cy="11"
                  r="8"></circle>
                <line
                  x1="21"
                  y1="21"
                  x2="16.65"
                  y2="16.65"></line>
              </svg>
            </button>
          </div>
        </div>

        <div className="flex items-center relative gap-x-9 mr-10">
          {user ? (
            <button
              className="text-white"
              onClick={() => setShow(!show)}>
              Xin chào {user.fullName}
            </button>
          ) : (
            <Link
              to="/login"
              className="text-white">
              Đăng nhập
            </Link>
          )}
          {show && user ? (
            <div className="bg-slate-200 flex flex-col gap-1 items-start p-2 text-base rounded absolute top-full left-0">
              <Link
                to="/user-detail"
                onClick={() => setShow(!show)}>
                Thông tin khách hàng
              </Link>
              <button onClick={handleUser}>Đăng xuất</button>
            </div>
          ) : null}
          <Link
            to="/cart-shopping"
            className="text-white realative">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#fff"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round">
              <path d="M6 2L3 6v14c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2V6l-3-4H6zM3.8 6h16.4M16 10a4 4 0 1 1-8 0" />
            </svg>
            <div className="absolute h-5 w-5 -top-2 left-full bg-[orange] rounded-[50%] flex items-center justify-center ">
              <span>{cartData.length}</span>
            </div>
          </Link>
        </div>
      </div>

      <div className="bg-[orange]/70">
        <ul className="flex gap-x-4 items-center justify-center">
          <li className="uppercase">
            <Link
              to={{ pathname: "/products" }}
              state={{ categoryName: "Tất cả" }}>
              Tất cả
            </Link>
          </li>
          {!isLoading && data.map((item) => <NavbarLink cate={item} />)}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
