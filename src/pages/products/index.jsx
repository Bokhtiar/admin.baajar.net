import React, { useState } from "react";
import DataTable from "react-data-table-component";
import { CiSearch } from "react-icons/ci";
import { FaEdit } from "react-icons/fa";
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

      <Header
        title="All Products"
        searchValue={search}
        onSearchChange={(value) => setSearch(value)}
        // onAddClick={() => setShowModal(true)}
      />

      <div className="bg-white shadow rounded overflow-y-auto mb-10">
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
