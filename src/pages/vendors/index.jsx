import React, { useState } from "react";
import DataTable from "react-data-table-component";
import { CiSearch } from "react-icons/ci";
import { FaTrashAlt, FaEdit } from "react-icons/fa";
// import img from "../../assets/logo/";
import img from "/image/bg/starry-night.webp";
import CreateVendorModal from "./CreateVendorModal";
import Header from "../../components/heading/heading";
import ListSkeleton from "../../components/loading/ListLoading";

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
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState("");
  console.log("searchxx", search);
  return (
    <div className=" bg-white rounded-lg  mt-3">
      <Header
        title="All Sub Categories"
        searchValue={search}
        onSearchChange={(value) => setSearch(value)}
        onAddClick={() => setShowModal(true)}
      />

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
          data={data}
          customStyles={customStyles}
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
