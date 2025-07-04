import React, { useState } from "react";

import DataTable from "react-data-table-component";
import { FaEdit, FaTrash } from "react-icons/fa";
import CreateRider from "./createRider";

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

const PendingOrderList = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleAssignClick = (row) => {
    setSelectedOrder(row); 
    setShowModal(true); 
  };

  console.log("selectedOrder",selectedOrder)

  const orders = [
    {
      date: "26 Apr 25",
      time: "10.30 AM",
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
      time: "10.30 AM",
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
      time: "10.30 AM",
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
      time: "10.30 AM",
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
      time: "10.30 AM",
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
      Pending: "bg-[#FF6600] text-white rounded-full px-3",
      Shipped: "bg-[#A600FF] text-white rounded-full px-3",
      Delivered: "bg-[#13BF00] text-white rounded-full px-3",
      Cancelled: "bg-[#DC2626] text-white rounded-full px-3",
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
      cell: (row) => (
        <div className="text-nowrap">{getStatusBadge(row.status)}</div>
      ),
    },
    {
      name: "Delivery Man",
      cell: (row) =>
        row.deliveryMan || (
          <button
            onClick={() => handleAssignClick(row)}
            className="text-blue-500 underline"
          >
            Assign
          </button>
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
  return (
    <>
      <div className=" bg-white  rounded overflow-y-auto mb-10">
        <DataTable
          columns={columns}
          data={orders}
          pagination
          customStyles={customStyles}
          highlightOnHover
          responsive
        />
      </div>

      {showModal && (
        <CreateRider
          onClose={() => setShowModal(false)}
          // fetchCategory={fetchCategory}
          // onSubmit={handleAddCategory}
        />
      )}
    </>
  );
};

export default PendingOrderList;
