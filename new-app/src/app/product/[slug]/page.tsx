"use client";

import { useParams } from "next/navigation";
import React from "react";
import { groq } from "next-sanity";
import { client } from "@/src/sanity/lib/client";
import ProductDetails from "../../components/ProductDetail";
import Navbar from "../../components/NavBar";

const Page = async () => {
  const { slug }: any = useParams();
  const products = await client.fetch(groq`*[_type=="product"]`);
  const product = products.find((product: any) => product.slug.current === slug);

  return (
    <>
      <Navbar />
      <ProductDetails product={product} />
    </>
  );
};

export default Page;
