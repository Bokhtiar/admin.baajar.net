import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { NetworkServices } from "../../network";
import { networkErrorHandeller } from "../../utils/helpers";
import { Toastify } from "../../components/toastify";
import { RiArrowDropDownLine } from "react-icons/ri";
import { CiCamera } from "react-icons/ci";

export default function ColorUpdateModal({ onClose, id,fetchColor }) {
  const { register, handleSubmit, reset, watch, setValue } = useForm();
  const modalRef = useRef();
  const [imageName, setImageName] = useState("");
  const [btnloading, setBtnLoading] = useState(false);
  const [color, setColor] = useState([]);

  console.log("categodry", color);

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

  // Fetch the category details from the API and populate the form
  const fetchColorList = async (id) => {
    // setLoading(true);
    try {
      const response = await NetworkServices.Color.show(id);
      console.log("response", response.data.data);
      if (response && response.status === 200) {
        const color = response?.data?.data;
        setColor(color);

        setValue("name", color.name);
        setValue("status", color.is_active == 0 ? "active" : "inactive");
      }
    } catch (error) {
      // console.error("Error fetching category:", error);
      networkErrorHandeller(error);
    }
    // setLoading(false);
  };

  useEffect(() => {
    if (id) {
      fetchColorList(id);
    }
  }, [id]);

  const onFormSubmit = async (data) => {
    console.log("formData", data);
    try {
      setBtnLoading(true); // Loader চালু

      const formData = new FormData();
      formData.append("name", data?.name);
      formData.append("status", data?.status === "active" ? 1 : 0);

      formData.append("_method", "PUT");

      const response = await NetworkServices.Color.update(
        id,
        formData
      );
      console.log("response", response);

      if (response && response.status === 200) {
        Toastify.Success("Color Update successfully!");
        reset();
        onClose();
        fetchColor()
        
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
        className="bg-white p-6 rounded-2xl shadow-md w-[400px] "
      >
        <h2 className="text-center text-xl font-semibold mb-6">
          Update Color
        </h2>

        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
          <input
            type="text"
            placeholder="Color Name"
            {...register("name", { required: false })}
            className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none"
          />

          <div className="flex flex-col md:flex-row gap-3">

            <div className="relative  w-full">
              <select
                {...register("status", { required: false })}
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


          <div className="w-full flex justify-center">
            <button
              type="submit"
              className="w-[50%] bg-[#13BF00] hover:bg-green-600 text-white py-2 rounded-full mt-4 cursor-pointer"
            >
              Save Color
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
