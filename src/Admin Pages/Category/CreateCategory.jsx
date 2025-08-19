import React from "react";
import { useForm } from "react-hook-form";
import { createCategory, updateCategory } from "../../Query/query";
import { useLocation, useNavigate } from "react-router-dom";

const CreateCategory = () => {
  const location = useLocation();
  const { name, _id } = location.state?.category || {};
  console.log(name, _id);

  const navigate = useNavigate();
  const { register, handleSubmit, getValues } = useForm();
  const handleCreateCategory = () => {
    const data = getValues();
    if (location.state) {
      updateCategory(_id, data)
        .then(() => {
          navigate("/admin/categories");
        })
        .catch((err) => console.log(err));
    } else {
      createCategory(data)
        .then(() => {
          navigate("/admin/categories");
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="">
      <h1 className="text-2xl font-bold">Tạo danh mục mới</h1>
      <form
        className="mt-4"
        onSubmit={handleSubmit(handleCreateCategory)}>
        <div className="mb-4">
          <label>
            Tên danh mục:{" "}
            <input
              type="text"
              className="rounded-md px-4"
              {...register("name")}
              defaultValue={name || ""}
            />
          </label>
        </div>
        <button
          type="submit"
          className="py-3 px-5 text-xl rounded bg-[#6fcf97]">
          {location.state ? "Cập nhật" : "Tạo mới"}
        </button>
      </form>
    </div>
  );
};

export default CreateCategory;
