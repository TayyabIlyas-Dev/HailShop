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
import { FaCheck, FaEye, FaEyeSlash, FaTimes } from "react-icons/fa";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { FaFilter } from "react-icons/fa";
import { order } from "@/src/sanity/schemaTypes/order";

interface Order {
  _id: string;
  fullName: string;
  email: string;
  city: string;
  productStatus: string;
  totalPrice: number;
  totalQuantity: number;
  orderDate: string;
  orderTime: string;
  address: string;
  cartItems: {
    name?: string;
    image: string[];
    price?: number;

    productQty: number;
  }[];
}

const Dashboard: React.FC = () => {
  const { user, isLoaded } = useUser();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  const [visibleOrderIds, setVisibleOrderIds] = useState<{
    [key: string]: boolean;
  }>({});

  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [customDate, setCustomDate] = useState("");
  const [startDate, setStartDate] = useState(""); // Pehli date
  const [endDate, setEndDate] = useState(""); // Dusri date

  const filters = [
    "All",
    "Today",
    "1 Week",
    "4 Week",
    "6 Month",
    "1 Year",
    "Custom Date",
  ];

  useEffect(() => {
    if (!isLoaded) return;
    if (user?.publicMetadata?.role !== "admin") return;

    const fetchOrders = async () => {
      try {
        const data = await client.fetch(
          `*[_type=="order"]{
            _id, fullName, email, productStatus, city, totalPrice, totalQuantity, orderDate,"orderTime": orderDate[11..18],  address,
            cartItems[] {
    name,
    "image": image.asset._ref,
    price,
    discount,
    finalPrice,
    productQty
  }
          }`
        );
        // console.log(data)

        // Sort orders by date (latest first)
        const sortedData = data.sort(
          (a: Order, b: Order) =>
            new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime()
        );

        setOrders(sortedData || []);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [isLoaded, user]);
  // useEffect(() => {
  //   let filtered = [...orders];

  //   if (selectedFilter === "Today") {
  //     const today = new Date().toISOString().split("T")[0];
  //     filtered = orders.filter((order) => order.orderDate.startsWith(today));
  //   } else if (selectedFilter === "1 Week") {
  //     const oneWeekAgo = new Date();
  //     oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  //     filtered = orders.filter(
  //       (order) => new Date(order.orderDate) >= oneWeekAgo
  //     );
  //   } else if (selectedFilter === "4 Week") {
  //     const fourWeeksAgo = new Date();
  //     fourWeeksAgo.setDate(fourWeeksAgo.getDate() - 28);
  //     filtered = orders.filter(
  //       (order) => new Date(order.orderDate) >= fourWeeksAgo
  //     );
  //   } else if (selectedFilter === "6 Month") {
  //     const sixMonthsAgo = new Date();
  //     sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
  //     filtered = orders.filter(
  //       (order) => new Date(order.orderDate) >= sixMonthsAgo
  //     );
  //   }

  //   setFilteredOrders(filtered);
  // }, [selectedFilter, orders]);
  useEffect(() => {
    let filtered = [...orders];

    if (selectedFilter === "Today") {
      const today = new Date().toISOString().split("T")[0];
      filtered = orders.filter((order) => order.orderDate.startsWith(today));
    } else if (selectedFilter === "1 Week") {
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
      filtered = orders.filter(
        (order) => new Date(order.orderDate) >= oneWeekAgo
      );
    } else if (selectedFilter === "4 Week") {
      const fourWeeksAgo = new Date();
      fourWeeksAgo.setDate(fourWeeksAgo.getDate() - 28);
      filtered = orders.filter(
        (order) => new Date(order.orderDate) >= fourWeeksAgo
      );
    } else if (selectedFilter === "6 Month") {
      const sixMonthsAgo = new Date();
      sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
      filtered = orders.filter(
        (order) => new Date(order.orderDate) >= sixMonthsAgo
      );
    } else if (selectedFilter === "1 Year") {
      const oneYearAgo = new Date();
      oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
      filtered = orders.filter(
        (order) => new Date(order.orderDate) >= oneYearAgo
      );
    } else if (selectedFilter === "Custom Date" && startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);

      filtered = orders.filter((order) => {
        const orderDate = new Date(order.orderDate);
        return orderDate >= start && orderDate <= end;
      });
    }

    setFilteredOrders(filtered);
  }, [selectedFilter, startDate, endDate, orders]); // 🔥 customDate hata diya!

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
      showToast("Failed to update order status!", "error");
    }
  };

  if (!isLoaded) return <p>Loading user...</p>;
  if (user?.publicMetadata?.role !== "admin") return <p>Access Denied</p>;

  const showToast = (message: string, type: "success" | "error") => {
    toast(message, {
      icon:
        type === "success" ? (
          <FaCheck className="text-white" />
        ) : (
          <FaTimes className="text-white" />
        ),
      style: {
        borderRadius: "5px",
        background: type === "success" ? "#0b0b0b" : "#0b0b0b",
        color: "white",
        padding: "12px 20px",
        marginTop: "40px",

        fontWeight: "bold",
      },
    });
  };

  const toggleOrderIdVisibility = (orderId: string) => {
    setVisibleOrderIds((prev) => ({
      ...prev,
      [orderId]: !prev[orderId],
    }));
  };

  // const orderTime = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: true });
  const Address: string =
    "Model Colony, House No 1111 Near, Malir Cant ,Karachi.";
  // const TimeOfOrder = ;

  return (
    <div className="p-2 overflow-x-auto w-full z-50">
      <Card className="overflow-y-auto py-3 shadow-sm text-xs h-full">
        <div className="flex justify-between items-center pl-9 px-6 py-5">
          <h2 className="font-semibold text-3xl">Order Details</h2>
          <Button
            className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition"
            onClick={() => setFilterOpen(!filterOpen)}
          >
            <FaFilter /> Filter
          </Button>
        </div>

        {filterOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex gap-2 px-6 py-2"
          >
            {filters.map((filter) => (
              <Button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                className={`px-3 py-1 text-sm rounded-md transition ${
                  selectedFilter === filter
                    ? "bg-gray-800 text-white"
                    : "bg-gray-300 text-black"
                }`}
              >
                {filter}
              </Button>
            ))}

            {/* Custom Date Input */}
            {selectedFilter === "Custom Date" && (
              <div className="flex gap-2">
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="border border-gray-300 rounded px-2 py-1 text-black"
                />{" "}
                :
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="border border-gray-300 rounded px-2 py-1 text-black"
                />
              </div>
            )}
          </motion.div>
        )}

        <CardContent>
          {loading ? (
            <Skeleton className="h-40 w-full" />
          ) : (
            <div className="overflow-x-auto  ">
              {/* <hr /> */}
              <Table className="min-w-full ">
                <TableHeader className="">
                  <TableRow className=" text-sm ">
                    <TableHead className="text-center  font-bold">
                      Order ID
                    </TableHead>
                    <TableHead className="text-start font-bold">
                      CS Name
                    </TableHead>
                    <TableHead className="text-start font-bold">
                      Email
                    </TableHead>
                    <TableHead className="text-center font-bold">
                      City
                    </TableHead>
                    <TableHead className="text-center font-bold">
                      Total Price
                    </TableHead>
                    <TableHead className="text-center font-bold">
                      Total QTY
                    </TableHead>
                    <TableHead className="text-center font-bold">
                      Status
                    </TableHead>
                    <TableHead className="text-center font-bold">
                      Order Date
                    </TableHead>
                    <TableHead className="text-center font-bold">
                      Products
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredOrders.map((order) => (
                    <React.Fragment key={order._id}>
                      <TableRow
                        onClick={() =>
                          setExpandedOrder(
                            expandedOrder === order._id ? null : order._id
                          )
                        }
                        className="cursor-pointer"
                      >
                        <TableCell className=" flex flex-col text-start text-[8px] break-words max-w-[100px]  items-center ">
                          <div>
                            <button
                              onClick={() => toggleOrderIdVisibility(order._id)}
                              className="text-sm"
                            >
                              {visibleOrderIds[order._id] ? (
                                <FaEyeSlash />
                              ) : (
                                <FaEye />
                              )}
                            </button>
                          </div>
                          <div>
                            {visibleOrderIds[order._id] ? order._id : "******"}
                          </div>
                        </TableCell>
                        <TableCell className="text-start">
                          {order.fullName}
                        </TableCell>
                        <TableCell className="text-start break-words max-w-[150px]">
                          {order.email}
                        </TableCell>
                        <TableCell className="text-center">
                          {order.city}
                        </TableCell>
                        <TableCell className="text-center">
                          <span className="text-green-500">$ </span>
                          {order.totalPrice}
                        </TableCell>
                        <TableCell className="w-5 text-center">
                          {order.totalQuantity}
                        </TableCell>
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
                            </option>{" "}
                            <option value="Dispatch" className="text-blue-600">
                              Dispatch
                            </option>{" "}
                            <option
                              value="Delivered"
                              className="text-green-600"
                            >
                              Delivered
                            </option>{" "}
                          </select>{" "}
                        </TableCell>{" "}
                        <TableCell className="text-center">
                          {new Date(order.orderDate).toLocaleDateString()}{" "}
                        </TableCell>{" "}
                        <TableCell className="text-center w-6">
                          {expandedOrder === order._id ? "▲" : "▼"}{" "}
                        </TableCell>{" "}
                      </TableRow>{" "}
                      {expandedOrder === order._id && (
                        <TableRow>
                          <TableCell colSpan={9} className="text-center">
                            <div className="text-start flex justify-between px-2 break-words text-xs">
                              <div>
                                <span className="font-semibold">Address :</span>{" "}
                                {order.address}
                              </div>

                              <div>
                                <span className="font-semibold">Time :</span>{" "}
                                {new Date(order.orderDate).toLocaleTimeString(
                                  [],
                                  {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                    hour12: true,
                                  }
                                )}
                              </div>
                            </div>
                            <div className="flex flex-col md:flex-row md:flex-wrap gap-4 p-2">
                              {order.cartItems.length > 0 ? (
                                order.cartItems.map((item, index) => (
                                  <div
                                    key={index}
                                    className="flex items-center space-x-4 p-2 border-b w-full sm:w-1/2 lg:w-1/3"
                                  >
                                    {item?.image ? (
                                      <Image
                                        src={urlForImage(item.image).url()}
                                        alt={item.name || "Product Image"}
                                        width={140}
                                        height={100}
                                        className="object-contain p-2 h-16 sm:h-24 md:h-28 lg:h-32 border mx-auto rounded-xl hover:cursor-pointer hover:shadow-md hover:scale-105 transition-transform duration-500"
                                      />
                                    ) : (
                                      <div className="w-16 h-16 bg-gray-200 flex items-center justify-center rounded">
                                        No Image
                                      </div>
                                    )}
                                    <div className="text-xs sm:text-sm">
                                      <p className="font-semibold text-base">
                                        {item?.name || "No Title"}
                                      </p>
                                      <p>Quantity: {item.productQty}</p>
                                      <p className="text-sm text-gray-700">
                                        Price:{" "}
                                        <span className="text-gray-600">
                                          <span className="text-green-500">
                                            ${" "}
                                          </span>
                                          {item?.price ?? "N/A"}
                                        </span>
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
