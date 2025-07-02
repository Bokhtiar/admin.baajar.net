import React, { useCallback, useEffect, useState } from "react";

import DataTable from "react-data-table-component";
import { FaEdit, FaTrash } from "react-icons/fa";
import CreateRider from "../pending-order/createRider";
import { NetworkServices } from "../../../network";
import { networkErrorHandeller } from "../../../utils/helpers";

const AllOrderList = () => {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [totalRows, setTotalRows] = useState(0);
  const [data, setData] = useState([]);

  const handleAssignClick = (row) => {
    setSelectedOrder(row);
    setShowModal(true);
  };

  console.log("selectedOrder", selectedOrder);
  console.log("data", data);

    // Fetch categories from API
    const fetchOrder = useCallback(async () => {
      setLoading(true);
      try {
        const queryParams = new URLSearchParams();
        queryParams.append("page", currentPage);
        queryParams.append("per_page", perPage);
        const response = await NetworkServices.Order.index(
          queryParams.toString()
        );
        console.log("res", response);
  
        if (response?.status === 200) {
          setData(response?.data?.data?.data || []);
          setTotalRows(response?.data?.data?.total || 0);
        }
      } catch (error) {
        // console.log(error);
        networkErrorHandeller(error);
      }
      setLoading(false);
    }, [currentPage,perPage]);
  
    useEffect(() => {
      fetchOrder();
    }, [fetchOrder]);



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
    { name: "Order No.", selector: (row) => row.id },
    { name: "Customer", selector: (row) => row?.user?.name },
    {
      name: "Phone",
      cell: (row) => (
        <div className="whitespace-normal break-words max-w-[220px]">
          {row?.user?.phone}
        </div>
      ),
    },
    { name: "Vendor", selector: (row) => row.sub_orders[0].vendor.company_name },
    { name: "Price", selector: (row) => row.total_amount
 },

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
          <button  onClick={() => handleAssignClick(row)} className="text-blue-500 underline">Assign</button>
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
  return (
    <>
      <div className=" bg-white  rounded overflow-y-auto mb-10">
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
        <CreateRider
          onClose={() => setShowModal(false)}
          // fetchCategory={fetchCategory}
          // onSubmit={handleAddCategory}
        />
      )}
    </>
  );
};

export default AllOrderList;
