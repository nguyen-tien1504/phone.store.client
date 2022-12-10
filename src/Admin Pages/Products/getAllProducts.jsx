import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import ReactPaginate from "react-paginate";
import "./Paginate.css";
const ProductsTable = (props) => {
  const navigate = useNavigate();
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }
  const handleDelete = (id) => {
    axios
      .delete(`https://phonestoreserver.herokuapp.com/products/${id}`)
      .then(() => navigate(0))
      .catch((err) => console.log(err));
  };
  return (
    <tr className="w-fit">
      <td>
        <span>{props.orderNumber}</span>
      </td>
      <td>
        <div className="flex justify-center">
          <img src={props.thumbnail} alt="" className="w-16 h-16" />
        </div>
      </td>
      <td className="w-[280px]">
        <div>{props.title}</div>
      </td>
      <td>
        <div>{numberWithCommas(props.price)}</div>
      </td>
      <td>
        <div>{props.quantity}</div>
      </td>
      <td>
        <div className="flex gap-2 justify-center">
          <Link className="text-[#2f80ed] font-medium">Xem</Link>
          <Link
            to={{ pathname: "/admin/update-product" }}
            state={{ id: props.id }}
            className="text-[#2f80ed] font-medium border-l border-r border-solid border-[#333] px-2"
          >
            Cập nhật
          </Link>
          <button
            onClick={() => handleDelete(props.id)}
            className="text-[#2f80ed] font-medium"
          >
            Xóa
          </button>
        </div>
      </td>
    </tr>
  );
};
export const Heading = (props) => {
  return (
    <>
      <p className="font-bold text-2xl">{props.name}</p>
      <div className="text-xl bg-[#56ccf2] py-2 pl-4 w-1/2 mt-3">
        Trang chủ /{" "}
        {props.name == "Danh sách sản phẩm" ? "Sản phẩm" : props.name}
      </div>
    </>
  );
};
const GetAllProducts = () => {
  const [offset, setOffset] = useState(1);
  const [data, setData] = useState([]);
  const [perPage] = useState(3);
  const [pageCount, setPageCount] = useState(0);
  const [count, setCount] = useState(0);
  const getData = async () => {
    const res = await axios.get(
      `https://phonestoreserver.herokuapp.com/products/`
    );
    const data = res.data.product;
    const slice = data.slice(offset - 1, offset - 1 + perPage);
    setData(slice);
    setPageCount(Math.ceil(data.length / perPage));
    setCount(offset - 1);
  };
  const handlePageClick = (e) => {
    const selectedPage = e.selected * perPage + 1;
    setOffset(selectedPage);
  };

  useEffect(() => {
    getData();
  }, [offset]);
  return (
    <div>
      <Heading name="Danh sách sản phẩm" />
      <div className="flex mt-3">
        <Link
          to="/admin/create-product"
          className="bg-[#6fcf97] p-3 text-xl rounded"
        >
          Tạo mới
        </Link>
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Tìm kiếm"
            className="pl-2 ml-14 w-[300px] rounded h-10"
          />
          <button className="bg-[#2f80ed] p-1 rounded ml-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              fill="#fff"
              className="bi bi-search  "
              viewBox="0 0 16 16"
            >
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
            </svg>
          </button>
        </div>
        <button className="bg-[#333] p-3 text-xl text-white rounded ml-5">
          Đặt lại
        </button>
      </div>
      <div className="mt-5">
        <table className="w-full text-center">
          <thead>
            <tr>
              <th>ID</th>
              <th>Hình ảnh</th>
              <th>Tên</th>
              <th>Giá</th>
              <th>Số lượng</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => {
              return (
                <ProductsTable
                  thumbnail={item.thumbnail}
                  title={item.title}
                  price={item.price}
                  orderNumber={index + 1 + count}
                  id={item._id}
                  key={index}
                  quantity={item.quantity}
                />
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center mt-5">
        <ReactPaginate
          previousLabel={"Trước"}
          nextLabel={"Sau"}
          breakLabel={"..."}
          breakClassName={"break-me"}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          subContainerClassName={"pages pagination"}
          activeClassName={"active"}
        />
      </div>
    </div>
  );
};

export default GetAllProducts;
