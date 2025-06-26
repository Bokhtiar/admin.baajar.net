import { useCallback, useEffect, useState } from "react";
import { NetworkServices } from "../../network";
import { confirmAlert } from "react-confirm-alert";
import { Toastify } from "../../components/toastify";
import DataTable from "react-data-table-component";
import ListSkeleton from "../../components/loading/ListLoading";
import { RiEdit2Fill } from "react-icons/ri";
import { FaTrashCan } from "react-icons/fa6";
import Header from "../../components/heading/heading";
import { networkErrorHandeller } from "../../utils/helpers";
import CreateColorModal from "./CreateColorModa";
import ColorUpdateModal from "./colorUpdateModal";
// import ColorUpdateModal from "./colorUpdateModal";

export default function ColorTable() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);

  const [updateModal, setUpdateModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  console.log("dghdgh", data);

  // Fetch categories from API
  const fetchColor = useCallback(async () => {
    setLoading(true);
    try {
      const response = await NetworkServices.Color.index();
      console.log("response", response);

      if (response?.status === 200) {
        setData(response?.data?.data || []);
      }
    } catch (error) {
      // console.log(error);
      networkErrorHandeller(error);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchColor();
  }, [fetchColor]);

  // const handleToggle = (id) => {
  //   setData((prev) =>
  //     prev.map((item) =>
  //       item.id === id ? { ...item, status: !item.status } : item
  //     )
  //   );
  // };

  console.log("search", search);

  // const filteredData = data.filter((item) =>
  //   item.name.toLowerCase().includes(search.toLowerCase())
  // );
  // String(index + 1).padStart(2, "0") + ".",

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
              const response = await NetworkServices.Color.destroy(id);
              if (response?.status === 200) {
                Toastify.Info("Color deleted successfully.");
                fetchColor();
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

  const columns = [
    {
      name: "SN.",
      selector: (row) => row?.serial_num + ".",
    },

    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Status",
      cell: (row) => (
        <button
          // onClick={() => handleToggle(row.status)}
          className={`w-10 h-6 rounded-full flex items-center px-1 transition ${
            row.is_active == 1 ? "bg-green-500" : "bg-gray-300"
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
              setSelectedId(row.id);
              setUpdateModal(true);
            }}
            className="cursor-pointer"
          >
            <RiEdit2Fill />
          </button>
          <button className="text-red-500 hover:text-red-700 cursor-pointer">
            <FaTrashCan onClick={() => destroy(row?.id)} />
          </button>
        </div>
      ),
    },
  ];

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
        title="All Color"
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
            data={data}
            customStyles={customStyles}
            pagination
            responsive
            highlightOnHover
          />
        )}
      </div>
      {showModal && (
        <CreateColorModal
          onClose={() => setShowModal(false)}
          // onSubmit={handleAddCategory}
          fetchColor={fetchColor}
        />
      )}

      {updateModal && (
        <ColorUpdateModal
          id={selectedId}
          onClose={() => setUpdateModal(false)}
          // onSubmit={handleAddCategory}
          fetchColor={fetchColor}
        />
      )}
    </div>
  );
}
