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
import ListLoading from "../../../components/loading/ListLoading";
import ListSkeleton from "../../../components/loading/ListLoading";

export default function SubCategoryTable() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  console.log("dghdgh", data);

  const allChildren = data.flatMap((parent) =>
    (parent.children || []).map((child) => ({
      ...child,
      parent_name: parent.category_name,
      parent_id: parent.category_id,
      parent_created_at: parent.created_at,
      parent_status: parent.status,
    }))
  );

  // Fetch categories from API
  const fetchCategory = useCallback(async () => {
    setLoading(true);
    try {
      const response = await NetworkServices.Category.index();
      console.log("response", response);

      if (response?.status === 200) {
        setData(response?.data?.data || []);
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

  // const columns = [


  //   {
  //     name: "Sub-Category",
  //     selector: (row) => row?.category_name,
  //     sortable: true,
  //   },
  //   {
  //     name: "Category",
  //     selector: (row) => row.name,
  //     sortable: true,
  //   },

  //   {
  //     name: "Sub-Subcategories",
  //     cell: (row) =>
  //       row.children && row.children.length > 0 ? (
  //         <div className="flex flex-wrap gap-2">
  //           {row.children.map((child, idx) => (
  //             <span
  //               key={idx}
  //               className="bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded-full"
  //             >
  //               {child.category_name}
  //             </span>
  //           ))}
  //         </div>
  //       ) : (
  //         <span className="text-gray-400 text-sm">No sub-items</span>
  //       ),
  //   },
  //   {
  //     name: "Status",
  //     cell: (row) => (
  //       <button
  //         onClick={() => handleToggle(row.status)}
  //         className={`w-10 h-6 rounded-full flex items-center px-1 transition ${
  //           row.status == 1 ? "bg-green-500" : "bg-gray-300"
  //         }`}
  //       >
  //         <div
  //           className={`w-4 h-4 bg-white rounded-full transform transition-transform ${
  //             row.status ? "translate-x-4" : ""
  //           }`}
  //         ></div>
  //       </button>
  //     ),
  //   },
  //   {
  //     name: "Action",
  //     cell: (row) => (
  //       <div className="flex gap-3 text-lg cursor-pointer">
  //         <button
  //           onClick={() => {
  //             setSelectedCategoryId(row.category_id);
  //             setUpdateModal(true);
  //           }}
  //           className=""
  //         >
  //           <RiEdit2Fill className="cursor-pointer" />
  //         </button>
  //         <button
  //           className="text-red-500 hover:text-red-700 cursor-pointer"
  //           onClick={() => destroy(row?.category_id)}
  //         >
  //           <FaTrashCan />
  //         </button>
  //       </div>
  //     ),
  //   },
  // ];

  const columns = [
    {
      name: "SN.",
      selector: (row) => row?.serial_num + ".",
    },

    {
      name: "Child Name",
      selector: (row) => row.category_name,
    },
    {
      name: "Category",
      selector: (row) => row.parent_name,
    },


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
    }
  ];

  // if (loading) {
  //   <ListLoading></ListLoading>;
  // }

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

  return (
    <div className="mt-3 bg ">
      <Header
        title="All Sub Categories"
        searchValue={search}
        onSearchChange={(value) => setSearch(value)}
        onAddClick={() => setShowModal(true)}
      />

      <div className=" bg-white  rounded overflow-y-auto mb-10">
        {loading ? (
          <ListSkeleton />
        ) : (
          <DataTable
            columns={columns}
            data={allChildren}
            customStyles={customStyles}
            pagination
            responsive
            highlightOnHover
          />
        )}
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
