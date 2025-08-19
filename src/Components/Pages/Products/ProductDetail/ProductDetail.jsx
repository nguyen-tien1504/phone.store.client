import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../../Redux/Action";
const BackButton = () => {
  return (
    <Link
      to="/"
      className="bg-[orange]/70 px-5 py-2 rounded text-base font-normal  flex gap-2 items-center w-fit"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        className="bi bi-reply-fill"
        viewBox="0 0 16 16"
      >
        <path d="M5.921 11.9 1.353 8.62a.719.719 0 0 1 0-1.238L5.921 4.1A.716.716 0 0 1 7 4.719V6c1.5 0 6 0 7 8-2.5-4.5-7-4-7-4v1.281c0 .56-.606.898-1.079.62z" />
      </svg>
      Quay lai
    </Link>
  );
};
const ContentDetail = (props) => {
  const [active, setActive] = useState(false);
  return (
    <>
      <p className="font-bold mt-8 text-2xl">
        Đặc điểm nổi bật của {props.name}
      </p>
      <div className="font-bold mt-1">
        {/* {props.Content[0].Content1[0]} */}
        <p className="mt-2 font-medium">{props.description}</p>
      </div>
      {!active && (
        <div className="relative mt-8">
          <BackButton />
          <button
            className="bg-[orange]/70 px-5 py-2 rounded text-base font-normal flex gap-2 items-center absolute left-1/2 top-0 -translate-x-1/2"
            onClick={() => setActive(!active)}
          >
            Xem them
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-caret-down-fill"
              viewBox="0 0 16 16"
            >
              <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
            </svg>
          </button>
        </div>
      )}
      {active && (
        <div className="mb-4">
          <img src={props.img} alt="" className="w-3/12 h-3/12 mx-auto" />
          <div className="font-bold mt-1">
            {/* {props.description} */}
            <p className="mt-2 font-medium">{props.description}</p>
          </div>
          <div className="relative mt-8">
            <BackButton />
            <button
              className="bg-[orange]/70 px-5 py-2 rounded text-base font-normal flex gap-2 items-center absolute left-1/2 top-0 -translate-x-1/2"
              onClick={() => setActive(!active)}
            >
              Close
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-caret-up-fill"
                viewBox="0 0 16 16"
              >
                <path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
};
const ProductDetail = () => {
  const { productID } = useParams();
  const [isLoaded, setIsLoaded] = useState(false);
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    axios
      .get(`http://localhost:3000/products/${productID}`)
      .then((res) => setData({ ...res.data.product, id: res.data.product._id }))
      .then(() => setIsLoaded(true))
      .catch((err) => console.log(err));
  }, [productID]);
  return (
    <div className="mt-12 mx-16 border border-black border-solid rounded-md p-4">
      <div className="flex gap-8">
        <div className="flex items-center justify-center">
          <div className="flex flex-col items-center justify-end basis-1/2">
            <p className="font-bold text-xl">{data.title}</p>
            <div className="relative">
              <img src={data.thumbnail} alt="" />
              <button className="absolute top-1/2 left-0 -translate-y-2/4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="40"
                  height="40"
                  fill="currentColor"
                  className="bi bi-arrow-left-short"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z"
                  />
                </svg>
              </button>
              <button className="absolute top-1/2 right-0 -translate-y-2/4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="40"
                  height="40"
                  fill="currentColor"
                  className="bi bi-arrow-right-short"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z"
                  />
                </svg>
              </button>
              <button
                onClick={() => dispatch(addToCart(data))}
                className="bg-[#ed1c1c] px-5 py-2 text-white rounded text-base font-normal absolute left-0 top-full"
              >
                Mua Ngay
              </button>
            </div>
          </div>

          <div className="flex flex-col justify-end gap-2 basis-1/2">
            <p className="font-bold text-4xl text-[#eb5757]"></p>
            <p>
              iPhone 12 ra mắt với vai trò mở ra một kỷ nguyên hoàn toàn mới.
              Tốc độ mạng 5G siêu tốc, bộ vi xử lý A14 Bionic nhanh nhất thế
              giới smartphone.
            </p>
          </div>
        </div>
        {isLoaded && (
          <div className=" border border-black border-solid rounded-md w-fit p-4 text-lg tableDetail">
            <p className="text-center font-bold text-2xl ">Thông số kĩ thuật</p>

            <table className="mt-2 w-[400px] border-none ">
              <tbody>
                <tr>
                  <td>Màn hình:</td>
                  <td>{data.specifications.screen}</td>
                </tr>
                <tr>
                  <td>Camera sau:</td>
                  <td>{data.specifications.backCamera}</td>
                </tr>
                <tr>
                  <td>Camera selfie:</td>
                  <td>{data.specifications.selfieCamera}</td>
                </tr>
                <tr>
                  <td>Ram:</td>
                  <td>{data.specifications.RAM}</td>
                </tr>
                <tr>
                  <td>Bộ nhớ trong:</td>
                  <td>{data.specifications.internalMemory}</td>
                </tr>
                <tr>
                  <td>CPU:</td>
                  <td>{data.specifications.CPU}</td>
                </tr>
                <tr>
                  <td>Dung lượng pin:</td>
                  <td>{data.specifications.batteryCapacity}</td>
                </tr>
                <tr>
                  <td>Thẻ sim:</td>
                  <td>{data.specifications.SIM}</td>
                </tr>
                <tr>
                  <td>Hệ điều hành:</td>
                  <td>{data.specifications.operatingSystem}</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div>
        <ContentDetail description={data.description} name={data.title} />
      </div>
    </div>
  );
};

export default ProductDetail;
