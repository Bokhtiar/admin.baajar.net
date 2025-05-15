import { DashboardLayout } from "../layouts/dashboard.layout";
import CategoryTable from "../pages/category/allcategory";
import SubCategoryTable from "../pages/category/subcategory";

import Dashboard from "../pages/Dashboard/Dashboard";
import AllOrderList from "../pages/order/all-order";
import CanceledOrderList from "../pages/order/canceled-order";
import CompleteOrderList from "../pages/order/completed-order";
import PendingOrderList from "../pages/order/pending-order";
import ProcessedOrderList from "../pages/order/processed";
import ShippedOrderList from "../pages/order/Shipped-orders";
// import { getToken } from "../utils/helpers";

 
const appRoutes = [
  {
    path: "dashboard",
    element: <DashboardLayout />,
     children:[
      { index:true, element:  <Dashboard></Dashboard> },
      // category
      { path:"all-category", element:  <CategoryTable/> },
      //sub  category
      { path:"sub-category", element:  <SubCategoryTable/> },
      // order
      // all order
      { path:"all-order", element:  <AllOrderList/> },
      // pending order
      { path:"pending-order", element:  <PendingOrderList/> },
      // processed order
      { path:"processed-order", element:  <ProcessedOrderList/> },
      // shipped-order 
      { path:"shipped-order", element:  <ShippedOrderList/> },
      // complete-order 
      { path:"complete-order", element:  <CompleteOrderList/> },
      // canceled-order 
      { path:"canceled-order", element:  <CanceledOrderList/> },
       
     ]
  },
];

/* Generate permitted routes */
export const permittedRoutes = () => {
  // const token = getToken();

  // if (token) {
    return appRoutes;
  // }

  // return [];
};