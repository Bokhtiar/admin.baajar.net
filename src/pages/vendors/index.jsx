import React, { useCallback, useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { CiSearch } from "react-icons/ci";
import { FaTrashAlt, FaEdit } from "react-icons/fa";
// import img from "../../assets/logo/";
import img from "/image/bg/starry-night.webp";
import CreateVendorModal from "./CreateVendorModal";
import Header from "../../components/heading/heading";
import ListSkeleton from "../../components/loading/ListLoading";
import { IoDocumentTextOutline } from "react-icons/io5";
import { RiWallet3Fill } from "react-icons/ri";
import { NetworkServices } from "../../network";
import { networkErrorHandeller } from "../../utils/helpers";
import Confirmation from "../../components/Confirmation/Confirmation";
import { Toastify } from "../../components/toastify";
import VendorUpdateModal from "./updateVendorModal";

const customStyles = {
  headCells: {
    style: {
      fontWeight: "400",
      fontSize: "14px",
      color: "#8B8B8B",
    },
  },
  rows: {
    style: {
      minHeight: "64px",
      borderBottom: "1px solid #E5E7EB",
      color: "#33363F",
    },
  },
  cells: {
    style: {
      paddingTop: "8px",
      paddingBottom: "8px",
      color: "#33363F",
    },
  },
};

export default function AllVendorsTable() {
  // const [showModal, setShowModal] = useState(false);
  // const [updateModal, setUpdateModal] = useState(false);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [statusLoading, setStatusLoading] = useState(false);
  const [vendor, setVendor] = useState([]);
  // const [selectedId, setSelectedId] = useState(null);

  console.log("searchxx", search);

  console.log("vendor", vendor);

  // Fetch vendor from API
  const fetchVendor = useCallback(async () => {
    setLoading(true);
    try {
      const response = await NetworkServices.Vendor.index();
      console.log("response", response);

      if (response?.status === 200) {
        setVendor(response?.data?.data || []);
      }
    } catch (error) {
      console.log(error);
      networkErrorHandeller(error);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchVendor();
  }, [fetchVendor]);

  const destroy = (id) => {
    const dialog = Confirmation({
      title: "Confirm Delete",
      message: "Are you sure you want to delete this Vendor?",
      onConfirm: async () => {
        try {
          const response = await NetworkServices.Vendor.destroy(id);
          if (response?.status === 200) {
            Toastify.Info("Vendor deleted successfully.");
            fetchVendor();
          }
        } catch (error) {
          networkErrorHandeller(error);
        }
      },
    });

    dialog.showDialog();
  };

  const handleToggleStatus = async (vendorId, currentStatus) => {
    try {
      setStatusLoading(true);
      const formData = new FormData();
      formData.append("is_active", currentStatus === 1 ? 0 : 1);
      formData.append("_method", "PUT");

      const response = await NetworkServices.Vendor.update(vendorId, formData);
      if (response && response.status === 200) {
        Toastify.Success("Vendor status updated!");
        fetchVendor();
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
          // src={row.logo}
          src={`${import.meta.env.VITE_API_SERVER}${row?.logo}`}
          alt={row.name}
          className="w-14 h-14 rounded-full object-cover shadow-2xl p-2 transform scale-105 z-10"
        />
      ),
      width: "100px",
    },
    {
      name: "Name",
      selector: (row) => row?.company_name,
      sortable: true,
    },
    {
      name: "Category",
      selector: (row) => row.category,
      sortable: true,
    },
    {
      name: "Available Products",
      selector: (row) => row.products,
      sortable: true,
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
            className="text-[#2D264B] text-xl"

          >
            <IoDocumentTextOutline />
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
      <Header
        title="All Vendors"
        searchValue={search}
        onSearchChange={(value) => setSearch(value)}
        // onAddClick={() => setShowModal(true)}
      />
      {statusLoading && (
        <div className="fixed  inset-0 bg-black/80  z-[9999] flex items-center justify-center">
          <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      <div className="bg-white  rounded overflow-y-auto mb-10">
        {/* {loading ? (
          <ListSkeleton />
        ) : (
          <DataTable
            columns={columns}
            data={data}
            customStyles={customStyles}
            pagination
            highlightOnHover
            responsive
          />
        )} */}
        <DataTable
          columns={columns}
          data={vendor}
          customStyles={customStyles}
          pagination
          highlightOnHover
          responsive
        />
      </div>


    </div>
  );
}
