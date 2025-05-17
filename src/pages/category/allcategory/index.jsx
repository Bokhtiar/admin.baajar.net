import  { useState } from "react";
import DataTable from "react-data-table-component";
import { FaEdit, FaTrash } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import img from "/image/bg/starry-night.webp";
import CreateCategoryModal from "./CreateCategoryModa";

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
      <div className="flex flex-col md:flex-row justify-between items-center mb-4  ">
        <h2 className="text-xl font-semibold text-primary">All Categories</h2>
        <div className="flex flex-col md:flex-row gap-2">
          <div className="relative w-60 ">
            <span className="absolute left-20 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm pointer-events-none">
              <div className="flex items-center justify-center gap-2">
                <div>
                  <CiSearch className="text-xl" />
                </div>
                <h1>search</h1>
              </div>
            </span>
            <input
              type="text"
              //   placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-4 pr-3 py-1 w-full border border-lightBorder rounded-full focus:outline-none "
            />
          </div>

          <button className="bg-[#13BF00] text-white px-11 py-[6px] rounded-full hover:bg-green-600 cursor-pointer"
          onClick={() => setShowModal(true)}
          >
            + Add New
          </button>
        </div>
      </div>

      <div className=" bg-white shadow rounded overflow-y-auto">
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
