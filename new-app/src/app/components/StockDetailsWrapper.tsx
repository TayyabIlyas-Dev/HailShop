"use client";

import { useParams } from "next/navigation";
import StockDetails from "./StockDetails";

const StockDetailsWrapper = ({ products }: { products: any[] }) => {
  const { slug } = useParams();
  const product = products.find((p) => p.slug.current === slug);

  if (!product) {
    return <div className="text-center text-red-500">Product not found</div>;
  }

  return <StockDetails product={product} />;
};

export default StockDetailsWrapper;
