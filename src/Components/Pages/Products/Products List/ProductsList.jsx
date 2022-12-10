import { HomeProduct } from "../../Home/Home";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";

const ProductsList = () => {
  const location = useLocation();
  const brand = location.state.name;
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState();
  const [loaded, setLoaded] = useState(false);
  const dataSearched = useSelector((state) => state.searchQuery);
  const { data, isLoading, isFetching } = useQuery(
    "all Products"
    // () => {
    //   if (!data) {
    //     axios
    //       .get(`https://phonestoreserver.herokuapp.com/products`)
    //       .catch((err) => console.log(err));
    //   } else {
    //     return;
    //   }
    // }
  );
  useEffect(() => {
    if (brand == "Tất cả") {
      setData1(data);
      setData2(data);
      setLoaded(true);
    } else {
      const newData = data.filter((item) => item.brand == brand);
      setData1(newData);
      setData2(newData);
      setLoaded(true);
    }
  }, [brand]);
  // if (brand == "Tất cả") {
  //   useEffect(() => {
  //     axios
  //       .get(`https://phonestoreserver.herokuapp.com/products`)
  //       .then((res) => setData1(res.data.product))
  //       .then(() => setLoaded(true))
  //       .catch((err) => console.log(err));
  //   }, [brand]);
  // } else {
  //   useEffect(() => {
  //     axios
  //       .get(`https://phonestoreserver.herokuapp.com/products`, {
  //         params: { brand: brand },
  //       })
  //       .then((res) => setData1(res.data.product))
  //       .then(() => setLoaded(true))
  //       .catch((err) => console.log(err));
  //   }, [brand]);
  // }
  useEffect(() => {
    if (dataSearched) {
      const find = data.filter((item) => {
        return (
          item.title.toLowerCase().indexOf(dataSearched.toLowerCase()) !== -1
        );
      });
      setData2(find);
      setData1(find);
    } else {
      setData2(data);
    }
  }, [dataSearched]);
  const handleFilter = (e) => {
    const option = e.target.value;
    switch (option) {
      case "option1":
        var dataFilter = data1.filter((item) => item.price < 2000000);
        setData2(dataFilter);
        break;
      case "option2":
        var dataFilter = data1.filter(
          (item) => item.price >= 2000000 && item.price < 4000000
        );
        setData2(dataFilter);
        break;
      case "option3":
        var dataFilter = data1.filter(
          (item) => item.price >= 4000000 && item.price < 7000000
        );
        setData2(dataFilter);
        break;
      case "option4":
        var dataFilter = data1.filter(
          (item) => item.price >= 7000000 && item.price < 15000000
        );
        setData2(dataFilter);
        break;
      case "option5":
        var dataFilter = data1.filter((item) => item.price >= 15000000);
        setData2(dataFilter);
        break;
      default:
        setData2(data1);
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
                {dataSearched ? dataSearched : brand}
              </p>
              <p>({loaded && data2 ? data2.length : data1.length} sản phẩm)</p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-x-4">
            {loaded &&
              (data2 !== undefined ? data2 : data1).map((item) => {
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
            {/* {loaded &&
              data.map((item) => {
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
              })} */}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductsList;
