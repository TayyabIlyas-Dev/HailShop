// // "use client";
// // import { ChartComponent } from "@/components/chart";
// // import React from "react";
// // import Dashboard from "./Dashboard";

// // const DashboardCard = () => {
// //   return (
// //     <div className="mt-16">
// //       <div>
// //       <h1 className="text-2xl md:text-3xl font-bold mb- text-center">Admin Dashboard</h1>

// //       </div>
// //       <div className="grid grid-cols-1 mx-4 p-3 md:grid-cols-3 lg:grid-cols-4 mt-5 gap-3">
// //         <div className=" pl-6 pr-3 py-6 mx-1 my-2 text-2xl shadow-md rounded-xl border border-gray-300    hover:scale-[1.02] transition-all duration-500">
// //            <h1 className="text-xl font-semibold">Total Revenue</h1>
// //           <h4 className="text-2xl font-bold">$45,231.89</h4>
// //           <h2 className="text-[13px] text-gray-600 font-semibold">
// //             +20.1% from last month
// //           </h2>
// //         </div>
// //         <div className=" pl-6 pr-3 py-6 mx-1 my-2 text-2xl shadow-md rounded-xl border border-gray-300    hover:scale-[1.02] transition-all duration-500">
// //           <h1 className="text-xl font-semibold">Subscriptions</h1>
// //           <h4 className="text-2xl font-bold">+2350</h4>
// //           <h2 className="text-[13px] text-gray-600 font-semibold">
// //             +180.1% from last month
// //           </h2>
// //         </div>
// //         <div className=" pl-6 pr-3 py-6 mx-1 my-2 text-2xl shadow-md rounded-xl border border-gray-300    hover:scale-[1.02] transition-all duration-500">
// //           <h1 className="text-xl font-semibold">Sales</h1>
// //           <h4 className="text-2xl font-bold">+12,234</h4>
// //           <h2 className="text-[13px] text-gray-600 font-semibold">
// //             +19% from last month
// //           </h2>
// //         </div>
// //         <div className=" pl-6 pr-3 py-6 mx-1 my-2 text-2xl shadow-md rounded-xl border border-gray-300    hover:scale-[1.02] transition-all duration-500">
// //           <h1 className="text-xl font-semibold">Active Now</h1>
// //           <h4 className="text-2xl  font-bold">+573</h4>
// //           <h2 className="text-[13px] text-gray-600 font-semibold">
// //             +201 since last hour
// //           </h2>
// //         </div>
// //       </div>
// //       <div className=" mx-5 py-5 block md:flex">
// //         <div className="w-full p-3  ">
// //           <ChartComponent />
// //         </div>
// //         <div className=" overflow-x-auto h-full custom-scrollbar">
// //           <Dashboard />
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default DashboardCard;

// "use client";
// import { ChartComponent } from "@/components/chart";
// import React, { useEffect, useState } from "react";
// import Dashboard from "./Dashboard";
// import { client } from "@/src/sanity/lib/client";

// const DashboardCard = () => {
//   const [totalOrdersQuantity, setTotalOrdersQuantity] = useState(0);

//   useEffect(() => {
//     const fetchTotalOrdersQuantity = async () => {
//       try {
//         const data = await client.fetch(
//           `*[_type=="order"]{ totalQuantity }`
//         );
//         const total = data.reduce((sum: number, order: { totalQuantity: number }) => sum + order.totalQuantity, 0);
//         setTotalOrdersQuantity(total);
//       } catch (error) {
//         console.error("Error fetching total order quantity:", error);
//       }
//     };

//     fetchTotalOrdersQuantity();
//   }, []);

//   return (
//     <div className="mt-16">
//       <div>
//         <h1 className="text-2xl md:text-3xl font-bold mb- text-center">Admin Dashboard</h1>
//       </div>
//       <div className="grid grid-cols-1 mx-4 p-3 md:grid-cols-3 lg:grid-cols-4 mt-5 gap-3">
//         <div className="pl-6 pr-3 py-6 mx-1 my-2 text-2xl shadow-md rounded-xl border border-gray-300 hover:scale-[1.02] transition-all duration-500">
//           <h1 className="text-xl font-semibold">Total Revenue</h1>
//           <h4 className="text-2xl font-bold">$45,231.89</h4>
//           <h2 className="text-[13px] text-gray-600 font-semibold">+20.1% from last month</h2>
//         </div>
//         <div className="pl-6 pr-3 py-6 mx-1 my-2 text-2xl shadow-md rounded-xl border border-gray-300 hover:scale-[1.02] transition-all duration-500">
//           <h1 className="text-xl font-semibold">Subscriptions</h1>
//           <h4 className="text-2xl font-bold">+2350</h4>
//           <h2 className="text-[13px] text-gray-600 font-semibold">+180.1% from last month</h2>
//         </div>
//         <div className="pl-6 pr-3 py-6 mx-1 my-2 text-2xl shadow-md rounded-xl border border-gray-300 hover:scale-[1.02] transition-all duration-500">
//           <h1 className="text-xl font-semibold">Sales</h1>
//           <h4 className="text-2xl font-bold">+{totalOrdersQuantity}</h4> {/* Dynamic Data */}
//           <h2 className="text-[13px] text-gray-600 font-semibold">+19% from last month</h2>
//         </div>
//         <div className="pl-6 pr-3 py-6 mx-1 my-2 text-2xl shadow-md rounded-xl border border-gray-300 hover:scale-[1.02] transition-all duration-500">
//           <h1 className="text-xl font-semibold">Active Now</h1>
//           <h4 className="text-2xl font-bold">+573</h4>
//           <h2 className="text-[13px] text-gray-600 font-semibold">+201 since last hour</h2>
//         </div>
//       </div>
//       <div className="mx-5 py-5 block md:flex">
//         <div className="w-full p-3">
//           <ChartComponent />
//         </div>
//         <div className="overflow-x-auto h-full custom-scrollbar">
//           <Dashboard />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DashboardCard;








// real


// "use client";
// import { ChartComponent } from "@/components/chart";
// import React, { useEffect, useState } from "react";
// import Dashboard from "./Dashboard";
// import { client } from "@/src/sanity/lib/client";

// const DashboardCard = () => {
//   const [totalRevenue, setTotalRevenue] = useState(0);
//   const [totalSales, setTotalSales] = useState(0);

//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const data = await client.fetch(
//           `*[_type=="order"]{ totalPrice, totalQuantity }`
//         );

//         // Calculate total revenue
//         const revenue = data.reduce((acc: number, order: { totalPrice: number }) => acc + order.totalPrice, 0);
//         setTotalRevenue(revenue);

//         // Calculate total sales
//         const sales = data.reduce((acc: number, order: { totalQuantity: number }) => acc + order.totalQuantity, 0);
//         setTotalSales(sales);
//       } catch (error) {
//         console.error("Error fetching orders:", error);
//       }
//     };

//     fetchOrders();
//   }, []);

//   return (
//     <div className="pt-4">
//       <div>
//         <h1 className="text-2xl md:text-3xl font-bold px-9 text-start">
//           Admin Dashboard
//         </h1>
//       </div>
//       <div className="grid grid-cols-1 mx-4 p-3 md:grid-cols-3 lg:grid-cols-4 mt-5 gap-3">
//         <div className="pl-6 pr-3 py-6 mx-1 my-2 text-2xl shadow-md rounded-xl border border-gray-300 hover:scale-[1.02] transition-all duration-500">
//           <h1 className="text-xl font-semibold">Total Revenue</h1>
//           <h4 className="text-2xl font-bold">${totalRevenue.toFixed(2)}</h4>
//           <h2 className="text-[13px] text-gray-600 font-semibold">
//             +20.1% from last month
//           </h2>
//         </div>
//         <div className="pl-6 pr-3 py-6 mx-1 my-2 text-2xl shadow-md rounded-xl border border-gray-300 hover:scale-[1.02] transition-all duration-500">
//           <h1 className="text-xl font-semibold">Subscriptions</h1>
//           <h4 className="text-2xl font-bold">+2350</h4>
//           <h2 className="text-[13px] text-gray-600 font-semibold">
//             +18.1% from last month
//           </h2>
//         </div>
//         <div className="pl-6 pr-3 py-6 mx-1 my-2 text-2xl shadow-md rounded-xl border border-gray-300 hover:scale-[1.02] transition-all duration-500">
//           <h1 className="text-xl font-semibold">Sales</h1>
//           <h4 className="text-2xl font-bold">+{totalSales}</h4>
//           <h2 className="text-[13px] text-gray-600 font-semibold">
//             +19% from last month
//           </h2>
//         </div>
//         <div className="pl-6 pr-3 py-6 mx-1 my-2 text-2xl shadow-md rounded-xl border border-gray-300 hover:scale-[1.02] transition-all duration-500">
//           <h1 className="text-xl font-semibold">Active Now</h1>
//           <h4 className="text-2xl font-bold">+573</h4>
//           <h2 className="text-[13px] text-gray-600 font-semibold">
//             +201 since last hour
//           </h2>
//         </div>
//       </div>
//       <div className="mx-5 py-5 block md:flex">
//         <div className="w-[400px] p-3">
//           <ChartComponent />
//         </div>
//         <div className="overflow-x-auto pt-1 h-full custom-scrollbar">
//           <Dashboard />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DashboardCard;









































// code 3
"use client";
import { ChartComponent } from "@/components/chart";
import React, { useEffect, useState } from "react";
import Dashboard from "./Dashboard";
import { client } from "@/src/sanity/lib/client";
import RecentSales from "./RecentSales";
import { order } from "@/src/sanity/schemaTypes/order";


const DashboardCard = () => {
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalSales, setTotalSales] = useState(0);
  const [activeOrders, setActiveOrders] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);

  const fetchReviews = async () => {
    try {
      const allReviews = await client.fetch(`count(*[_type=="review"])`);
      setTotalReviews(allReviews);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };
  
  useEffect(() => {
    fetchReviews();
  
    const subscription = client.listen(`*[_type == "review"]`).subscribe(() => {
      fetchReviews();
    });
  
    return () => subscription.unsubscribe();
  }, []);
  
  // ✅ Fetch All Orders
  const fetchOrders = async () => {
    try {
      // ✅ Fetch All Orders (For Total Sales & Revenue)
      const allOrders = await client.fetch(
        `*[_type=="order"]{ totalPrice, totalQuantity, productStatus }`
      );

      // ✅ Fetch Only Active Orders (Not Delivered)
      const activeOrdersData = await client.fetch(
        `*[_type=="order" && productStatus != "Delivered"]{ productStatus }`
      );

      // ✅ Calculate Total Revenue
      setTotalRevenue(
        allOrders.reduce((acc: number, order: { totalPrice: number }) => acc + order.totalPrice, 0)
      );

      // ✅ Calculate Total Sales (All Orders Counted)
      setTotalSales(
        allOrders.reduce((acc: number, order: { totalQuantity: number }) => acc + order.totalQuantity, 0)
      );

      // ✅ Set Active Orders (Only Orders Not Delivered)
      setActiveOrders(activeOrdersData.length);

    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    fetchOrders(); // ✅ Initial Fetch

    // ✅ Real-time Listener (Auto-update on any change)
    const subscription = client.listen(`*[_type == "order"]`).subscribe(() => {
      fetchOrders(); // ✅ Fetch Latest Orders when any change happens
    });

    return () => subscription.unsubscribe(); // ✅ Cleanup
  }, []);
  
  return (


    <div className="pt-4">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold px-9 text-start">
          Admin Dashboard
        </h1>
      </div>
      <div className="grid grid-cols-1 mx-4 p-3 md:grid-cols-3 lg:grid-cols-4 mt-5 gap-3">
        <div className="pl-6 pr-3 py-6 mx-1 my-2 text-2xl shadow-md rounded-xl border border-gray-300 hover:scale-[1.02] transition-all duration-500">
          <h1 className="text-xl font-semibold">Total Revenue</h1>
          <h4 className="text-2xl font-bold"><span className="text-green-300">$ </span>{Math.floor(totalRevenue)}</h4>

          <h2 className="text-[13px] text-gray-600 font-semibold">
            +20.1% from last month
          </h2>
        </div>
        <div className="pl-6 pr-3 py-6 mx-1 my-2 text-2xl shadow-md rounded-xl border border-gray-300 hover:scale-[1.02] transition-all duration-500">
          <h1 className="text-xl font-semibold">Reviews</h1>
          <h4 className="text-2xl font-bold">+{totalReviews}</h4>
          <h2 className="text-[13px] text-gray-600 font-semibold">
            +18.1% from last month
          </h2>
        </div>
        <div className="pl-6 pr-3 py-6 mx-1 my-2 text-2xl shadow-md rounded-xl border border-gray-300 hover:scale-[1.02] transition-all duration-500">
          <h1 className="text-xl font-semibold">Sales</h1>
          <h4 className="text-2xl font-bold">+{totalSales}</h4>
          <h2 className="text-[13px] text-gray-600 font-semibold">
            +19% from last month
          </h2>
        </div>
        <div className="pl-6 pr-3 py-6 mx-1 my-2 text-2xl shadow-md rounded-xl border border-gray-300 hover:scale-[1.02] transition-all duration-500">
          <h1 className="text-xl font-semibold">Active Now</h1>
          <h4 className="text-2xl font-bold">{activeOrders}</h4>
          <h2 className="text-[13px] text-gray-600 font-semibold">
            201 since last month
          </h2>
        </div>
      </div>
      <div className="mx-5 py-5 block md:flex">
        <div className="sm:w-[500px] w-[310px] transition-all hover:scale-[1.015] duration-700 p-3">
          <ChartComponent />
        </div>
        {/* Dashboard component wrapped in a container with class "limited-view" */}
        <div className=" px-2 py-1 w-full transition-all hover:scale-[1.01] duration-700 ">
          <RecentSales />
        </div>
      </div>
      
    </div>
  );
};

export default DashboardCard;
