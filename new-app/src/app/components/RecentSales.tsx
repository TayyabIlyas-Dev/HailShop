import { CardContent } from "@/components/ui/card";
import SalesCard from "@/components/ui/salesCard";
import { useEffect, useState } from "react";
import { client } from "../lib/sanityClient";
import { useUser } from "@clerk/nextjs";

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

export default function RecentSales() {
  const { user, isLoaded } = useUser();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
   const [totalSales, setTotalSales] = useState(0);

  useEffect(() => {
    if (!isLoaded) return;
    if (user?.publicMetadata?.role !== "admin") return;

    const fetchOrders = async () => {
      try {
        const data = await client.fetch(
          `*[_type=="order"]{
            _id, fullName, email, productStatus, city, totalPrice, totalQuantity, orderDate,
            cartItems[] {
              product->{name, "image": image[].asset._ref, price}, productQty
            }
          }`
        );

        setTotalSales(
          data.reduce((acc: number, order: { totalQuantity: number }) => acc + order.totalQuantity, 0)
        );
  
        // Sort orders by orderDate (latest first)
        const sortedData = data.sort((a: Order, b: Order) => 
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

  return (
    <div>
      <section className="custom-scrollbar2 h-[350px] px-2 overflow-hidden overflow-y-auto mt-2 border rounded-xl shadow-sm bg-white">
        <CardContent className="px-3 py-5">
          <section className="mb-3 px-2">
            <p className="text-xl font-semibold text-gray-900">Recent Sales</p>
            <p className="text-sm text-gray-500">You made {totalSales} items sales </p>
          </section>
          <div className="p-2">
            {orders.map((order) => (
              <SalesCard
                key={order._id}
                email={order.email}
                name={order.fullName}
                saleAmount={order.totalPrice.toString()}
              />
            ))}
          </div>
        </CardContent>
      </section>
    </div>
  );
}
