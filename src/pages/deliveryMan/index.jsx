import React, { useCallback, useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { CiSearch } from "react-icons/ci";
import { FaTrashAlt, FaEdit } from "react-icons/fa";
// import img from "../../assets/logo/";
import img from "/image/bg/starry-night.webp";
import { IoDocumentTextOutline } from "react-icons/io5";
import { RiWallet3Fill } from "react-icons/ri";
import DeliveryEarningsModal from "./earningModal";
import { NetworkServices } from "../../network";
import { networkErrorHandeller } from "../../utils/helpers";
import Confirmation from "../../components/Confirmation/Confirmation";
import { Toastify } from "../../components/toastify";
// import { DeliveryEarningsModal } from "./earningModal";
// import CreateVendorModal from "./CreateVendorModal";

const data = [
  {
    id: 1,
    image: img, // replace with actual logos
    name: "Bokhtiar Fashion",
    Address: "Mogbazar Road , Siddheshwari 017335469825",
    products: 633,
  },
  {
    id: 2,
    image: img,
    name: "Tamim Agro",
    Address: "Mogbazar Road , Siddheshwari 017335469825",
    products: 730,
  },
  {
    id: 3,
    image: img,
    name: "Rabu Mudi Ghor",
    Address: "Mogbazar Road , Siddheshwari 017335469825",
    products: 1152,
  },
  {
    id: 4,
    image: img,
    name: "Shibly Juice Bar",
    Address: "Mogbazar Road , Siddheshwari 017335469825",
    products: 40,
  },
  {
    id: 5,
    image: img,
    name: "Mamun Tailors",
    Address: "Mogbazar Road , Siddheshwari 017335469825",
    products: 231,
  },
  {
    id: 6,
    image: img,
    name: "Mehedi Store",
    Address: "Mogbazar Road , Siddheshwari 017335469825",
    products: 650,
  },
];

export default function DeliveryMan() {
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [statusLoading, setStatusLoading] = useState(false);
  const [rider, setRider] = useState([]);
  console.log("sxxearch", search);

  const fetchRider = useCallback(async () => {
    setLoading(true);
    try {
      const response = await NetworkServices.Rider.index();
      console.log("response", response);

      if (response?.status === 200) {
        setRider(response?.data?.data || []);
      }
    } catch (error) {
      console.log(error);
      networkErrorHandeller(error);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchRider();
  }, [fetchRider]);

  const destroy = (id) => {
    const dialog = Confirmation({
      title: "Confirm Delete",
      message: "Are you sure you want to delete this Delivery Man?",
      onConfirm: async () => {
        try {
          const response = await NetworkServices.Rider.destroy(id);
          if (response?.status === 200) {
            Toastify.Info("Delivery Man deleted successfully.");
            fetchRider();
          }
        } catch (error) {
          networkErrorHandeller(error);
        }
      },
    });

    dialog.showDialog();
  };

  const handleToggleStatus = async (id, currentStatus) => {
    try {
      setStatusLoading(true);
      const formData = new FormData();
      formData.append("is_active", currentStatus === 1 ? 0 : 1);
      formData.append("_method", "PUT");

      const response = await NetworkServices.Rider.update(id, formData);
      if (response && response.status === 200) {
        Toastify.Success("Rider status updated!");
        fetchRider();
      }
    } catch (error) {
      networkErrorHandeller(error);
    } finally {
      setStatusLoading(false);
    }
  };

  const columns = [
    {
      name: "SN.",
      selector: (row, index) => `${(index + 1).toString().padStart(2, "0")}.`,
      width: "70px",
      center: true,
    },
    {
      name: "Image",
      cell: (row) => (
        <img
          src={`${import.meta.env.VITE_API_SERVER}${row?.profile_image}`}
          alt={row.name}
          className="w-14 h-14 rounded-full object-cover shadow-2xl p-2 transform scale-105 z-10"
        />
      ),
      width: "180px",
      center: true,
    },
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
      width: "180px",
    },
    {
      name: "Address",
      cell: (row) => (
        <div className="whitespace-normal break-words max-w-[220px] ">
          {row.Address}
        </div>
      ),
    },
    {
      name: "Action",
      cell: (row) => (
        <div className="flex justify-center gap-2 text-lg">
          <button
            onClick={() => handleToggleStatus(row.id, row.is_active)}
            className={`w-10 h-6 rounded-full flex items-center px-1 transition ${
              row.is_active == 1 ? "bg-green-500" : "bg-gray-300"
            }`}
          >
            <div
              className={`w-4 h-4 bg-white rounded-full transform transition-transform ${
                row.is_active == 1 ? "translate-x-4" : ""
              }`}
            ></div>
          </button>
          <button
            onClick={() => setShowModal(true)}
            className="text-[#2D264B] text-xl"
          >
            <IoDocumentTextOutline />
          </button>
          <button className="text-[#2D264B] text-xl">
            <FaEdit />
          </button>
          <button className="text-[#2D264B] text-xl">
            <RiWallet3Fill />
          </button>
          <button
            onClick={() => destroy(row?.id)}
            className="text-red-500 hover:text-red-700"
          >
            <FaTrashAlt />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className=" bg-white rounded-lg  mt-3">
      <div className="flex flex-col md:flex-row justify-between items-center mb-4 mt-5">
        <h2 className="text-xl font-semibold text-primary">Delivery Man</h2>
        <div className="flex flex-col md:flex-row gap-2 mt-2 md:mt-0">
          <div className="relative w-80">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 pr-3 py-2 w-full border border-lightBorder rounded-full focus:outline-none text-sm"
              // placeholder="Search"
            />
            {
              <div className="absolute left-28 top-1/2 transform -translate-y-1/2 flex items-center text-gray-400 pointer-events-none">
                <CiSearch className="text-lg mr-1" />
                <span className="text-sm">search</span>
              </div>
            }
          </div>
        </div>
      </div>

      <div className="bg-white rounded overflow-y-auto mb-10">
        <DataTable
          columns={columns}
          data={rider}
          pagination
          highlightOnHover
          responsive
        />
      </div>
      {statusLoading && (
        <div className="fixed  inset-0 bg-black/80  z-[9999] flex items-center justify-center">
          <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      {showModal && (
        <DeliveryEarningsModal
          onClose={() => setShowModal(false)}
          // onSubmit={handleAddCategory}
        />
      )}
      {/* {showModal && (
        <CreateDeliveryManModal
          onClose={() => setShowModal(false)}
          // onSubmit={handleAddCategory}
        />
      )} */}
    </div>
  );
}
