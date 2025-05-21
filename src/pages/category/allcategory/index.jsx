import { useState } from "react";
import DataTable from "react-data-table-component";
import { FaEdit, FaTrash } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import img from "/image/bg/starry-night.webp";
import CreateCategoryModal from "./CreateCategoryModa";
import Header from "../../../components/heading/heading";

const initialData = [
  { id: 1, name: "Groceries", image: img, products: 925, status: true },
  {
    id: 2,
    name: "Meats",
    image: img,
    products: 825,
    status: true,
  },
  {
    id: 3,
    name: "Dairy Products",
    image: img,
    products: 787,
    status: true,
  },
  {
    id: 4,
    name: "Breads & Bakery",
    image: img,
    products: 632,
    status: true,
  },
  {
    id: 5,
    name: "Beverages",
    image: img,
    products: 879,
    status: true,
  },
  {
    id: 6,
    name: "Frozen Foods",
    image: img,
    products: 453,
    status: true,
  },
  {
    id: 7,
    name: "Beverages",
    image: img,
    products: 879,
    status: true,
  },
  {
    id: 8,
    name: "Frozen Foods",
    image: img,
    products: 453,
    status: true,
  },
];

export default function CategoryTable() {
  const [data, setData] = useState(initialData);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleToggle = (id) => {
    setData((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status: !item.status } : item
      )
    );
  };

  console.log("search",search)

  const handleDelete = (id) => {
    setData((prev) => prev.filter((item) => item.id !== id));
  };

  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  const columns = [
    {
      name: "SN.",
      selector: (row, index) => String(index + 1).padStart(2, "0") + ".",
      //   width: "70px",
    },
    {
      name: "Image",
      selector: (row) => row.image,
      cell: (row) => (
        <div className="w-12 h-10 bg-[#FFFFFF] shadow-2xl  rounded-sm flex items-center justify-center">
          <img
            className="w-8 h-8 object-contain"
            src={row.image}
            alt={row.name}
          />
        </div>
      ),
    },
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Available Products",
      selector: (row) => row.products,
      sortable: true,
    },
    {
      name: "Status",
      cell: (row) => (
        <button
          onClick={() => handleToggle(row.id)}
          className={`w-10 h-6 rounded-full flex items-center px-1 transition ${
            row.status ? "bg-green-500" : "bg-gray-300"
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
        <div className="flex gap-2 text-lg">
          <button className="text-blue-600 hover:text-blue-800">
            <FaEdit />
          </button>
          <button
            className="text-red-500 hover:text-red-700"
            onClick={() => handleDelete(row.id)}
          >
            <FaTrash />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="mt-3 bg ">


      <Header
        title="All Categories"
        searchValue={search}
        onSearchChange={(value) => setSearch(value)}
        onAddClick={() => setShowModal(true)}
      />

      <div className=" bg-white shadow rounded overflow-y-auto mb-10">
        <DataTable
          columns={columns}
          data={filteredData}
          pagination
          responsive
          highlightOnHover
        />
      </div>
      {showModal && (
        <CreateCategoryModal
          onClose={() => setShowModal(false)}
          // onSubmit={handleAddCategory}
        />
      )}
    </div>
  );
}
