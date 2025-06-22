import React, { useState } from "react";
import DataTable from "react-data-table-component";
import { CiSearch } from "react-icons/ci";
import { FaTrashAlt, FaEdit } from "react-icons/fa";
// import img from "../../assets/logo/";
import img from "/image/bg/starry-night.webp";
import Header from "../../components/heading/heading";
import { IoDocumentTextOutline } from "react-icons/io5";
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
    name: "Address",
    cell: (row) => (
      <div className="whitespace-normal break-words max-w-[220px] ">
        {row.Address}
      </div>
    ),
  },
  {
    name: "Total Orders",
    selector: (row) => row.products,
    sortable: true,
    center: true,
  },
  {
    name: "Action",
    cell: (row) => (
      <div className="flex justify-center gap-2 text-lg">
        <button
          // onClick={() => handleToggle(row.status)}
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
        <button className="text-[#2D264B] text-xl">
          <IoDocumentTextOutline />
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

export default function User() {
  // const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState("");
  console.log("sxxearch", search);
  return (
    <div className=" bg-white rounded-lg  mt-3">
      {/* <Header
        title="Delivery Man"
        searchValue={search}
        onSearchChange={(value) => setSearch(value)}
        onAddClick={() => setShowModal(true)}
      /> */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-4 mt-5">
        <h2 className="text-xl font-semibold text-primary">Users</h2>
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
      <div className="bg-white  rounded overflow-y-auto mb-10">
        <DataTable
          columns={columns}
          data={data}
          pagination
          highlightOnHover
          responsive
        />
      </div>

      {/* {showModal && (
        <CreateVendorModal
          onClose={() => setShowModal(false)}
          // onSubmit={handleAddCategory}
        />
      )} */}
    </div>
  );
}
