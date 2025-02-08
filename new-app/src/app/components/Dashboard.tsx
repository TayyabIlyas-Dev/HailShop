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

interface Order {
  _id: string;
  fullName: string;
  email: string;
  city: string;
  totalPrice: number;
  totalQuantity: number;
  orderDate: string;
  cartItems: {
    product: {
      name?: string;
      image?: string[]; // Image array
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
            _id, fullName, email, city, totalPrice, totalQuantity, orderDate,
            cartItems[] {
              product->{name, "image": image[].asset._ref, price}, productQty
            }
          }`
        );
        console.log("Fetched Orders:", data); // Debugging
        setOrders(data || []);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [isLoaded, user]);

  useEffect(() => {
    console.log("Expanded Order:", expandedOrder); // Debugging
  }, [expandedOrder]);

  if (!isLoaded) return <p>Loading user...</p>;
  if (user?.publicMetadata?.role !== "admin") return <p>Access Denied</p>;
  const getTotalOrderQuantity = (orders: Order[]) => {
    return orders.reduce((total, order) => total + order.totalQuantity, 0);
  };
  
  return (
    <div className="p-2 overflow-x-auto w-full">
      <Card className="overflow-y-auto py-3 shadow-sm text-xs h-[350px]">
        <div className="font-semibold text-2xl text-center py-6">
          Order Details 
        </div>
        <CardContent>
          {loading ? (
            <Skeleton className="h-40 w-full" />
          ) : (
            <div className="overflow-x-auto">
              <Table className="min-w-full">
                <TableHeader>
                  <TableRow  className="font-black text-xs">
                    <TableHead>Order ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>City</TableHead>
                    <TableHead>Total Price</TableHead>
                    <TableHead>Total Quantity</TableHead>
                    <TableHead>Order Date</TableHead>
                    <TableHead>Products</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.map((order) => (
                    <React.Fragment key={order._id}>
                      <TableRow
                        onClick={() => {
                          console.log("Clicked Order ID:", order._id); // Debugging
                          setExpandedOrder(expandedOrder === order._id ? null : order._id);
                        }}
                        className="cursor-pointer"
                      >
                        <TableCell>{order._id}</TableCell>
                        <TableCell>{order.fullName}</TableCell>
                        <TableCell>{order.email}</TableCell>
                        <TableCell>{order.city}</TableCell>
                        <TableCell>${order.totalPrice}</TableCell>
                        <TableCell>{order.totalQuantity}</TableCell>
                        <TableCell>
                          {new Date(order.orderDate).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          {expandedOrder === order._id ? "▲" : "▼"}
                        </TableCell>
                      </TableRow>
                      {expandedOrder === order._id && (
                        <TableRow>
                          <TableCell colSpan={8}>
                            <div className="flex flex-col md:flex-row md:flex-wrap gap-4 p-2">
                              {order.cartItems.length > 0 ? (
                                order.cartItems.map((item, index) => {
                                  console.log("Image Data:", item.product.image); // Debugging
                                  return (
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
                                          alt={item.product.name || "Product Image"}
                                          width={140}
                                          height={100}
                                          className="object-contain p-2  h-16 sm:h-32 md:h-20 lg:h-32 border mx-auto rounded-xl hover:cursor-pointer hover:shadow-md hover:scale-105 transition-transform duration-500"
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
                                          Price: <span className="text-green-500">$ </span> {item.product?.price ?? "N/A"}
                                        </p>
                                      </div>
                                    </div>
                                  );
                                })
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

// import { useEffect, useState } from "react";
// import { useUser } from "@clerk/nextjs";
// import { Card, CardContent } from "@/components/ui/card";
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
// import { Skeleton } from "@/components/ui/skeleton";
// import Image from "next/image";
// import { client } from "@/src/sanity/lib/client";
// import { urlForImage } from "@/src/sanity/lib/image";

// interface Order {
//   _id: string;
//   fullName: string;
//   email: string;
//   city: string;
//   totalPrice: number;
//   totalQuantity: number;
//   orderDate: string;
//   cartItems: {
//     product: {
//       name?: string;
//       image?: string[]; // Image ka type array kar diya
//       price?: number;
//     };
//     productQty: number;
//   }[];
// }

// const Dashboard = () => {
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
//             _id, fullName, email, city, totalPrice, totalQuantity, orderDate,
//             cartItems[]{
//               product->{name, "image":image.asset._ref, price}, productQty
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

//   if (!isLoaded) return <p>Loading user...</p>;
//   if (user?.publicMetadata?.role !== "admin") return <p>Access Denied</p>;

//   return (
//     <div className="p-2 overflow-x-auto w-full">
//       <Card className="overflow-hidden">
//         <CardContent>
//           {loading ? (
//             <Skeleton className="h-40 w-full" />
//           ) : (
//             <div className="overflow-x-auto">
//               <Table className="min-w-full">
//                 <TableHeader>
//                   <TableRow>
//                     <TableHead>Order ID</TableHead>
//                     <TableHead>Customer</TableHead>
//                     <TableHead>Email</TableHead>
//                     <TableHead>City</TableHead>
//                     <TableHead>Total Price</TableHead>
//                     <TableHead>Total Quantity</TableHead>
//                     <TableHead>Order Date</TableHead>
//                     <TableHead>Products</TableHead>
//                   </TableRow>
//                 </TableHeader>
//                 <TableBody>
//                   {orders.map((order) => (
//                     <>
//                       <TableRow key={order._id} onClick={() => setExpandedOrder(expandedOrder === order._id ? null : order._id)} className="cursor-pointer">
//                         <TableCell>{order._id}</TableCell>
//                         <TableCell>{order.fullName}</TableCell>
//                         <TableCell>{order.email}</TableCell>
//                         <TableCell>{order.city}</TableCell>
//                         <TableCell>${order.totalPrice}</TableCell>
//                         <TableCell>{order.totalQuantity}</TableCell>
//                         <TableCell>{new Date(order.orderDate).toLocaleDateString()}</TableCell>
//                         <TableCell>{expandedOrder === order._id ? "▲" : "▼"}</TableCell>
//                       </TableRow>
//                       {expandedOrder === order._id && (
//                         <TableRow>
//                           <TableCell colSpan={8}>
//                             <div className="flex flex-col md:flex-row md:flex-wrap gap-4 p-2">
//                               {order.cartItems.length > 0 ? (
//                                 order.cartItems.map((item, index) => (
//                                   <div key={index} className="flex items-center space-x-4 p-2 border-b w-full md:w-1/2">
//                                     {item.product?.image ? (
//                                       <Image
//                                         src={urlForImage(item.product.image[0]).width(100).height(100).url()}
//                                         alt={item.product.name || "Product Image"}
//                                         width={100}
//                                         height={100}
//                                         className="rounded object-cover"
//                                       />
//                                     ) : (
//                                       <div className="w-16 h-16 bg-gray-200 flex items-center justify-center rounded">No Image</div>
//                                     )}
//                                     <div>
//                                       <p className="font-semibold">{item.product?.name || "No Title"}</p>
//                                       <p>Quantity: {item.productQty}</p>
//                                       <p className="text-sm text-gray-500">Price: ${item.product?.price ?? "N/A"}</p>
//                                     </div>
//                                   </div>
//                                 ))
//                               ) : (
//                                 <p>No Products</p>
//                               )}
//                             </div>
//                           </TableCell>
//                         </TableRow>
//                       )}
//                     </>
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
