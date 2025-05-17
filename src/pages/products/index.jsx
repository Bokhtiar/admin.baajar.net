import React, { useState } from "react";
import DataTable from "react-data-table-component";
import { CiSearch } from "react-icons/ci";
import { FaEdit } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";

// Sample Data
const products = [
  {
    id: 1,
    name: "Men's Tshirt Sky Blue",
    store: "Bokhtiar Fashion",
    sku: "MTLV8454",
    stock: 25,
    sold: 3,
  },
  {
    id: 2,
    name: "Men's Tshirt Premium Blue",
    store: "Mamun Tailors",
    sku: "MTLV35975",
    stock: 12,
    sold: 0,
  },
  {
    id: 3,
    name: "Men's Tshirt Black with Print",
    store: "Bokhtiar Fashion",
    sku: "MTLV8454",
    stock: 17,
    sold: 5,
  },
  // Add more rows similarly...
];

// Columns for the table
const columns = [
  {
    name: "SN",
    selector: (row, index) => `${(index + 1).toString().padStart(2, "0")}.`,
    width: "70px",
  },
  {
    name: "Name",
    selector: (row) => row.name,
    sortable: true,
  },
  {
    name: "Store",
    selector: (row) => row.store,
    sortable: true,
  },
  {
    name: "SKU",
    selector: (row) => row.sku,
    sortable: true,
  },
  {
    name: "Stock",
    selector: (row) => row.stock,
    sortable: true,
    center: true,
  },
  {
    name: "Sold",
    selector: (row) => row.sold,
    sortable: true,
    center: true,
  },
  {
    name: "Action",
    cell: () => (
      <button className="text-gray-700 hover:text-blue-600">
        <FaEdit className="text-lg" />
      </button>
    ),
    center: true,
    width: "80px",
  },
];

export default function ProductTable() {
  const [search, setSearch] = useState("");

  const filteredData = products.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className=" bg-white rounded-md mt-3">
      <div className="flex flex-col md:flex-row justify-between items-center mb-4  ">
        <h2 className="text-xl font-semibold text-primary">All Products</h2>
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

          <button
            className="bg-[#13BF00] text-white px-11 py-[6px] rounded-full hover:bg-green-600 cursor-pointer"
            // onClick={() => setShowModal(true)}
          >
            + Add New
          </button>
        </div>
      </div>

      <div className="bg-white shadow rounded overflow-y-auto">
        <DataTable
          columns={columns}
          data={filteredData}
          pagination
          responsive
          highlightOnHover
        />
      </div>
    </div>
  );
}
