import Card from "./card/Card";
import SalesByDateChart from "./Chart/SalesByDateChart";
import BestSellersCard from "./table/BestSellersCard";
import TrafficCard from "./Chart/TrafficCard";
import { useEffect } from "react";
import UpdateCard from "./card/UpdateCard";
import ActiveClient from "./Chart/ActiveClient";
import NewClient from "./Chart/NewClient";

const Dashboard = () => {
  useEffect(() => {
    document.title = "Admin | Dashboard";
  }, []);
  return (
    <div className="pb-10">
      {/* <Card /> */}
      <UpdateCard/>

      <div className="mt-5">
        <SalesByDateChart />
      </div>
      

      <div className="grid grid-cols-1 md:grid-cols-2 mt-5 gap-4 ">
        {/* <BestSellersCard /> */}
        <ActiveClient/>
        <NewClient/>
        <BestSellersCard/>
      
        {/* <TrafficCard /> */}
      </div>
    </div>
  );
};

export default Dashboard;
