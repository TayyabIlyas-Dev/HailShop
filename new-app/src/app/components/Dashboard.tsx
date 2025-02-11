

// working

"use client";

import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import { client } from "@/src/sanity/lib/client";
import { urlForImage } from "@/src/sanity/lib/image";
import toast from "react-hot-toast";
import { FaCheck, FaTimes } from "react-icons/fa";


interface Order {
  _id: string;
  fullName: string;
  email: string;
  city: string;
  productStatus: string;
  totalPrice: number;
  totalQuantity: number;
  orderDate: string;
  cartItems: {
    product: {
      name?: string;
      image?: string[];
      price?: number;
    };
    productQty: number;
  }[];
}

const Dashboard: React.FC = () => {
  const { user, isLoaded } = useUser();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  useEffect(() => {
    if (!isLoaded) return;
    if (user?.publicMetadata?.role !== "admin") return;

    const fetchOrders = async () => {
      try {
        const data = await client.fetch(
          `*[_type=="order"]{
            _id, fullName, email,productStatus ,city, totalPrice, totalQuantity, orderDate,
            cartItems[] {
              product->{name, "image": image[].asset._ref, price}, productQty
            }
          }`
        );
        setOrders(data || []);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [isLoaded, user]);

  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    try {
      await client.patch(orderId).set({ productStatus: newStatus }).commit();

      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, productStatus: newStatus } : order
        )
      );
      showToast("Order status updated successfully!", "success");

    } catch (error) {
      console.error("Error updating status:", error);
      showToast("Failed to update order status!", "error");    }
  };

  if (!isLoaded) return <p>Loading user...</p>;
  if (user?.publicMetadata?.role !== "admin") return <p>Access Denied</p>;


  const showToast = (message: string, type: "success" | "error") => {
    toast(message, {
      icon: type === "success" ? <FaCheck className="text-white" /> : <FaTimes className="text-white" />,
      style: {
        borderRadius: "5px",
        background: type === "success" ? "#0b0b0b" : "#0b0b0b",
        color: "white",
        padding: "12px 20px",
        marginTop:"40px",
        
        fontWeight: "bold",
      },
    });
  };
  return (
    <div className="p-2 overflow-x-auto w-full ">
      <Card className="overflow-y-auto py-3 shadow-sm text-xs h-[350px]">
        <div className="font-semibold text-2xl  py-6 text-center">
          Order Details
        </div>
        <CardContent>
          {loading ? (
            <Skeleton className="h-40 w-full" />
          ) : (
            <div className="overflow-x-auto">
              <Table className="min-w-full">
                <TableHeader>
                  <TableRow className="font-black text-sm">
                    <TableHead className="text-start">Order ID</TableHead>
                    <TableHead className="text-start">Customer</TableHead>
                    <TableHead className="text-start">Email</TableHead>
                    <TableHead className="text-center">City</TableHead>
                    <TableHead className="text-center">Total Price</TableHead>
                    <TableHead className="text-center">Total Quantity</TableHead>
                    <TableHead className="text-center">Status</TableHead>
                    <TableHead className="text-center">Order Date</TableHead>
                    <TableHead className="text-center">Products</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.map((order) => (
                    <React.Fragment key={order._id}>
                      <TableRow
                        onClick={() =>
                          setExpandedOrder(
                            expandedOrder === order._id ? null : order._id
                          )
                        }
                        className="cursor-pointer"
                      >
                        <TableCell className="text-start text-xs">{order._id}</TableCell>
                        <TableCell className="text-start">{order.fullName}</TableCell>
                        <TableCell className="text-start">{order.email}</TableCell>
                        <TableCell className=" text-center">{order.city}</TableCell>
                        <TableCell className="text-center">${order.totalPrice}</TableCell>
                        <TableCell className="w-5 text-center">{order.totalQuantity}</TableCell>
                        <TableCell className="text-center">
                          <select
                            value={order.productStatus}
                            onChange={(e) =>
                              updateOrderStatus(order._id, e.target.value)
                            }
                            className={`font-semibold p-1 rounded ${
                              order.productStatus === "Pending"
                                ? "text-red-600"
                                : order.productStatus === "Dispatch"
                                  ? "text-blue-600"
                                  : order.productStatus === "Delivered"
                                    ? "text-green-600"
                                    : "text-red-600"
                            }`}
                          >
                            <option value="Pending" className="text-red-600">
                              Pending
                            </option>
                            <option value="Dispatch" className="text-blue-600">
                              Dispatch
                            </option>
                            <option
                              value="Delivered"
                              className="text-green-600"
                            >
                              Delivered
                            </option>
                          </select>
                        </TableCell>

                        <TableCell className="text-center">
                          {new Date(order.orderDate).toLocaleDateString()}
                        </TableCell>
                        <TableCell className="text-center w-6">
                          {expandedOrder === order._id ? "▲" : "▼"}
                        </TableCell>
                      </TableRow>
                      {expandedOrder === order._id && (
                        <TableRow>
                          <TableCell colSpan={9} className="text-center">
                            <div className="flex flex-col md:flex-row md:flex-wrap gap-4 p-2">
                              {order.cartItems.length > 0 ? (
                                order.cartItems.map((item, index) => (
                                  <div
                                    key={index}
                                    className="flex items-center space-x-4 p-2 border-b w-full md:w-1/2"
                                  >
                                    {item.product?.image &&
                                    item.product.image.length > 0 ? (
                                      <Image
                                        src={urlForImage(
                                          item.product.image[0]
                                        ).url()}
                                        alt={
                                          item.product.name || "Product Image"
                                        }
                                        width={140}
                                        height={100}
                                        className="object-contain p-2 h-16 sm:h-32 md:h-20 lg:h-32 border mx-auto rounded-xl hover:cursor-pointer hover:shadow-md hover:scale-105 transition-transform duration-500"
                                      />
                                    ) : (
                                      <div className="w-16 h-16 bg-gray-200 flex items-center justify-center rounded">
                                        No Image
                                      </div>
                                    )}
                                    <div>
                                      <p className="font-semibold">
                                        {item.product?.name || "No Title"}
                                      </p>
                                      <p>Quantity: {item.productQty}</p>
                                      <p className="text-sm text-gray-700">
                                        Price:{" "}
                                        <span className="text-green-500">
                                          ${" "}
                                        </span>{" "}
                                        {item.product?.price ?? "N/A"}
                                      </p>
                                    </div>
                                  </div>
                                ))
                              ) : (
                                <p>No Products</p>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      )}
                    </React.Fragment>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;








// "use client";

// import React, { useEffect, useState } from "react";
// import { useUser } from "@clerk/nextjs";
// import { Card, CardContent } from "@/components/ui/card";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { Skeleton } from "@/components/ui/skeleton";
// import Image from "next/image";
// import { client } from "@/src/sanity/lib/client";
// import { urlForImage } from "@/src/sanity/lib/image";
// import { toast } from "react-hot-toast";

// interface Order {
//   _id: string;
//   fullName: string;
//   email: string;
//   city: string;
//   productStatus: string;
//   totalPrice: number;
//   totalQuantity: number;
//   orderDate: string;
//   cartItems: {
//     product: {
//       name?: string;
//       image?: string[];
//       price?: number;
//     };
//     productQty: number;
//   }[];
// }

// const showToast = (message: string, type: "success" | "error") => {
//   toast(message, {
//     icon: type === "success" ? "✅" : "❌",
//     style: {
//       borderRadius: "8px",
//       background: type === "success" ? "#4CAF50" : "#F44336",
//       color: "white",
//       padding: "12px 20px",
//       fontWeight: "bold",
//     },
//   });
// };

// const Dashboard: React.FC = () => {
//   const { user, isLoaded } = useUser();
//   const [orders, setOrders] = useState<Order[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

//   useEffect(() => {
//     if (!isLoaded) return;
//     if (user?.publicMetadata?.role !== "admin") return;

//     const fetchOrders = async () => {
//       try {
//         const data = await client.fetch(
//           `*[_type=="order"]{
//             _id, fullName, email,productStatus ,city, totalPrice, totalQuantity, orderDate,
//             cartItems[] {
//               product->{name, "image": image[].asset._ref, price}, productQty
//             }
//           }`
//         );
//         setOrders(data || []);
//       } catch (error) {
//         console.error("Error fetching orders:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchOrders();
//   }, [isLoaded, user]);

//   const updateOrderStatus = async (orderId: string, newStatus: string) => {
//     const confirmChange = window.confirm(
//       `Are you sure you want to change the status to ${newStatus}?`
//     );
//      if (!confirmChange) return;

//     try {
//       await client.patch(orderId).set({ productStatus: newStatus }).commit();
//       setOrders((prevOrders) =>
//         prevOrders.map((order) =>
//           order._id === orderId ? { ...order, productStatus: newStatus } : order
//         )
//       );
      // showToast("Order status updated successfully!", "success");
//     } catch (error) {
      // console.error("Error updating status:", error);
      // showToast("Failed to update order status!", "error");
//     }
//   };

//   if (!isLoaded) return <p>Loading user...</p>;
//   if (user?.publicMetadata?.role !== "admin") return <p>Access Denied</p>;

//   return (
//     <div className="p-2 overflow-x-auto w-full">
//       <Card className="overflow-y-auto py-3 shadow-sm text-xs h-[350px]">
//         <div className="font-semibold text-2xl text-center py-6">Order Details</div>
//         <CardContent>
//           {loading ? (
//             <Skeleton className="h-40 w-full" />
//           ) : (
//             <div className="overflow-x-auto">
//               <Table className="min-w-full">
//                 <TableHeader>
//                   <TableRow className="font-black text-xs">
//                     <TableHead>Order ID</TableHead>
//                     <TableHead>Customer</TableHead>
//                     <TableHead>Email</TableHead>
//                     <TableHead>City</TableHead>
//                     <TableHead>Total Price</TableHead>
//                     <TableHead>Total Quantity</TableHead>
//                     <TableHead>Status</TableHead>
//                     <TableHead>Order Date</TableHead>
//                     <TableHead>Products</TableHead>
//                   </TableRow>
//                 </TableHeader>
//                 <TableBody>
//                   {orders.map((order) => (
//                     <React.Fragment key={order._id}>
//                       <TableRow
//                         onClick={() =>
//                           setExpandedOrder(
//                             expandedOrder === order._id ? null : order._id
//                           )
//                         }
//                         className="cursor-pointer"
//                       >
//                         <TableCell>{order._id}</TableCell>
//                         <TableCell>{order.fullName}</TableCell>
//                         <TableCell>{order.email}</TableCell>
//                         <TableCell>{order.city}</TableCell>
//                         <TableCell>${order.totalPrice}</TableCell>
//                         <TableCell>{order.totalQuantity}</TableCell>
//                         <TableCell>
//                           <select
//                             value={order.productStatus}
//                             onChange={(e) => updateOrderStatus(order._id, e.target.value)}
//                             className={`border p-1 rounded ${
//                               order.productStatus === "Pending"
//                                 ? "text-red-600"
//                                 : order.productStatus === "Dispatch"
//                                 ? "text-blue-600"
//                                 : order.productStatus === "Delivered"
//                                 ? "text-green-600"
//                                 : "text-red-600"
//                             }`}
//                           >
//                             <option value="Pending" className="text-red-600">Pending</option>
//                             <option value="Dispatch" className="text-blue-600">Dispatch</option>
//                             <option value="Delivered" className="text-green-600">Delivered</option>
//                           </select>
//                         </TableCell>
//                         <TableCell>{new Date(order.orderDate).toLocaleDateString()}</TableCell>
//                         <TableCell>{expandedOrder === order._id ? "▲" : "▼"}</TableCell>
//                       </TableRow>
//                     </React.Fragment>
//                   ))}
//                 </TableBody>
//               </Table>
//             </div>
//           )}
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default Dashboard;
