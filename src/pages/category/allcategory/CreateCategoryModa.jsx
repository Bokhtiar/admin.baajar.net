import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { CiCamera } from "react-icons/ci";
import { NetworkServices } from "../../../network";
import { Toastify } from "../../../components/toastify";
// import { networkErrorHandeller } from "../../../utils/helpers/index";
import { RiArrowDropDownLine } from "react-icons/ri";

export default function CreateCategoryModal({ onClose }) {
  const { register, handleSubmit, reset, watch } = useForm();
  const modalRef = useRef();
  const [imageName, setImageName] = useState("");
  const [btnloading, setBtnLoading] = useState(false);

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

  const onFormSubmit = async (data) => {
    console.log("formData", data);
    try {
      setBtnLoading(true); // Loader চালু

      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("slug", data.slug);
      formData.append("status", data.status);

      if (data.image && data.image[0]) {
        formData.append("image", data.image[0]);
      }

      const response = await NetworkServices.Category.store(formData);
      console.log("response", response);

      if (response && response.status === 200) {
        Toastify.Success("Category created successfully!");
        reset(); // ফর্ম রিসেট
        onClose(); // modal বন্ধ
      }
    } catch (error) {
      // networkErrorHandeller(error);
      console.log(error);
    } finally {
      setBtnLoading(false);
    }
  };

  const watchImage = watch("image");

  useEffect(() => {
    if (watchImage && watchImage.length > 0) {
      setImageName(watchImage[0].name);
    }
  }, [watchImage]);

  return (
    <div className="fixed inset-0 bg-gradient-to-b from-black/85 to-black  flex items-center justify-center z-50 px-4">
      <div
        ref={modalRef}
        className="bg-white p-6 rounded-2xl shadow-md w-[400px] "
      >
        <h2 className="text-center text-xl font-semibold mb-6">
          Create A New Category
        </h2>

        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
          <input
            type="text"
            placeholder="Category Name"
            {...register("name", { required: true })}
            className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none"
          />

          <div className="flex flex-col md:flex-row gap-3">
            <div className="w-full">
              {" "}
              <input
                type="text"
                placeholder="Slug"
                {...register("slug", { required: true })}
                className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none"
              />
            </div>
            <div className="relative  w-full">
              <select
                {...register("status", { required: true })}
                className="appearance-none w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none text-gray-500 pr-8"
                defaultValue="active"
              >
                <option className="text-gray-500" value="active">
                  Status : Active
                </option>
                <option className="text-gray-500" value="inactive">
                  Status : Inactive
                </option>
              </select>

              {/* Dropdown icon on the left */}
              <div className="pointer-events-none absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <RiArrowDropDownLine className="text-3xl" />
              </div>
            </div>
          </div>

          <label className="w-full block">
            <div className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-500 text-sm cursor-pointer flex items-center gap-2 pl-4">
              <CiCamera className="text-xl" />
              <span>{imageName || "Upload  Image / Icon"}</span>
            </div>
            <input
              type="file"
              {...register("image", { required: true })}
              className="hidden"
            />
          </label>

          <div className="w-full flex justify-center">
            <button
              type="submit"
              className="w-[50%] bg-[#13BF00] hover:bg-green-600 text-white py-2 rounded-full mt-4 cursor-pointer"
            >
              Save Category
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}


