import React, { useEffect, useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { Heading } from "../Products/getAllProducts";
import axios from "axios";
import { useForm } from "react-hook-form";

const UpdateProduct = () => {
  const location = useLocation();
  const id = location.state.id;
  const [data, setData] = useState({});
  const { register, handleSubmit, getValues } = useForm();
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(`https://phone-store-server.onrender.com/products/${id}`)
      .then((res) => setData(res.data.product))
      .catch((err) => console.log(err));
  }, [id, data]);
  const handleUpdateProduct = () => {
    const values = getValues();
    axios
      .put(`https://phone-store-server.onrender.com/products/${id}`, values)
      .then(() => navigate("/admin/products"));
  };
  return (
    <div className="h-full">
      <Heading name={"Cập nhật sản phẩm"} />
      {data.specifications && (
        <div className="mt-3">
          <Link
            to="/admin/products"
            className="bg-[#6fcf97] p-3 text-xl rounded"
          >
            Về danh sách
          </Link>
          <form onSubmit={handleSubmit(handleUpdateProduct)} className="mt-9">
            <div className="flex gap-4">
              <div className="flex flex-col gap-5">
                <label>
                  Tên:{" "}
                  <input
                    type="text"
                    className="rounded-md"
                    defaultValue={data.title}
                    {...register("title")}
                  />
                </label>
                <label>
                  Giá:{" "}
                  <input
                    type="number"
                    className="rounded-md"
                    defaultValue={data.price}
                    {...register("price")}
                  />
                </label>
                <label>
                  Danh mục:{" "}
                  <select
                    name=""
                    id=""
                    className="rounded-md"
                    defaultValue={data.brand}
                    {...register("brand")}
                  >
                    <option value="iphone">iphone</option>
                    <option value="samsung">samsung</option>
                    <option value="oppo">oppo</option>
                    <option value="huawei">huawei</option>
                    <option value="realme">realme</option>
                    <option value="vivo">vivo</option>
                    <option value="xiaomi">xiaomi</option>
                    <option value="nokia">nokia</option>
                  </select>
                </label>
                <label>
                  Số lượng:{" "}
                  <input
                    type="number"
                    className="w-40 rounded-md"
                    defaultValue={data.quantity}
                    {...register("quantity")}
                  />
                </label>
                <label>
                  Hình ảnh:{" "}
                  <input
                    type="string"
                    className="w-40 rounded-md"
                    defaultValue={data.thumbnail}
                    {...register("thumbnail")}
                  />
                </label>
              </div>
              <div className="">
                <label className="flex gap-2">
                  Mô tả ngắn gọn:{" "}
                  <textarea
                    name=""
                    id=""
                    cols="25"
                    rows="10"
                    className="rounded-md flex-grow"
                    defaultValue={data.description}
                    {...register("description")}
                  ></textarea>
                </label>
              </div>
              <div>
                <label className=" ">
                  Mô tả chi tiết:{" "}
                  <div className="flex flex-col gap-2 w-[200px]">
                    <label>
                      Màn hình:{" "}
                      <input
                        type="text"
                        className="rounded-md"
                        defaultValue={data.specifications.screen}
                        {...register("screen")}
                      />
                    </label>
                    <label>
                      Camera sau:{" "}
                      <input
                        type="text"
                        className="rounded-md"
                        defaultValue={data.specifications.backCamera}
                        {...register("backCamera")}
                      />
                    </label>
                    <label>
                      Camera trước:{" "}
                      <input
                        type="text"
                        className="rounded-md"
                        defaultValue={data.specifications.selfieCamera}
                        {...register("selfieCamera")}
                      />
                    </label>
                    <label>
                      Bộ nhớ trong:{" "}
                      <input
                        type="text"
                        className="rounded-md"
                        defaultValue={data.specifications.internalMemory}
                        {...register("internalMemory")}
                      />
                    </label>
                    <label>
                      CPU:{" "}
                      <input
                        type="text"
                        className="rounded-md"
                        defaultValue={data.specifications.CPU}
                        {...register("CPU")}
                      />
                    </label>
                    <label>
                      Pin:{" "}
                      <input
                        type="text"
                        className="rounded-md"
                        defaultValue={data.specifications.batteryCapacity}
                        {...register("batteryCapacity")}
                      />
                    </label>
                    <label>
                      SIM:{" "}
                      <input
                        type="text"
                        className="rounded-md"
                        defaultValue={data.specifications.SIM}
                        {...register("SIM")}
                      />
                    </label>
                    <label>
                      Hệ điều hành:{" "}
                      <input
                        type="text"
                        className="rounded-md"
                        defaultValue={data.specifications.operatingSystem}
                        {...register("operatingSystem")}
                      />
                    </label>
                    <label>
                      RAM:{" "}
                      <input
                        type="text"
                        className="rounded-md"
                        defaultValue={data.specifications.RAM}
                        {...register("RAM")}
                      />
                    </label>
                  </div>
                </label>
              </div>
            </div>
            <button
              type="submit"
              className="py-3 px-5 text-xl rounded bg-[#6fcf97]"
            >
              Cập nhật
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default UpdateProduct;
