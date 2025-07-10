import React, { useCallback, useEffect, useState } from "react";
import { NetworkServices } from "../../../network";
import OrderDetailsSkeleton from "../../../components/loading/OrderDetailsSkeleton";

const DetailsModal = ({ isOpen, onClose, order, selectedDetails }) => {
  const [data, setData] = useState([]);
  const [loading,setLoading]=useState(false)

  console.log("selectedDetails", data);
  //   if (!isOpen) return null;

  console.log("order", order);

  const orderStates = [
    "pending",
    "processing",
    "shipped",
    "delivered",
    "cancelled",
  ];

  const fetchData = useCallback(async () => {
    setLoading(true);

    try {
      const response = await NetworkServices.Order.show(selectedDetails.id);
      console.log("ggggg", response);
      if (response?.status === 200) {
        setData(response?.data?.data);
      }
    } catch (error) {
      console.error("Error fetching news data:", error);
    } finally {
        setLoading(false);
    }
  }, [selectedDetails.id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if(loading){
    
      return  <OrderDetailsSkeleton></OrderDetailsSkeleton>
    
  }

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black/85 bg-opacity-50 z-50 px-4 overflow-y-auto"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="min-h-screen flex items-center justify-center py-8"
      >
        <div className="bg-white rounded-xl p-4 sm:p-6 w-full max-w-md md:max-w-2xl shadow-lg relative">
          <div className="mb-4 space-y-4">
            {/* Header Info */}
            <div className="flex flex-col md:flex-row  gap-8 text-sm font-medium px-">
              <div>
                <div className="text-gray-500">Date:</div>
                <div>
                  {data?.created_at &&
                    new Date(data.created_at).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                </div>
              </div>
              <div>
                <div className="text-gray-500">Order ID:</div>
                <div>{data?.id}</div>
              </div>
              <div>
                <div className="text-gray-500">Customer:</div>
                <div>{data?.user?.name}</div>
              </div>
            </div>

            {/* Product Info */}

            <div>
              <h3 className="text-gray-600 font-semibold mb-2 text-base">
                Product Details
              </h3>

              <div className="overflow-x-auto border border-gray-200 rounded-lg">
                <table className="min-w-full divide-y divide-gray-200 text-sm ">
                  <thead className="bg-gray-100 text-left">
                    <tr>
                      <th className="p-3 font-semibold text-gray-600">Image</th>
                      <th className="p-3 font-semibold text-gray-600">
                        Product Name
                      </th>
                      <th className="p-3 font-semibold text-gray-600">
                        Vendor
                      </th>
                      <th className="p-3 font-semibold text-gray-600">
                        Quantity
                      </th>
                      <th className="p-3 font-semibold text-gray-600">
                        Total Price
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {data?.items?.map((item, index) => (
                      <tr key={index}>
                        <td className="p-2">
                          <img
                            src={`${import.meta.env.VITE_API_SERVER}${
                              item?.product?.thumbnail
                            }`}
                            alt={item?.product?.product_name}
                            className="w-9 h-10 object-cover rounded"
                          />
                        </td>
                        <td className="p-2">{item?.product?.product_name}</td>
                        <td className="p-2">{item?.vendor?.company_name}</td>
                        <td className="p-4 ">{item?.quantity}</td>
                        <td className="p-4">{item?.total}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Order Status Buttons */}
          <div className="text-center mt-6">
            <h4 className="text-gray-600 mb-3 font-medium">
               Order State
            </h4>
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
              {orderStates.map((state) => (
                <button
                  key={state}
                  //   onClick={() => handleStatusChange(state)}
                  className={`px-4 py-2 rounded-full ${
                    state === data?.order_status
                      ? "bg-[#FF6600] text-white"
                      : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {state}
                </button>
              ))}
            </div>
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-2 right-3 text-gray-500 hover:text-gray-800 text-xl font-bold"
          >
            &times;
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailsModal;
