import React, { useCallback, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { CiCamera } from "react-icons/ci";
// import { networkErrorHandeller } from "../../../utils/helpers/index";
import { RiArrowDropDownLine } from "react-icons/ri";
import { NetworkServices } from "../../../network";
import { networkErrorHandeller } from "../../../utils/helpers";
import { Toastify } from "../../../components/toastify";

// import { useNavigate } from "react-router-dom";

export default function SubCategoryUpdate({
  onClose,
  fetchCategory,
  categoryId,
}) {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm();
  const modalRef = useRef();
  const [imageName, setImageName] = useState("");
  const [btnloading, setBtnLoading] = useState(false);
  const [category, setCategory] = useState({});
  const [categories, setCategories] = useState([]);

  console.log("categodry", category);

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
  const fetchCategoryItem = useCallback(async () => {
    // setLoading(true);
    try {
      const response = await NetworkServices.Category.index();
      console.log("first", response);
      if (response && response.status === 200) {
        // setCategories(response?.data?.data);
        const categories = response?.data?.data?.categories?.map(
          (item) => ({
            value: item.category_id,
            name: item.category_name,
          })
        );
        setCategories(categories);
      }
    } catch (error) {
      networkErrorHandeller(error);
    }
    // setLoading(false);
  }, []);

  // category api fetch
  useEffect(() => {
    fetchCategoryItem();
  }, [fetchCategoryItem]);

  // Fetch the category details from the API and populate the form
  const fetchParentCategory = async (categoryId) => {
    // setLoading(true);
    try {
      const response = await NetworkServices.Category.show(categoryId);
      console.log("response", response);
      if (response && response.status === 200) {
        const category = response?.data?.data;
        setCategory(category);

        setValue("category_name", category.category_name);
        setValue("category", category.parent_id);
        setValue("slug", category.slug);
        setValue("status", category.status === 1 ? "active" : "inactive");
      }
    } catch (error) {
      // console.error("Error fetching category:", error);
      networkErrorHandeller(error);
    }
    // setLoading(false);
  };

  useEffect(() => {
    if (categoryId) {
      fetchParentCategory(categoryId);
    }
  }, [categoryId]);

  const onFormSubmit = async (data) => {
    console.log("formData", data);
    try {
      setBtnLoading(true); // Loader চালু

      const formData = new FormData();
      formData.append("category_name", data?.category_name);
      formData.append("parent_id", data?.category);
      formData.append("slug", data?.slug);
      formData.append("isNavbar", "1");
      // formData.append("status", data.status);
      formData.append("status", data?.status === "active" ? 1 : 0);

      formData.append("_method", "PUT");


      const response = await NetworkServices.Category.update(
        categoryId,
        formData
      );
      console.log("response", response);

      if (response && response.status === 200) {
        Toastify.Success("Category Updated successfully!");
        reset();
        onClose();
        fetchCategory();
      }
    } catch (error) {
      networkErrorHandeller(error);
    } finally {
      setBtnLoading(false);
    }
  };

  const watchImage = watch("category_image");

  useEffect(() => {
    if (watchImage && watchImage.length > 0) {
      setImageName(watchImage[0].name);
    }
  }, [watchImage]);

  return (
    <div className="fixed inset-0 bg-gradient-to-b from-black/85 to-black  flex items-center justify-center z-50 px-4">
      <div
        ref={modalRef}
        className="bg-white p-6 rounded-2xl shadow-md w-[450px] "
      >
        <h2 className="text-center text-xl font-semibold mb-6">
          Update Sub Category
        </h2>

        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
          <input
            type="text"
            placeholder="Sub Category Name "
            {...register("category_name", { required: false })}
            className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none"
          />

          <div className="relative">
            <select
              {...register("category", {
                required: "Please select a parent category",
              })}
              className={`appearance-none w-full px-4 py-2 border rounded-full focus:outline-none text-gray-500 pr-8 ${
                errors.category ? "border-red-500" : "border-gray-300"
              }`}
              defaultValue=""
              placeholder=""
            >
              <option value="" disabled>
                Select Parent Category
              </option>

              {categories.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.name}
                </option>
              ))}
            </select>

            <div
              className={`pointer-events-none absolute right-3 ${
                errors.category ? "top-2" : "top-1/2 transform -translate-y-1/2"
              } text-gray-400`}
            >
              <RiArrowDropDownLine className="text-3xl" />
            </div>

            {errors.category && (
              <p className="text-red-500 text-sm mt-">
                {errors.category.message}
              </p>
            )}
          </div>

          <div className="flex gap-3">
            <div className="w-1/2">
              <input
                type="text"
                placeholder="Slug"
                {...register("slug", { required: false })}
                className={`w-full px-4 py-2 border rounded-full focus:outline-none ${
                  errors.slug ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.slug && (
                <p className="text-red-500 text-sm mt-">
                  {errors.slug.message}
                </p>
              )}
            </div>

            <div className="relative w-1/2">
              <select
                {...register("status", { required: false })}
                className={`appearance-none w-full px-4 py-2 border rounded-full focus:outline-none text-gray-500 pr-8 ${
                  errors.status ? "border-red-500" : "border-gray-300"
                }`}
                defaultValue=""
              >
                <option value="" disabled>
                  Select Status
                </option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>

              <div
                className={`pointer-events-none absolute right-3 ${
                  errors.status ? "top-1" : "top-1/2 transform -translate-y-1/2"
                } text-gray-400`}
              >
                <RiArrowDropDownLine className="text-3xl" />
              </div>

              {errors.status && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.status.message}
                </p>
              )}
            </div>
          </div>

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
