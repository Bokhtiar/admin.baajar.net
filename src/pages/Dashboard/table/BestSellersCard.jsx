
import { FaShoppingBag, FaGlassWhiskey, FaMobileAlt, FaCoffee } from "react-icons/fa";

const bestSellers = [
  {
    name: "Luis Vuitton",
    orders: 71,
    sold: 14409,
    profit: 1800,
    icon: <FaShoppingBag />,
  },
  {
    name: "Akij Beverage",
    orders: 53,
    sold: 11396,
    profit: 1300,
    icon: <FaGlassWhiskey />,
  },
  {
    name: "Mango Electronics",
    orders: 47,
    sold: 10243,
    profit: 1100,
    icon: <FaMobileAlt />,
  },
  { name: "LadyInn", orders: 30, sold: 6636, profit: 980, icon: <FaCoffee /> },
];

const BestSellersCard = () => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md shadow-[#3326AE14] w-full ">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Best Sellers</h2>
        <button className="text-sm text-blue-500">More →</button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="text-gray-500 border-b border-gray-200">
              <th className="pb-2">Product</th>
              <th>Orders</th>
              <th>Sold</th>
              <th>Profit</th>
            </tr>
          </thead>
          <tbody>
            {bestSellers.map((item, index) => (
              <tr
                key={index}
                className="border-b border-gray-200 hover:bg-gray-50 "
              >
                <td className="py-2 flex items-center gap-2">
                  <span className="bg-gray-200 p-2 rounded-full text-lg text-gray-700">
                    {item.icon}
                  </span>
                  {item.name}
                </td>
                <td>{item.orders}</td>
                <td>{item.sold}</td>
                <td>${item.profit}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BestSellersCard;
