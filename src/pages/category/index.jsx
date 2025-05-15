// import React, { useState } from "react";
// import DataTable from "react-data-table-component";
// import { FaEdit, FaTrash } from "react-icons/fa";

// const initialData = [
//   { id: 1, name: "Groceries", emoji: "🍎", products: 925, status: true },
//   { id: 2, name: "Meats", emoji: "🥩", products: 825, status: true },
//   { id: 3, name: "Dairy Products", emoji: "🥛", products: 787, status: true },
//   { id: 4, name: "Breads & Bakery", emoji: "🍞", products: 632, status: true },
//   { id: 5, name: "Beverages", emoji: "☕", products: 879, status: true },
//   { id: 6, name: "Frozen Foods", emoji: "❄️", products: 453, status: true },
// ];

// export default function CategoryTable() {
//   const [data, setData] = useState(initialData);
//   const [search, setSearch] = useState("");

//   const handleToggle = (id) => {
//     setData((prev) =>
//       prev.map((item) =>
//         item.id === id ? { ...item, status: !item.status } : item
//       )
//     );
//   };

//   const handleDelete = (id) => {
//     setData((prev) => prev.filter((item) => item.id !== id));
//   };

//   const filteredData = data.filter((item) =>
//     item.name.toLowerCase().includes(search.toLowerCase())
//   );

//   const columns = [
//     {
//       name: "SN.",
//       selector: (row, index) => String(index + 1).padStart(2, "0") + ".",
//       width: "70px",
//     },
//     {
//       name: "Image",
//       selector: (row) => row.emoji,
//       width: "80px",
//       cell: (row) => <span className="text-2xl">{row.emoji}</span>,
//     },
//     {
//       name: "Name",
//       selector: (row) => row.name,
//       sortable: true,
//     },
//     {
//       name: "Available Products",
//       selector: (row) => row.products,
//       sortable: true,
//     },
//     {
//       name: "Status",
//       cell: (row) => (
//         <button
//           onClick={() => handleToggle(row.id)}
//           className={`w-10 h-6 rounded-full flex items-center px-1 transition ${
//             row.status ? "bg-green-500" : "bg-gray-300"
//           }`}
//         >
//           <div
//             className={`w-4 h-4 bg-white rounded-full transform transition-transform ${
//               row.status ? "translate-x-4" : ""
//             }`}
//           ></div>
//         </button>
//       ),
//     },
//     {
//       name: "Action",
//       cell: (row) => (
//         <div className="flex gap-2 text-lg">
//           <button className="text-blue-600 hover:text-blue-800">
//             <FaEdit />
//           </button>
//           <button
//             className="text-red-500 hover:text-red-700"
//             onClick={() => handleDelete(row.id)}
//           >
//             <FaTrash />
//           </button>
//         </div>
//       ),
//     },
//   ];

//   return (
//     <div className="p-6 max-w-6xl mx-auto">
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-xl font-semibold text-red-600">All Categories</h2>
//         <div className="flex gap-2">
//           <input
//             type="text"
//             placeholder="🔍 Search"
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             className="border px-3 py-2 rounded w-64"
//           />
//           <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
//             + Add New
//           </button>
//         </div>
//       </div>

//       <DataTable
//         columns={columns}
//         data={filteredData}
//         pagination
//         responsive
//         highlightOnHover
//         striped
//       />
//     </div>
//   );
// }
