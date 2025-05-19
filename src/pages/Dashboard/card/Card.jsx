import { FaShoppingBag, FaTruck, FaMoneyBillWave } from 'react-icons/fa';

const stats = [
  { title: "Today's Orders", value: 33, bgColor: 'bg-gradient-to-r from-[#86D32C] to-[#2E8900]', icon: <FaShoppingBag size={80} /> },
  { title: "Shipped Today", value: 27, bgColor: 'bg-gradient-to-r from-[#6BAAFC] to-[#305FEC]', icon: <FaTruck size={80} /> },
  { title: "Pending Today", value: 6, bgColor: 'bg-gradient-to-r from-[#D623FE] to-[#A530F2]', icon: <FaShoppingBag size={80} /> },
  { title: "Total Orders", value: 98, bgColor: 'bg-gradient-to-r from-[#86D32C] to-[#2E8900]', icon: <FaShoppingBag size={80} /> },
  { title: "Total Shipped", value: 73, bgColor: 'bg-gradient-to-r from-[#6BAAFC] to-[#305FEC]', icon: <FaTruck size={80} /> },
  { title: "Canceled Orders", value: 15, bgColor: 'bg-gradient-to-r from-[#FA6464] to-[#DC2626]', icon: <FaShoppingBag size={80} /> },
  { title: "Sold Today", value: 5100, bgColor: 'bg-gradient-to-r from-[#F8BB21] to-[#FFA100]', icon: <FaMoneyBillWave size={80} /> },
  { title: "Total Sold", value: 98891, bgColor: 'bg-gradient-to-r from-[#F8BB21] to-[#FFA100]', icon: <FaMoneyBillWave size={80} /> },
  { title: "Total Revenue", value: 105400, bgColor: 'bg-gradient-to-r from-[#F8BB21] to-[#FFA100]', icon: <FaMoneyBillWave size={80} /> },
];

const Card = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-5 mt-1">
      {stats.map((item, idx) => (
        <div
          key={idx}
          className={`relative overflow-hidden rounded-xl text-white shadow-md ${item.bgColor} p-1 min-h-[100px] flex  pl-20`}
        >
          {/* Background icon */}
          <div className="absolute opacity-10 text-[100px] left-3 bottom-1 pointer-events-none -rotate-25">
            {item.icon}
          </div>

          {/* Centered content vertically */}
          <div className="relative z-10 flex h-full py-2">
            <p className="text-md font-semibold">{item.title}</p>
            <h2 className="text-[40px] font-bold mt-8">{item.value}</h2>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Card;
