import { Link } from "react-router-dom";
import { useCategories, useDeleteCategory } from "../../Query/query";
import ReactPaginate from "react-paginate";

export const Heading = (props) => {
  return (
    <>
      <p className="font-bold text-2xl">{props.name}</p>
      <div className="text-xl bg-[#56ccf2] py-2 pl-4 w-1/2 mt-3">
        Trang chủ / {props.name}
      </div>
    </>
  );
};

const Category = () => {
  const { data, isLoading } = useCategories();
  const { mutate } = useDeleteCategory();
  const handleDelete = (id) => {
    mutate(id);
  };
  return (
    <div>
      <Heading name="Danh mục" />
      <div className="flex mt-3">
        <Link
          to="/admin/create-category"
          className="bg-[#6fcf97] p-3 text-xl rounded">
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
              viewBox="0 0 16 16">
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
            </svg>
          </button>
        </div>
        <button className="bg-[#333] p-3 text-xl text-white rounded ml-5">Đặt lại</button>
      </div>
      <div className="mt-5">
        <table className="w-full text-center">
          <thead>
            <tr>
              <th>ID</th>
              <th>Tên</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {!isLoading &&
              data.map((item, index) => {
                return (
                  <tr key={index}>
                    <td className="w-2/5">{item._id}</td>
                    <td>{item.name}</td>
                    <td className="w-1/5">
                      <Link
                        to={`/admin/create-category`}
                        state={{ category: item }}
                        className="text-blue-500">
                        Sửa
                      </Link>
                      <span className="mx-2">|</span>
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="text-[#2f80ed] font-medium text-red-500">
                        Xóa
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center mt-5">
        {/* <ReactPaginate
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
        /> */}
      </div>
    </div>
  );
};

export default Category;
