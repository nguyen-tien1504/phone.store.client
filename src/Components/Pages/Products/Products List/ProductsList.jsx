import { HomeProduct } from "../../Home/Home";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import { useProducts } from "../../../../Query/query";

const ProductsList = () => {
  const location = useLocation();
  const { categoryName, categoryId } = location.state;
  const [data2, setData2] = useState([]);
  const dataSearched = useSelector((state) => state.searchQuery);
  const { isLoading, data } = useProducts(categoryName);
  const [isFilter, setIsFilter] = useState(false);
  useEffect(() => {
    if (dataSearched) {
      const find = data.filter(
        (item) => item.title.toLowerCase().indexOf(dataSearched.toLowerCase()) !== -1
      );
      setData2(find);
      setIsFilter(false);
    }
  }, [dataSearched]);

  const handleFilter = (e) => {
    const option = e.target.value;
    setIsFilter(true);
    switch (option) {
      case "option1":
        var dataFilter = data.filter((item) => item.price < 2000000);
        setData2(dataFilter);
        break;
      case "option2":
        var dataFilter = data.filter(
          (item) => item.price >= 2000000 && item.price < 4000000
        );
        setData2(dataFilter);
        break;
      case "option3":
        var dataFilter = data.filter(
          (item) => item.price >= 4000000 && item.price < 7000000
        );
        setData2(dataFilter);
        break;
      case "option4":
        var dataFilter = data.filter(
          (item) => item.price >= 7000000 && item.price < 15000000
        );
        setData2(dataFilter);
        break;
      case "option5":
        var dataFilter = data.filter((item) => item.price >= 15000000);
        setData2(dataFilter);
        break;
      default:
        setIsFilter(false);
        setData2(data);
    }
  };
  return (
    <>
      <div className="mt-12 mx-16 flex gap-10">
        <div className="basis-1/5">
          <p>Mức giá</p>
          <div className="flex flex-col ml-3 gap-5 mt-5">
            <label htmlFor="">
              Tất cả
              <input
                type="radio"
                className="ml-2"
                defaultChecked
                name="price"
                value={"All"}
                onClick={handleFilter}
              />
            </label>
            <label htmlFor="">
              Dưới 2 triệu
              <input
                type="radio"
                className="ml-2"
                name="price"
                onClick={handleFilter}
                value={"option1"}
              />
            </label>
            <label htmlFor="">
              Từ 2 đến 4 triệu
              <input
                type="radio"
                className="ml-2"
                name="price"
                onClick={handleFilter}
                value={"option2"}
              />
            </label>
            <label htmlFor="">
              Từ 4 đến 7 triệu
              <input
                type="radio"
                className="ml-2"
                name="price"
                onClick={handleFilter}
                value={"option3"}
              />
            </label>
            <label htmlFor="">
              Từ 7 đến 15 triệu
              <input
                type="radio"
                className="ml-2"
                name="price"
                onClick={handleFilter}
                value={"option4"}
              />
            </label>
            <label htmlFor="">
              Trên 15 triệu
              <input
                type="radio"
                className="ml-2"
                name="price"
                onClick={handleFilter}
                value={"option5"}
              />
            </label>
          </div>
        </div>

        <div className="border-[1px] border-solid border-black basis-4/5 p-7">
          <div className="">
            <div className="flex gap-1">
              <p className="font-bold text-2xl uppercase">
                {dataSearched ? "Tất cả" : categoryName}
              </p>
              <p>
                ({!isLoading && (dataSearched || isFilter ? data2 : data).length} sản
                phẩm)
              </p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-x-4">
            {!isLoading &&
              (dataSearched || isFilter ? data2 : data).map((item) => {
                return (
                  <HomeProduct
                    width="full"
                    title={item.title}
                    price={item.price}
                    thumbnail={item.thumbnail}
                    key={item._id}
                    id={item._id}
                  />
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductsList;
