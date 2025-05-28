import React, { useCallback, useEffect, useState } from "react";
import DataTable from "react-data-table-component";

import CreateSubCategoryModal from "./createSubCateModal";
import Header from "../../../components/heading/heading";
import { NetworkServices } from "../../../network";
import { networkErrorHandeller } from "../../../utils/helpers";
import { RiEdit2Fill } from "react-icons/ri";
import { FaTrashCan } from "react-icons/fa6";
import { confirmAlert } from "react-confirm-alert";
import { Toastify } from "../../../components/toastify";
import SubCategoryUpdate from "./SubCategoryUpdate";

export default function SubCategoryTable() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  console.log("dghdgh", data);

  // Fetch categories from API
  const fetchCategory = useCallback(async () => {
    setLoading(true);
    try {
      const response = await NetworkServices.Category.index();
      console.log("response", response);

      if (response?.status === 200) {
        setData(response?.data?.data?.child_category || []);
      }
    } catch (error) {
      console.log(error);
      networkErrorHandeller(error);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchCategory();
  }, [fetchCategory]);

  const handleToggle = (id) => {
    setData((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status: !item.status } : item
      )
    );
  };

  const destroy = (id) => {
    console.log("first", id);
    confirmAlert({
      title: "Confirm Delete",
      message: "Are you sure you want to delete this category?",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            try {
              const response = await NetworkServices.Category.destroy(id);
              if (response?.status === 200) {
                Toastify.Info("Category deleted successfully.");
                fetchCategory();
              }
            } catch (error) {
              networkErrorHandeller(error);
            }
          },
        },
        {
          label: "No",
        },
      ],
    });
  };

  // const filteredData = data.filter((item) =>
  //   item.name.toLowerCase().includes(search.toLowerCase())
  // );

  const columns = [
    {
      name: "SN.",
      selector: (row) => row?.serial_num + ".",
    },
    // {
    //   name: "Image",
    //   selector: (row) => row.image,
    //   cell: (row) => (
    //     <div className="w-12 h-10 bg-[#FFFFFF] shadow-2xl  rounded-sm flex items-center justify-center">
    //       <img
    //         className="w-8 h-8 object-contain"
    //         src={row.image}
    //         alt={row.name}
    //       />
    //     </div>
    //   ),
    // },
    {
      name: "Sub-Category",
      selector: (row) => row?.category_name,
      sortable: true,
    },
    {
      name: "Category",
      selector: (row) => row.name,
      sortable: true,
    },
    // {
    //   name: "Available Products",
    //   selector: (row) => row.products,
    //   sortable: true,
    // },
    {
      name: "Status",
      cell: (row) => (
        <button
          onClick={() => handleToggle(row.status)}
          className={`w-10 h-6 rounded-full flex items-center px-1 transition ${
            row.status == 1 ? "bg-green-500" : "bg-gray-300"
          }`}
        >
          <div
            className={`w-4 h-4 bg-white rounded-full transform transition-transform ${
              row.status ? "translate-x-4" : ""
            }`}
          ></div>
        </button>
      ),
    },
    {
      name: "Action",
      cell: (row) => (
        <div className="flex gap-3 text-lg cursor-pointer">
          <button
            onClick={() => {
              setSelectedCategoryId(row.category_id);
              setUpdateModal(true);
            }}
            className=""
          >
            <RiEdit2Fill className="cursor-pointer" />
          </button>
          <button
            className="text-red-500 hover:text-red-700 cursor-pointer"
            onClick={() => destroy(row?.category_id)}
          >
            <FaTrashCan />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="mt-3 bg ">
      <Header
        title="All Sub Categories"
        searchValue={search}
        onSearchChange={(value) => setSearch(value)}
        onAddClick={() => setShowModal(true)}
      />

      <div className=" bg-white shadow rounded overflow-y-auto mb-10">
        <DataTable
          columns={columns}
          data={data}
          pagination
          responsive
          highlightOnHover
        />
      </div>
      {showModal && (
        <CreateSubCategoryModal
          onClose={() => setShowModal(false)}
          fetchCategory={fetchCategory}
          // onSubmit={handleAddCategory}
        />
      )}
      {updateModal && (
        <SubCategoryUpdate
          categoryId={selectedCategoryId}
          onClose={() => setUpdateModal(false)}
          // onSubmit={handleAddCategory}
          fetchCategory={fetchCategory}
        />
      )}
    </div>
  );
}
