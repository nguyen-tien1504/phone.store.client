import React, { useState } from "react";
import banner from "../../../img/Home/home banner.jpg";
import Footer from "../../../Default Layout/Footer/Footer";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "./../../../Redux/Action";
import { useQuery } from "react-query";
import HomeLoading from "./HomeLoading";
export const HomeProduct = (props) => {
  const dispatch = useDispatch();

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }
  return (
    <div className={`border-solid border-[1px] border-black rounded-2xl mt-4`}>
      <div className="my-2.5 flex flex-col items-center gap-2">
        <img src={props.thumbnail} alt="" className="w-32 h-32" />
        <p className="font-bold text-lg leading-5 text-center h-[40px]">
          {props.title}
        </p>
        <p className="font-normal text-medium leading-4">
          {numberWithCommas(props.price)}$
        </p>
        <div className="flex gap-3">
          <Link
            to={`/product/${props.id}`}
            className="flex items-center gap-1 bg-[#c4c4c4] rounded-md p-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#000"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              <line x1="11" y1="8" x2="11" y2="14"></line>
              <line x1="8" y1="11" x2="14" y2="11"></line>
            </svg>
            <p>Chi tiết</p>
          </Link>
          <button
            className="flex items-center gap-1 bg-[#c4c4c4] rounded-md p-2"
            onClick={() => dispatch(addToCart(props))}
          >
            <p>Thêm vào</p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#000"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="10" cy="20.5" r="1" />
              <circle cx="18" cy="20.5" r="1" />
              <path d="M2.5 2.5h3l2.7 12.4a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.6l1.6-8.4H7.1" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};
const Home = () => {
  // const [data, setData] = useState([]);
  // useEffect(() => {
  //   axios
  //     .get(
  //       "https://phone-store-server.onrender.com/products"
  //     )
  //     .then((res) => setData(res.data.product));
  // }, []);
  const [initData, setInitData] = useState([]);
  const dataSearched = useSelector((state) => state.searchQuery);
  const { isLoading, data } = useQuery("all Products", async () => {
    const dataRes = await axios
      .get("https://phone-store-server.onrender.com/products")
      .then((res) => res.data.product);
    setInitData(dataRes);
    return dataRes;
  });
  useEffect(() => {
    if (dataSearched) {
      const find = initData.filter((item) => {
        return (
          item.title.toLowerCase().indexOf(dataSearched.toLowerCase()) !== -1
        );
      });
      setInitData(find);
    } else {
      setInitData(data);
    }
  }, [dataSearched]);
  return (
    <div>
      <div className="mt-12 mx-16">
        <div>
          <img src={banner} alt="Home banner" className="h-80 " />
        </div>
        <div className="mt-10 border-solid	border-[1px] border-black rounded-2xl px-11 py-7">
          <div className="flex items-center gap-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="35"
              height="35"
              fill="currentColor"
              className="bi bi-fire"
              viewBox="0 0 16 16"
            >
              <path d="M8 16c3.314 0 6-2 6-5.5 0-1.5-.5-4-2.5-6 .25 1.5-1.25 2-1.25 2C11 4 9 .5 6 0c.357 2 .5 4-2 6-1.25 1-2 2.729-2 4.5C2 14 4.686 16 8 16Zm0-1c-1.657 0-3-1-3-2.75 0-.75.25-2 1.25-3C6.125 10 7 10.5 7 10.5c-.375-1.25.5-3.25 2-3.5-.179 1-.25 2 1 3 .625.5 1 1.364 1 2.25C11 14 9.657 15 8 15Z" />
            </svg>
            <p className="font-bold text-2xl text-[#eb5757]">
              Điện thoại nổi bật
            </p>
          </div>
          <div className="grid grid-cols-4 gap-x-3">
            {isLoading ? (
              <div className="mt-4">
                <HomeLoading />
              </div>
            ) : (
              initData?.map((item) => {
                return (
                  <HomeProduct
                    title={item.title}
                    price={item.price}
                    thumbnail={item.thumbnail}
                    key={item._id}
                    id={item._id}
                  />
                );
              })
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Home;
