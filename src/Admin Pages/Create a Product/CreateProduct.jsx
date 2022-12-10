import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Heading } from "./../Products/getAllProducts";
import { useForm } from "react-hook-form";
import axios from "axios";

const CreateProduct = () => {
  const { register, handleSubmit, getValues } = useForm();
  const navigate = useNavigate();
  const handleCreateProduct = () => {
    const data = getValues();
    const specifications = {
      screen: data.screen,
      backCamera: data.backCamera,
      selfieCamera: data.selfieCamera,
      internalMemory: data.internalMemory,
      CPU: data.CPU,
      batteryCapacity: data.batteryCapacity,
      SIM: data.SIM,
      operatingSystem: data.operatingSystem,
      RAM: data.RAM,
    };
    const reqData = {
      specifications: specifications,
      title: data.title,
      description: data.description,
      price: data.price,
      thumbnail: data.thumbnail,
      quantity: data.quantity,
      brand: data.brand,
    };
    axios
      .post("https://phonestoreserver.herokuapp.com/products", reqData)
      .then(() => navigate("/admin/products"))
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <Heading name="Tạo sản phẩm" />
      <div className=" mt-3">
        <Link to="/admin/products" className="bg-[#6fcf97] p-3 text-xl rounded">
          Về danh sách
        </Link>
        <form onSubmit={handleSubmit(handleCreateProduct)} className="mt-9">
          <div className="flex gap-4">
            <div className="flex flex-col gap-5">
              <label>
                Tên:{" "}
                <input
                  type="text"
                  className="rounded-md"
                  {...register("title")}
                />
              </label>
              <label>
                Giá:{" "}
                <input
                  type="number"
                  className="rounded-md"
                  {...register("price")}
                />
              </label>
              <label>
                Danh mục:{" "}
                <select
                  name=""
                  id=""
                  className="rounded-md"
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
                  {...register("quantity")}
                />
              </label>
              <label>
                Hình ảnh:{" "}
                <input
                  type="string"
                  className="w-40 rounded-md"
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
                      {...register("screen")}
                    />
                  </label>
                  <label>
                    Camera sau:{" "}
                    <input
                      type="text"
                      className="rounded-md"
                      {...register("backCamera")}
                    />
                  </label>
                  <label>
                    Camera trước:{" "}
                    <input
                      type="text"
                      className="rounded-md"
                      {...register("selfieCamera")}
                    />
                  </label>
                  <label>
                    Bộ nhớ trong:{" "}
                    <input
                      type="text"
                      className="rounded-md"
                      {...register("internalMemory")}
                    />
                  </label>
                  <label>
                    CPU:{" "}
                    <input
                      type="text"
                      className="rounded-md"
                      {...register("CPU")}
                    />
                  </label>
                  <label>
                    Pin:{" "}
                    <input
                      type="text"
                      className="rounded-md"
                      {...register("batteryCapacity")}
                    />
                  </label>
                  <label>
                    SIM:{" "}
                    <input
                      type="text"
                      className="rounded-md"
                      {...register("SIM")}
                    />
                  </label>
                  <label>
                    Hệ điều hành:{" "}
                    <input
                      type="text"
                      className="rounded-md"
                      {...register("operatingSystem")}
                    />
                  </label>
                  <label>
                    RAM:{" "}
                    <input
                      type="text"
                      className="rounded-md"
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
            Tạo
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateProduct;
