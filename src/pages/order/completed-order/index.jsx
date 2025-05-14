import React from "react";

import DataTable from "react-data-table-component";
import { FaEdit, FaTrash } from "react-icons/fa";

const orders = [
  {
    date: "26 Apr 25",
    time:"10.30 AM",
    orderNo: "48956486",
    customer: "Bakhtiar Tashar",
    address: "23/2 Jailroad Road, Sylhet",
    vendor: "Luis Vutton",
    price: 480,
    status: "Pending",
    deliveryMan: null,
  },
  {
    date: "24 Apr 25",
    time:"10.30 AM",
    orderNo: "48956486",
    customer: "Bakhtiar Tashar",
    address: "23/2 Jailroad Road, Sylhet",
    vendor: "Luis Vutton",
    price: 480,
    status: "Delivered",
    deliveryMan: "Rabu Sheikh",
  },
  {
    date: "24 Apr 25",
    time:"10.30 AM",
    orderNo: "48956486",
    customer: "Bakhtiar Tashar",
    address: "23/2 Jailroad Road, Sylhet",
    vendor: "Luis Vutton",
    price: 480,
    status: "Shipped",
    deliveryMan: "Rabu Sheikh",
  },
  {
    date: "24 Apr 25",
    time:"10.30 AM",
    orderNo: "48956486",
    customer: "Bakhtiar Tashar",
    address: "23/2 Jailroad Road, Sylhet",
    vendor: "Luis Vutton",
    price: 480,
    status: "Cancelled",
    deliveryMan: "Rabu Sheikh",
  },
  // Add more entries like this
];

const getStatusBadge = (status) => {
  const colorMap = {
    Pending: "bg-yellow-400 text-white",
    Shipped: "bg-blue-500 text-white",
    Delivered: "bg-green-500 text-white",
    Cancelled: "bg-red-500 text-white",
  };
  return (
    <span className={`px-2 py-1 rounded text-sm ${colorMap[status] || ""}`}>
      {status}
    </span>
  );
};

const columns = [
  {
  name: "Date",
  sortable: true,
  cell: (row) => (
    <div>
      <div className="font-medium">{row.date}</div>
      <div className="text-xs text-gray-500">{row.time}</div>
    </div>
  ),
},
  { name: "Order No.", selector: (row) => row.orderNo },
  { name: "Customer", selector: (row) => row.customer },
  {
  name: "Address",
  cell: (row) => (
    <div className="whitespace-normal break-words max-w-[220px]">
      {row.address}
    </div>
  ),
},
  { name: "Vendor", selector: (row) => row.vendor },
  { name: "Price", selector: (row) => row.price },
  {
    name: "Order Status",
    cell: (row) => getStatusBadge(row.status),
  },
  {
    name: "Delivery Man",
    cell: (row) =>
      row.deliveryMan || (
        <button className="text-blue-500 underline">Assign</button>
      ),
  },
  {
    name: "Action",
    cell: (row) => (
      <div className="flex space-x-2">
        <FaEdit className="text-blue-600 cursor-pointer" />
        <FaTrash className="text-red-600 cursor-pointer" />
      </div>
    ),
  },
];

const CompleteOrderList = () => {
  return (
    <div className=" bg-white shadow rounded overflow-y-auto">
      
      <DataTable
        columns={columns}
        data={orders}
        pagination
        highlightOnHover
        responsive
      />
    </div>
  );
};

export default CompleteOrderList;
