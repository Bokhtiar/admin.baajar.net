import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { CiCamera } from "react-icons/ci";

export default function CreateCategoryModal({ onClose, onSubmit }) {
  const { register, handleSubmit, reset,watch  } = useForm();
  const modalRef = useRef();
  const [imageName, setImageName] = useState("");

  const handleOutsideClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const handleFormSubmit = (data) => {
    console.log("data", data);
    onSubmit(data);
    reset();
    onClose();
  };
    const watchImage = watch("image");

  useEffect(() => {
    if (watchImage && watchImage.length > 0) {
      setImageName(watchImage[0].name);
    }
  }, [watchImage]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div
        ref={modalRef}
        className="bg-white p-6 rounded-2xl shadow-md w-[450px] "
      >
        <h2 className="text-center text-xl font-semibold mb-6">
          Create A New Category
        </h2>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          <input
            type="text"
            placeholder="Category Name"
            {...register("name", { required: true })}
            className="w-full px-4 py-2 border border-gray-300 rounded-full"
          />

          <div className="flex gap-3">
            <input
              type="text"
              placeholder="Slug"
              {...register("slug", { required: true })}
              className="w-1/2 px-4 py-2 border border-gray-300 rounded-full"
            />
            <select
              {...register("status", { required: true })}
              className="w-1/2 px-4  py-2 border border-gray-300 rounded-full"
              defaultValue="active"
            >
              <option value="active">Status : Active</option>
              <option value="inactive">Status : Inactive</option>
            </select>
          </div>

          <label className="w-full block">
            <div className="w-full px-4 py-2 border border-gray-300 rounded-full bg-white text-gray-500 text-sm cursor-pointer flex items-center gap-2 pl-4">
              <CiCamera className="text-xl" />
              <span>{imageName || "Upload Category Image / Icon"}</span>
            </div>
            <input type="file" {...register("image", { required: true })} className="hidden" />
          </label>

          <div className="w-full flex justify-center">
            <button
              type="submit"
              className="w-[50%] bg-[#13BF00] hover:bg-green-600 text-white py-2 rounded-full mt-4"
            >
              Save Category
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
