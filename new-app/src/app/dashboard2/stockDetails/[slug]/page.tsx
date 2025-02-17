

// import { groq } from "next-sanity";
// import { client } from "@/src/sanity/lib/client";
// import Navbar from "../../../components/NavBar";
// import StockDetailsWrapper from "../../../components/StockDetailsWrapper"; // Client Component

// const getProductData = async () => {
//   const products = await client.fetch(groq`*[_type=="product"]`);
//   return products;
// };

// const Page = async () => {
//   const products = await getProductData();
//   return (
//     <>
//       <Navbar />
//       <StockDetailsWrapper products={products} />
//     </>
//   );
// };

// export default Page;

import { groq } from "next-sanity";
import { client } from "@/src/sanity/lib/client";
import StockDetailsWrapper from "../../../components/StockDetailsWrapper"; // Client Component
import { auth, currentUser } from "@clerk/nextjs/server";

// ✅ **Step 1: Generate Static Params for Dynamic Routing**
export async function generateStaticParams() {
  const products = await client.fetch(groq`*[_type=="product"]{ slug }`);
  return products.map((product: any) => ({ slug: product.slug.current }));
}

// ✅ **Step 2: Fetch Product Data Based on Slug**
const getProductData = async (slug: string) => {
  return await client.fetch(
    groq`*[_type=="product" && slug.current == $slug][0]`, 
    { slug },
    { next: { revalidate: 6 } } // Page will revalidate every 60 seconds
  );
};

// ✅ **Step 3: Page Component**
const Page = async ({ params }: { params: { slug: string } }) => {
  const product = await getProductData(params.slug);

  if (!product) {
    return <p className="text-center text-red-500">Product not found</p>;
  }
     const { userId } = await auth(); // Get the authenticated user
      const user = await currentUser(); // Fetch user data from Clerk
      const role = user?.publicMetadata?.role; // Get role from metadata
      // console.log("role=", user);
      if (!userId || role !== "admin") {
        return (
          <div className="flex items-center justify-center min-h-screen">
            <p className="text-red-500 text-lg font-semibold">
              Access Denied: Admins Only
            </p>
          </div>
        );
      }
  return (
    <>
      
      <StockDetailsWrapper products={[product]} />
    </>
  );
};

export default Page;
