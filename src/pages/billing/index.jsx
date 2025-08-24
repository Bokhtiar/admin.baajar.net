import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import BillingCard from "./billCard";
import Header from "../../components/heading/heading";

export default function BillingList() {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  // Dummy Payment Data
  const [data, setData] = useState([
    {
      id: 1,
      userName: "John Doe",
      email: "john@example.com",
      phone: "+880123456789",
      orderId: "ORD-1001",
      paymentMethod: "bKash",
      transactionId: "TX12345678",
      amount: 2500,
      status: "Paid",
      date: "2025-08-20 14:32",
    },
    {
      id: 2,
      userName: "Jane Smith",
      email: "jane@example.com",
      phone: "+8801987654321",
      orderId: "ORD-1002",
      paymentMethod: "Visa Card",
      transactionId: "TX87654321",
      amount: 1500,
      status: "Pending",
      date: "2025-08-21 10:15",
    },
    {
      id: 3,
      userName: "Rahim Uddin",
      email: "rahim@example.com",
      phone: "+880177778888",
      orderId: "ORD-1003",
      paymentMethod: "Nagad",
      transactionId: "TX99887766",
      amount: 3200,
      status: "Paid",
      date: "2025-08-22 19:05",
    },
  ]);

  const columns = [
    { name: "SN.", selector: (row, index) => index + 1, width: "60px" },
    { name: "Customer Name", selector: (row) => row.userName, sortable: true },
    { name: "Email", selector: (row) => row.email },
    { name: "Phone", selector: (row) => row.phone },
    { name: "Order ID", selector: (row) => row.orderId },
    { name: "Payment Method", selector: (row) => row.paymentMethod },
    { name: "Transaction ID", selector: (row) => row.transactionId },
    { name: "Amount", selector: (row) => `${row.amount} ৳`, sortable: true },
    {
      name: "Status",
      selector: (row) => (
        <span
          className={`px-2 py-1 rounded text-white ${
            row.status === "Paid" ? "bg-green-500" : "bg-yellow-500"
          }`}
        >
          {row.status}
        </span>
      ),
    },
    { name: "Date", selector: (row) => row.date },
  ];

  const customStyles = {
    headCells: {
      style: {
        fontWeight: "500",
        fontSize: "14px",
        color: "#4B5563",
      },
    },
  };

  useEffect(() => {
    document.title = "Admin | Billing";
  }, []);

  return (
    <>
      <BillingCard />
      <div className="mt-3">
        <Header
          title="Billing & Payments"
          searchValue={search}
          onSearchChange={(value) => setSearch(value)}
        />

        <div className="bg-white rounded overflow-y-auto mb-10 p-3">
          <DataTable
            columns={columns}
            data={data}
            customStyles={customStyles}
            pagination
            responsive
            highlightOnHover
          />
        </div>
      </div>
    </>
  );
}
