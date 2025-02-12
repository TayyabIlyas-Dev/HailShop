import React from "react";
import { groq } from "next-sanity";
import { client } from "@/src/sanity/lib/client";
import ProductDetails from "../../components/ProductDetail";
import Navbar from "../../components/NavBar";

export async function generateStaticParams() {
  const products = await client.fetch(groq`*[_type=="product"]{ slug }`);
  return products.map((product: any) => ({ slug: product.slug.current }));
}

const Page = async ({ params }: { params: { slug: string } }) => {
  const product = await client.fetch(
    groq`*[_type=="product" && slug.current == $slug][0]`,
    { slug: params.slug }
  );

  if (!product) {
    return <p className="text-center text-red-500">Product not found</p>;
  }

  return (
    <>
      <Navbar />
      <ProductDetails product={product} />
    </>
  );
};

export default Page;
