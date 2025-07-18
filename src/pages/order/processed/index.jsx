import React, { useCallback, useEffect, useState } from "react";

import DataTable from "react-data-table-component";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";

import { NetworkServices } from "../../../network";
import { networkErrorHandeller } from "../../../utils/helpers";
import ListSkeleton from "../../../components/loading/ListLoading";
import CreateRider from "../../../components/createRider/createRider";
import { Link } from "react-router-dom";

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

const ProcessedOrderList = () => {
  const [showModal, setShowModal] = useState(false);
  // const [selectedOrder, setSelectedOrder] = useState(null);
  // const [detailsModal, setDetailsModal] = useState(false);
  // const [selectedDetails, setSelectedDetails] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [totalRows, setTotalRows] = useState(0);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  console.log("dataaaaa", data);

  const handlePageChange = (page) => {
    if (!loading) {
      setCurrentPage(page);
    }
  };

  const handleRowsPerPageChange = (newPerPage, page) => {
    setPerPage(newPerPage);
    setCurrentPage(page);
  };

  const handleAssignClick = (row) => {
    // setSelectedOrder(row);
    setShowModal(true);
  };

  // const handleDetails = (row) => {
  //   setSelectedDetails(row);
  //   setDetailsModal(true);
  // };

  const fetchOrder = useCallback(async () => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams();
      queryParams.append("page", currentPage);
      queryParams.append("per_page", perPage);
      queryParams.append("order_status", "processing");
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
  }, [currentPage, perPage]);

  useEffect(() => {
    fetchOrder();
  }, [fetchOrder]);

  const getStatusBadge = (status) => {
    const colorMap = {
      pending: "bg-[#FF6600] text-white rounded-full px-3",
      shipped: "bg-[#A600FF] text-white rounded-full px-3",
      delivered: "bg-[#13BF00] text-white rounded-full px-3",
      cancelled: "bg-[#DC2626] text-white rounded-full px-3",
      processing: "bg-[#3ABFEF] text-white rounded-full px-3",
    };
    return (
      <span className={`px-2 py-1 rounded text-sm ${colorMap[status] || ""}`}>
        {status}
      </span>
    );
  };

  const columns = [
    { name: "Order No.", selector: (row) => ` #${row.id}` },
    {
      name: "Date",
      sortable: true,
      cell: (row) => {
        const date = new Date(row.created_at).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "2-digit",
        });

        return <div className="font-medium">{date}</div>;
      },
    },

    { name: "Customer", selector: (row) => row?.user?.name },
    {
      name: "Phone",
      cell: (row) => (
        <div className="whitespace-normal break-words ">{row?.user?.phone}</div>
      ),
    },

    { name: "Price", selector: (row) => row.total_amount },

    {
      name: "Order Status",
      cell: (row) => (
        <div className="text-nowrap">{getStatusBadge(row?.order_status)}</div>
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
          <Link to={`/dashboard/processed-order/${row.id}`} title="Show Details">
            <button className="text-blue-600 text-xl cursor-pointer">
               <FaEye />
            </button>
          </Link>
        </div>
      ),
    },
  ];
  useEffect(() => {
    document.title = "Admin | Processed-Order";
  }, []);

  return (
    <div className=" bg-white  rounded overflow-y-auto mb-10">
      {loading ? (
        <ListSkeleton />
      ) : (
        <DataTable
          columns={columns}
          data={data}
          customStyles={customStyles}
          pagination
          highlightOnHover
          responsive
          paginationServer
          paginationTotalRows={totalRows}
          paginationPerPage={perPage}
          onChangePage={handlePageChange}
          onChangeRowsPerPage={handleRowsPerPageChange}
          paginationDefaultPage={currentPage}
        />
      )}
      {showModal && (
        <CreateRider
          onClose={() => setShowModal(false)}
          // fetchCategory={fetchCategory}
          // onSubmit={handleAddCategory}
        />
      )}

    </div>
  );
};

export default ProcessedOrderList;
