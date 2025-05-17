import React, { useState } from "react";
import DataTable from "react-data-table-component";
import { CiSearch } from "react-icons/ci";
import { FaTrashAlt, FaEdit } from "react-icons/fa";
// import img from "../../assets/logo/";
import img from "/image/bg/starry-night.webp";
import CreateVendorModal from "./CreateVendorModal";

const data = [
  {
    id: 1,
    image: img, // replace with actual logos
    name: "Bokhtiar Fashion",
    category: "Fashion",
    products: 633,
  },
  {
    id: 2,
    image: img,
    name: "Tamim Agro",
    category: "Vegetables",
    products: 730,
  },
  {
    id: 3,
    image: img,
    name: "Rabu Mudi Ghor",
    category: "Grocery",
    products: 1152,
  },
  {
    id: 4,
    image: img,
    name: "Shibly Juice Bar",
    category: "Drinks",
    products: 40,
  },
  {
    id: 5,
    image: img,
    name: "Mamun Tailors",
    category: "Fashion",
    products: 231,
  },
  {
    id: 6,
    image: img,
    name: "Mehedi Store",
    category: "Grocery",
    products: 650,
  },
];

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
        src={row.image}
        alt={row.name}
        className="w-14 h-14 rounded-full object-cover shadow-2xl p-2 transform scale-105 z-10"
      />
    ),
    width: "100px",
    center: true,
  },
  {
    name: "Name",
    selector: (row) => row.name,
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
    center: true,
  },
  {
    name: "Action",
    cell: (row) => (
      <div className="flex justify-center gap-2 text-lg">
        <button className="text-blue-500 hover:text-blue-700">
          <FaEdit />
        </button>
        <button className="text-red-500 hover:text-red-700">
          <FaTrashAlt />
        </button>
      </div>
    ),
    center: true,
    width: "120px",
  },
];

export default function AllVendorsTable() {
  const [showModal, setShowModal] = useState(false);
  return (
    <div className=" bg-white rounded-lg  mt-3">
      <div className="flex flex-col md:flex-row justify-between items-center mb-4  ">
        <h2 className="text-xl font-semibold text-primary">All Vendors</h2>
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
              //   value={search}
              //   onChange={(e) => setSearch(e.target.value)}
              className="pl-4 pr-3 py-1 w-full border border-lightBorder rounded-full focus:outline-none "
            />
          </div>

          <button
            className="bg-[#13BF00] text-white px-11 py-[6px] rounded-full hover:bg-green-600 cursor-pointer"
            onClick={() => setShowModal(true)}
          >
            + Add New
          </button>
        </div>
      </div>

      <div className="bg-white shadow rounded overflow-y-auto">
        <DataTable
          columns={columns}
          data={data}
          pagination
          highlightOnHover
          responsive
        />
      </div>
      {showModal && (
        <CreateVendorModal
          onClose={() => setShowModal(false)}
          // onSubmit={handleAddCategory}
        />
      )}
    </div>
  );
}
