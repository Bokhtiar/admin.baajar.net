import React, { useState } from "react";
import DataTable from "react-data-table-component";
import { CiSearch } from "react-icons/ci";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import Header from "../../components/heading/heading";

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
    
  },
  {
    name: "Sold",
    selector: (row) => row.sold,
    sortable: true,
    
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
        <button className="text-blue-500 hover:text-blue-700">
          <FaEdit />
        </button>
        <button className="text-red-500 hover:text-red-700">
          <FaTrashAlt />
        </button>
      </div>
    ),
   
   
  },
];

export default function ProductTable() {
  const [search, setSearch] = useState("");

  const filteredData = products.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className=" bg-white rounded-md mt-3">
      <div className="flex flex-col md:flex-row justify-between items-center mb-4 mt-5">
        <h2 className="text-xl font-semibold text-primary">All Products</h2>
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
          data={filteredData}
          pagination
          responsive
          highlightOnHover
        />
      </div>
    </div>
  );
}
